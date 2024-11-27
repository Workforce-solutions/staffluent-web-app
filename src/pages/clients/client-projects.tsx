import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UserNav } from '@/components/user-nav'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import { useShortCode } from '@/hooks/use-local-storage'
import { ColumnDef } from '@tanstack/react-table'
import {
  Calendar,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  TrendingUp,
  Users,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetClientProjectsQuery } from '@/services/clientsApi'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ClientProject } from '../../@types/clients'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function ClientProjects() {
  const navigate = useNavigate()
  const short_code = useShortCode()
  const [searchTerm, setSearchTerm] = useState('')
  const [status, setStatus] = useState('all')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const {
    data: clientProjectsData,
    isLoading,
    isError,
  } = useGetClientProjectsQuery({
    venue_short_code: short_code,
    search: debouncedSearch,
    status,
    page,
    per_page: perPage,
  })

  const handleViewProject = useCallback(
    (projectId: number) => {
      navigate(`/projects/details/${projectId}`)
    },
    [navigate]
  )

  const handleCreateProject = useCallback(() => {
    navigate('/projects/list')
  }, [navigate])

  // Calculate the difference between current and previous month's active projects
  const activeProjectsDiff = useMemo(() => {
    if (!clientProjectsData?.stats) return 0
    const current = clientProjectsData.stats.active_projects || 0
    const previous = clientProjectsData.stats.previous_month_active || 0
    return current - previous
  }, [clientProjectsData?.stats])

  const columns: ColumnDef<ClientProject>[] = useMemo(
    () => [
      {
        accessorKey: 'project_name',
        header: 'Project Name',
        cell: ({ row }) => (
          <span className='font-medium'>{row.original.project_name}</span>
        ),
      },
      {
        accessorKey: 'client',
        header: 'Client',
        cell: ({ row }) => (
          <span className='font-medium'>{row.original.client || 'N/A'}</span>
        ),
      },
      {
        accessorKey: 'start_date',
        header: 'Start Date',
        cell: ({ row }) => (
          <span>{new Date(row.original.start_date).toLocaleDateString()}</span>
        ),
      },
      {
        accessorKey: 'due_date',
        header: 'Due Date',
        cell: ({ row }) => (
          <span>{new Date(row.original.due_date).toLocaleDateString()}</span>
        ),
      },
      {
        accessorKey: 'progress',
        header: 'Progress',
        cell: ({ row }) => (
          <div className='flex items-center space-x-2'>
            <Progress value={row.original.progress} className='h-2' />
            <span className='text-sm text-muted-foreground'>
              {row.original.progress}%
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          // @ts-ignore
          const statusVariant =
            {
              Active: 'success',
              Completed: 'completed',
              Pending: 'warning',
              'On Hold': 'secondary',
            }[row.original.status] || 'default'

          return (
            <Badge variant={statusVariant as any}>{row.original.status}</Badge>
          )
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon' className='h-8 w-8 p-0'>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={() => handleViewProject(row.original.id)}
              >
                <Eye className='mr-2 h-4 w-4' /> View Project
              </DropdownMenuItem>
              {row.original.client_id && (
                <DropdownMenuItem
                  onClick={() =>
                    navigate(`/projects/clients/${row.original.client_id}`)
                  }
                >
                  <Users className='mr-2 h-4 w-4' /> View Client
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [handleViewProject]
  )

  return (
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Client Projects
            </h2>
            <p className='text-sm text-muted-foreground'>
              Manage and monitor all client projects
            </p>
          </div>
          <Button onClick={handleCreateProject}>
            <Plus className='mr-2 h-4 w-4' /> New Project
          </Button>
        </div>

        {/* Project Stats */}
        <div className='grid gap-4 md:grid-cols-3'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Active Projects
              </CardTitle>
              <TrendingUp className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {clientProjectsData?.stats.active_projects || 0}
              </div>
              <p className='text-xs text-muted-foreground'>
                {activeProjectsDiff > 0 && `+${activeProjectsDiff}`}
                {activeProjectsDiff < 0 && activeProjectsDiff}
                {activeProjectsDiff !== 0 && ' from last month'}
                {activeProjectsDiff === 0 && 'No change from last month'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Clients
              </CardTitle>
              <Users className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {clientProjectsData?.stats.total_clients || 0}
              </div>
              <p className='text-xs text-muted-foreground'>
                Across all projects
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Due This Month
              </CardTitle>
              <Calendar className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {clientProjectsData?.stats.due_this_month || 0}
              </div>
              <p className='text-xs text-muted-foreground'>
                Projects ending soon
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Projects Table */}
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <CardTitle>All Projects</CardTitle>
                <p className='text-sm text-muted-foreground'>
                  View and manage client projects
                </p>
              </div>
              <div className='flex items-center space-x-2'>
                <div className='relative'>
                  <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    placeholder='Search projects...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-[250px] pl-8'
                  />
                </div>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Filter by status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Projects</SelectItem>
                    <SelectItem value='active'>Active</SelectItem>
                    <SelectItem value='completed'>Completed</SelectItem>
                    <SelectItem value='on-hold'>On Hold</SelectItem>
                    <SelectItem value='planning'>Planning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <GenericTableWrapper
              columns={columns}
              data={clientProjectsData?.projects || []}
              isLoading={isLoading}
              isError={isError}
              showToolbar={false}
              // @ts-ignore
              pagination={{
                pageSize: perPage,
                pageIndex: page - 1,
                pageCount: clientProjectsData?.pagination.total_pages || 1,
                // @ts-ignore
                onPageChange: (p) => setPage(p + 1),
                onPageSizeChange: setPerPage,
              }}
            />
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
