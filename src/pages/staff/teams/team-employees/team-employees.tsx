import { TeamMemberResponse } from '@/@types/staff'
import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { UserNav } from '@/components/user-nav'
import ConfirmationModal from '@/components/wrappers/confirmation-modal'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import { useShortCode } from '@/hooks/use-local-storage'
import {
  useGetTeamByIdQuery,
  useGetTeamEmployeesQuery,
  useRemoveTeamEmployeeMutation,
} from '@/services/staffApi'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import {
  CalendarIcon,
  PhoneIcon,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import EmployeAvatarName from '../../employee/employe-avatar-name'
import { CreateTeamEmployee } from './add-team-employee'
import { CreateTeamLeader } from './add-team-leader'

// Helper function for status badge styling
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
    case 'inactive':
      return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
    case 'pending':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
  }
}

export default function TeamEmployees() {
  const { id } = useParams()
  const venue_short_code = useShortCode()
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [teamLeaderOpen, setTeamLeaderOpen] = useState(false)
  const [openEmployee, setOpenEmployee] = useState(false)
  const [selectedEmployee, setSelectedEmployee] =
    useState<TeamMemberResponse | null>(null)
  const { toast } = useToast()

  const params = {
    id: Number(id),
    venue_short_code,
  }

  const { data: teamById, isFetching: isTeamFetching } =
    useGetTeamByIdQuery(params)

  const {
    data = [],
    isFetching,
    isError,
  } = useGetTeamEmployeesQuery({
    id: Number(id),
    venue_short_code,
  })

  const [removeEmployee] = useRemoveTeamEmployeeMutation()

  const handleRemoveEmployee = async () => {
    if (!selectedEmployee) return

    try {
      await removeEmployee({
        id: Number(id),
        employee_ids: [selectedEmployee.id],
        short_code: venue_short_code,
      }).unwrap()

      toast({
        title: 'Success',
        description: 'Employee removed from team successfully',
      })
      setDeleteOpen(false)
      setSelectedEmployee(null)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove employee from team',
        variant: 'destructive',
      })
    }
  }

  const columns: ColumnDef<TeamMemberResponse>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row: { original } }) => (
        <div className='flex items-center space-x-3'>
          <EmployeAvatarName profile_picture={original.profile_picture} />

          <div className='flex flex-col'>
            <span className='text-sm font-semibold'>{original.name}</span>
            <span className='text-xs text-muted-foreground'>
              {original.email}
            </span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row: { original } }) => (
        <div className='flex items-center'>
          <span className='text-sm font-medium'>
            {original.role || 'No Role'}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row: { original } }) => (
        <Badge
          className={`${getStatusColor(original.status)} font-semibold capitalize`}
          variant='outline'
        >
          {original.status}
        </Badge>
      ),
    },
    {
      accessorKey: 'company_phone',
      header: 'Phone',
      cell: ({ row: { original } }) => (
        <div className='flex items-center space-x-2 text-sm'>
          <PhoneIcon className='h-4 w-4 text-muted-foreground' />
          <span>{original.phone || 'N/A'}</span>
        </div>
      ),
    },
    {
      accessorKey: 'joined_at',
      header: 'Joined Team',
      cell: ({ row: { original } }) => (
        <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
          <CalendarIcon className='h-4 w-4' />
          <span>
            {original.joined_at
              ? format(new Date(original.joined_at), 'MMM d, yyyy')
              : 'N/A'}
          </span>
        </div>
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row: { original } }) => (
        <Button
          variant='ghost'
          size='sm'
          onClick={() => {
            setSelectedEmployee(original)
            setDeleteOpen(true)
          }}
          className='hover:text-destructive focus:text-destructive'
        >
          <Trash2Icon className='h-4 w-4' />
        </Button>
      ),
    },
  ]

  const filteredData = useMemo(() => {
    return data.filter((employee) =>
      Object.values(employee).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [data, searchTerm])

  return (
    <Layout>
      <ConfirmationModal
        handleDelete={handleRemoveEmployee}
        open={deleteOpen}
        setOpen={setDeleteOpen}
        id={selectedEmployee}
        title='Remove Team Member'
        description='Are you sure you want to remove this member from the team? This action cannot be undone.'
      />

      <CreateTeamEmployee open={openEmployee} setOpen={setOpenEmployee} />

      <CreateTeamLeader setOpen={setTeamLeaderOpen} open={teamLeaderOpen} />

      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-8'>
        <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Team Members</h2>
            <p className='text-muted-foreground'>
              Manage team members and their roles
            </p>
          </div>
          <div className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0'>
            <div className='relative'>
              <Input
                placeholder='Search members...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-8 sm:w-64'
              />
              <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            </div>
            <Button
              onClick={() => setOpenEmployee(true)}
              className='flex items-center gap-2'
            >
              <PlusIcon className='h-4 w-4' />
              Add Member
            </Button>
            <Button
              onClick={() => setTeamLeaderOpen(true)}
              className='flex items-center gap-2'
              disabled={Boolean(teamById?.team_leader || isTeamFetching)}
            >
              <PlusIcon className='h-4 w-4' />
              Add Team Leader
            </Button>
          </div>
        </div>

        <GenericTableWrapper
          columns={columns}
          data={filteredData}
          isLoading={isFetching}
          isError={isError}
        />
      </Layout.Body>
    </Layout>
  )
}
