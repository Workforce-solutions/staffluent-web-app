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
import { ColumnDef } from '@tanstack/react-table'
import {
  Calendar,
  MoreHorizontal,
  Search,
  TrendingUp,
  Users,
} from 'lucide-react'
import { useMemo, useState } from 'react'

export interface ClientProject {
  id: number
  project_name: string
  client: string
  start_date: string
  due_date: string
  progress: number
  status: 'Active' | 'Completed' | 'Pending' | 'On Hold'
  contact_person: string
  type: 'company' | 'individual'
  email?: string
  phone?: string
  full_address?: string
}

export default function ClientProjects() {
  const [searchTerm, setSearchTerm] = useState('')

  const clientProjects: ClientProject[] = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    project_name: `Project ${i + 1}`,
    client: `Client ${i + 1}`,
    start_date: `2023-10-${i + 1}`,
    due_date: `2023-12-${i + 1}`,
    progress: Math.floor(Math.random() * 101),
    status:
      i % 4 === 0
        ? 'Active'
        : i % 4 === 1
          ? 'Completed'
          : i % 4 === 2
            ? 'Pending'
            : 'On Hold',
    contact_person: `Contact Person ${i + 1}`,
    type: i % 2 === 0 ? 'company' : 'individual',
    email: `contact${i + 1}@example.com`,
    phone: `555-01${i + 1}`,
    full_address: `123 ${i + 1}th Street, City, Country`,
  }))

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
            <Progress value={row.original.progress} />
            <span className='text-sm text-muted-foreground'>
              {row.original.progress}%
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <Badge
            variant={row.original.status === 'Active' ? 'success' : 'default'}
          >
            {row.original.status}
          </Badge>
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        // @ts-ignore
        cell: ({ row }) => (
          <div className='flex items-center justify-end space-x-2'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => {
                /* Handle more options */
              }}
            >
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </div>
        ),
      },
    ],
    []
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
              <div className='text-2xl font-bold'>28</div>
              <p className='text-xs text-muted-foreground'>
                +4 from last month
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
              <div className='text-2xl font-bold'>156</div>
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
              <div className='text-2xl font-bold'>12</div>
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
                <Select defaultValue='all'>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Filter by status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Projects</SelectItem>
                    <SelectItem value='active'>Active</SelectItem>
                    <SelectItem value='completed'>Completed</SelectItem>
                    <SelectItem value='on-hold'>On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <GenericTableWrapper
              columns={columns}
              data={clientProjects}
              isLoading={false}
              isError={false}
              showToolbar={false}
            />
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
