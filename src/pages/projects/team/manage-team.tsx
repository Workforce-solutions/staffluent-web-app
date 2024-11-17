import { TeamMember } from '@/@types/project'
import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import { UserNav } from '@/components/user-nav'
import ConfirmationModal from '@/components/wrappers/confirmation-modal'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import { useShortCode } from '@/hooks/use-local-storage'
import { InfoField } from '@/pages/staff/employee/details'
import { useGetProjectsTeamQuery } from '@/services/projectApi'
import {
  useGetTeamByIdQuery,
  useRemoveTeamEmployeeMutation,
} from '@/services/staffApi'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import {
  Award,
  Briefcase,
  BriefcaseIcon,
  CalendarIcon,
  MailIcon,
  MoreHorizontal,
  PhoneIcon,
  PlusIcon,
  Trash2Icon,
  UserIcon,
  UserPlus,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
// Helper function for status badge styling
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
    case 'on-break':
      return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
    case 'pending':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
  }
}
export default function ProjectTeam() {
  const { id } = useParams()
  const { toast } = useToast()
  const venue_short_code = useShortCode()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [teamLeaderOpen, setTeamLeaderOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<TeamMember | null>(
    null
  )
  const [activeModal, setActiveModal] = useState<string>()

  const { data: teamById, isFetching: isTeamFetching } = useGetTeamByIdQuery(
    { id: Number(id), venue_short_code },
    {
      skip: !id || isNaN(Number(id)),
    }
  )

  const params = {
    id: id ?? '',
    venue_short_code,
  }
  const {
    data: projectsTeam,
    isFetching,
    isError,
  } = useGetProjectsTeamQuery(
    {
      ...params,
    },
    { skip: id === undefined }
  )
  console.log(projectsTeam, 'projectsTeam')
  //   const {
  //     data = [],
  //     isFetching,
  //     isError,
  //   } = useGetTeamEmployeesQuery({
  //     id: Number(id),
  //     venue_short_code,
  //   })
  const [removeEmployee] = useRemoveTeamEmployeeMutation()
  const handleRemoveEmployee = async () => {
    if (!selectedEmployee) return
    try {
      await removeEmployee({
        id: Number(id),
        employee_ids: [0],
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
  const columns: ColumnDef<TeamMember>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row: { original } }) => (
        <div className='flex items-center space-x-3'>
          <Avatar className='h-8 w-8 ring-2 ring-background'>
            {original.profile_picture.length <= 2 ? (
              <AvatarFallback className='bg-primary/10 text-primary'>
                {original.profile_picture}
              </AvatarFallback>
            ) : (
              <AvatarImage src={original.profile_picture} alt={original.name} />
            )}
          </Avatar>
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
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ row: { original } }) => (
        <div className='flex items-center space-x-2 text-sm'>
          <PhoneIcon className='h-4 w-4 text-muted-foreground' />
          <span>{original.phone || 'N/A'}</span>
        </div>
      ),
    },
    {
      accessorKey: 'assigned_at',
      header: 'Joined Team',
      cell: ({ row: { original } }) => (
        <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
          <CalendarIcon className='h-4 w-4' />
          <span>
            {original.assigned_at
              ? format(new Date(original.assigned_at), 'MMM d, yyyy')
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

  const menuOptions = [
    { label: 'Assign Employee', icon: UserPlus, action: 'AssignEmployee' },
    {
      label: 'Assign Operations Manager',
      icon: Briefcase,
      action: 'AssignOperationsManager',
    },
    {
      label: 'Assign Team to Project',
      icon: Users,
      action: 'AssignTeamToProject',
    },
    {
      label: 'Assign Project Manager',
      icon: Award,
      action: 'AssignProjectManager',
    },
  ]

  const projectManager = projectsTeam?.project_manager
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
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>
      <Layout.Body className='space-y-8'>
        <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Project Team Members
            </h2>
            <p className='text-muted-foreground'>
              Manage project team members and their roles
            </p>
          </div>
          <div className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0'>
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                style={{ minWidth: 'max-content', padding: '0 20px' }}
              >
                <Button
                  size='icon'
                  variant='outline'
                  className='flex items-center gap-2'
                >
                  <MoreHorizontal className='h-5 w-5' />
                  Manage Team
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side='bottom' align='start'>
                {menuOptions.map(({ label, icon: Icon, action }) => (
                  <DropdownMenuItem
                    key={action}
                    onClick={() => setActiveModal(action)}
                    textValue={activeModal}
                  >
                    <Icon className='mr-2 h-4 w-4' /> {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
        {projectManager && (
          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            {/* Profile Card */}
            <Card className='md:col-span-1'>
              <CardContent className='pt-6'>
                <div className='flex flex-col items-center space-y-4'>
                  <Avatar className='h-32 w-32'>
                    <AvatarImage src={projectManager?.profile_picture} />
                    <AvatarFallback>
                      {projectManager?.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className='text-center'>
                    <h2 className='text-2xl font-bold'>
                      {projectManager?.name}
                    </h2>
                    <p className='text-muted-foreground'>
                      {projectManager?.role}
                    </p>
                    <div className='mt-4'>
                      <Button
                        className={`w-[180px] ${getStatusColor(projectManager?.status)} border-0 ring-offset-background focus:ring-2 [&>span]:text-white [&>svg]:text-white`}
                      >
                        {projectManager?.status}
                      </Button>
                    </div>
                  </div>
                  <div className='w-full pt-4'>
                    <div className='space-y-3'>
                      <div className='flex items-center space-x-2'>
                        <MailIcon className='h-4 w-4 opacity-70' />
                        <span>{projectManager?.email}</span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <PhoneIcon className='h-4 w-4 opacity-70' />
                        <span>{projectManager?.phone}</span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <CalendarIcon className='h-4 w-4 opacity-70' />
                        <span>
                          Hired:{' '}
                          {projectManager?.assigned_at &&
                            format(
                              new Date(projectManager?.assigned_at),
                              'MMM dd, yyyy'
                            )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Detailed Information */}
            <Card className='md:col-span-2'>
              <CardContent className='pt-6'>
                <Tabs defaultValue='personal' className='w-full'>
                  <TabsList>
                    <TabsTrigger value='personal'>Personal Info</TabsTrigger>
                    <TabsTrigger value='work'>Work Info</TabsTrigger>
                    <TabsTrigger value='address'>Address</TabsTrigger>
                  </TabsList>
                  <TabsContent value='personal' className='space-y-4'>
                    <div className='grid grid-cols-2 gap-4'>
                      <InfoField
                        label='Personal Email'
                        value={projectManager?.email}
                        icon={<MailIcon className='h-4 w-4' />}
                      />
                      <InfoField
                        label='Personal Phone'
                        value={projectManager?.phone}
                        icon={<PhoneIcon className='h-4 w-4' />}
                      />
                      <InfoField
                        label='Hire Date'
                        value={
                          projectManager?.assigned_at &&
                          format(new Date(projectManager?.assigned_at), 'PP')
                        }
                        icon={<CalendarIcon className='h-4 w-4' />}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value='work' className='space-y-4'>
                    <div className='grid grid-cols-2 gap-4'>
                      <InfoField
                        label='Role Type'
                        value={projectManager?.role}
                        icon={<BriefcaseIcon className='h-4 w-4' />}
                      />
                      <InfoField
                        label='Employee ID'
                        value={`#${projectManager?.id}`}
                        icon={<UserIcon className='h-4 w-4' />}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>
            Operations Managers
          </h2>
          <p className='text-muted-foreground'>
            Manage project operations managers
          </p>
        </div>
        <GenericTableWrapper
          columns={columns}
          data={projectsTeam?.team_leaders}
          isLoading={isFetching}
          isError={isError}
        />
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Team Leaders</h2>
          <p className='text-muted-foreground'>Manage project team leaders</p>
        </div>
        <GenericTableWrapper
          columns={columns}
          data={projectsTeam?.team_leaders}
          isLoading={isFetching}
          isError={isError}
        />
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Team Members</h2>
          <p className='text-muted-foreground'>Manage project team members</p>
        </div>
        <GenericTableWrapper
          columns={columns}
          data={projectsTeam?.team_members}
          isLoading={isFetching}
          isError={isError}
        />
      </Layout.Body>
    </Layout>
  )
}
