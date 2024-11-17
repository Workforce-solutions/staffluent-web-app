import { EmployeeResponse } from '@/@types/staff'
import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { UserNav } from '@/components/user-nav'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import {
  getPerformanceColor,
  getStatusColor,
} from '@/hooks/common/common-functions'
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
import { ROLES } from '../teams/team-employees/add-team-leader'
import { AddEditEmployeeModal } from './add-edit-employee'
import EmployeAvatarName from './employe-avatar-name'
import { StaffProfile } from './staff-profile'

interface EmployeeTableProps {
  role?: ROLES
  data: EmployeeResponse[]
  isLoading?: boolean
  isError?: boolean
}

export default function EmployeeTable({
  role,
  data,
  isError,
  isLoading,
}: EmployeeTableProps) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)
  const [selectedRow, setSelectedRow] = useState<EmployeeResponse>()

  const [searchTerm, setSearchTerm] = useState('')

  const columns: ColumnDef<EmployeeResponse>[] = useMemo(() => {
    const roleColumn: ColumnDef<EmployeeResponse>[] = role
      ? []
      : [
          {
            accessorKey: 'role',
            header: 'Role',
            cell: ({ row }) => (
              <span className='font-medium'>
                {row.original.role?.name || 'No Role'}
              </span>
            ),
          },
        ]

    return [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
          <div className='flex items-center space-x-2'>
            <EmployeAvatarName profile_picture={row.original.profile_picture} />
            <div className='flex flex-col'>
              <span className='font-medium'>{row.original.name}</span>
              <span className='text-xs text-muted-foreground'>
                {row.original.email}
              </span>
            </div>
          </div>
        ),
      },
      ...roleColumn,
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
            <Button
              onClick={() => {
                setOpenProfile(true)
                setSelectedRow(row.original)
              }}
              variant='outline'
            >
              Quick View
            </Button>
            <Button
              variant='link'
              onClick={() => navigate(`/employees/${row.original.id}`)}
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
    ]
  }, [navigate, role])

  const getRoleTitle = () => {
    switch (role) {
      case ROLES.teamLeader:
        return 'Team Leaders'
      case ROLES.operationManager:
        return 'Operations Managers'
      default:
        return 'Employees'
    }
  }

  return (
    <Layout>
      <StaffProfile
        setOpen={setOpenProfile}
        open={openProfile}
        staff={selectedRow}
      />
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
        <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              {getRoleTitle()}
            </h2>
            <p className='text-muted-foreground'>
              Manage and organize your {getRoleTitle().toLowerCase()}
            </p>
          </div>
          <div className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0'>
            <Input
              placeholder={`Search ${getRoleTitle().toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full sm:w-64'
            />

            {role ? (
              <Button
                onClick={() => navigate('/employees')}
                className='flex items-center gap-2'
              >
                Employees
              </Button>
            ) : (
              <>
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
                <Button
                  onClick={() => navigate('/employees/team-leaders')}
                  className='flex items-center gap-2'
                >
                  Team Leaders
                </Button>
                <Button
                  onClick={() => navigate('/employees/operations-managers')}
                  className='flex items-center gap-2'
                >
                  Operations Manager
                </Button>
              </>
            )}
          </div>
        </div>

        <Card>
          <CardContent className='pt-6'>
            <GenericTableWrapper
              columns={columns}
              data={data}
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
