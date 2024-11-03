import { EmployeeResponse } from '@/@types/staff'
import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { UserNav } from '@/components/user-nav'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import {
  getPerformanceColor,
  getStatusColor,
} from '@/hooks/common/common-functions'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetEmployeesQuery } from '@/services/staffApi'
import { ColumnDef } from '@tanstack/react-table'
import {
  BriefcaseIcon,
  CheckCircleIcon,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  PlusIcon,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AddEditEmployeeModal } from './add-edit-employee'
import { StaffProfile } from './staff-profile'

export default function StaffOverview() {
  const navigate = useNavigate()
  const short_code = useShortCode()
  const [open, setOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState<EmployeeResponse>()

  const [searchTerm, setSearchTerm] = useState('')
  const {
    data: staffResponse = [],
    isLoading,
    isError,
  } = useGetEmployeesQuery(short_code)

  const columns: ColumnDef<EmployeeResponse>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
          <div className='flex items-center space-x-2'>
            <Avatar className='h-8 w-8'>
              {row.original.profile_picture.length <= 2 ? (
                <AvatarFallback>{row.original.profile_picture}</AvatarFallback>
              ) : (
                <AvatarImage
                  src={row.original.profile_picture}
                  alt={row.original.name}
                />
              )}
            </Avatar>
            <div className='flex flex-col'>
              <span className='font-medium'>{row.original.name}</span>
              <span className='text-xs text-muted-foreground'>
                {row.original.email}
              </span>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => (
          <span className='font-medium'>
            {row.original.role?.name || 'No Role'}
          </span>
        ),
      },
      {
        accessorKey: 'department',
        header: 'Department',
        cell: ({ row }) => (
          <span className='font-medium'>
            {row.original.department?.name || 'No Department'}
          </span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <Badge className={getStatusColor(row.original.status)}>
            {row.original.status}
          </Badge>
        ),
      },
      {
        header: 'Work Overview',
        cell: ({ row }) => (
          <div className='flex items-center space-x-4'>
            <div className='flex items-center' title='Active Projects'>
              <BriefcaseIcon className='mr-2 h-4 w-4 text-blue-500' />
              <span className='font-medium'>
                {row.original.stats?.active_projects || 0}
              </span>
            </div>
            <div className='flex items-center' title='Tasks Completed'>
              <CheckCircleIcon className='mr-2 h-4 w-4 text-green-500' />
              <span className='font-medium'>
                {row.original.stats?.completed_tasks || 0}/
                {row.original.stats?.total_tasks || 0}
              </span>
            </div>
            <div className='flex items-center' title='On-time Completion'>
              <ClockIcon className='mr-2 h-4 w-4 text-amber-500' />
              <span className='font-medium'>
                {row.original.stats?.tasks_on_time || 0}
              </span>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'performance',
        header: 'Performance',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <div
              className='h-2 w-24 rounded-full bg-gray-200 dark:bg-gray-700'
              title={`${row.original.performance}% Performance`}
            >
              <div
                className={`h-2 rounded-full ${getPerformanceColor(row.original.performance)}`}
                style={{ width: `${row.original.performance}%` }}
              />
            </div>
            <span className='ml-2 font-medium'>
              {row.original.performance}%
            </span>
          </div>
        ),
      },
      {
        id: 'contact',
        header: 'Contact',
        cell: ({ row }) => (
          <div className='flex space-x-2'>
            {row.original.company_email && (
              <Button
                variant='ghost'
                size='sm'
                className='h-8 w-8 p-0'
                onClick={() =>
                  (window.location.href = `mailto:${row.original.company_email}`)
                }
              >
                <MailIcon className='h-4 w-4' />
              </Button>
            )}
            {row.original.company_phone && (
              <Button
                variant='ghost'
                size='sm'
                className='h-8 w-8 p-0'
                onClick={() =>
                  (window.location.href = `tel:${row.original.company_phone}`)
                }
              >
                <PhoneIcon className='h-4 w-4' />
              </Button>
            )}
          </div>
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className='flex items-center justify-end  space-x-2'>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant='outline'>Quick View</Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle>Staff Profile</DialogTitle>
                </DialogHeader>
                <StaffProfile staff={row.original} />
              </DialogContent>
            </Dialog>
            <Button
              variant='link'
              onClick={() => navigate(`/staff-management/${row.original.id}`)}
            >
              Full Profile
            </Button>
            <Button
              variant='link'
              onClick={() => {
                setOpen(true)
                setSelectedRow(row?.original)
              }}
            >
              Edit
            </Button>
          </div>
        ),
      },
    ],
    [navigate]
  )

  return (
    <Layout>
      <AddEditEmployeeModal
        open={open}
        setOpen={setOpen}
        employeeToEdit={selectedRow}
      />
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-8'>
        {/* Modified this section to match departments */}
        <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Employees</h2>
            <p className='text-muted-foreground'>
              Manage and organize your team members
            </p>
          </div>
          <div className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0'>
            <Input
              placeholder='Search employees...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full sm:w-64'
            />
            <Button
              onClick={() => {
                setSelectedRow(undefined)
                setOpen(true)
              }}
              className='flex items-center gap-2'
            >
              <PlusIcon className='h-4 w-4' />
              Add Employee
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className='pt-6'>
            <GenericTableWrapper
              columns={columns}
              data={staffResponse}
              isLoading={isLoading}
              isError={isError}
              showToolbar={false}
            />
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
