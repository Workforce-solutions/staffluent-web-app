import { OptionsType } from '@/@types/common'
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
import { useToast } from '@/components/ui/use-toast'
import { UserNav } from '@/components/user-nav'
import ConfirmationModal from '@/components/wrappers/confirmation-modal'
import { useShortCode } from '@/hooks/use-local-storage'
import {
  useAssignEmployeeMutation,
  useAssignOperationsManagersMutation,
  useAssignProjectManagerMutation,
  useAssignTeamLeadersMutation,
  useAssignTeamMutation,
  useUnassignEmployeeMutation,
  useGetProjectsTeamQuery,
  useUnassignOperationsManagerMutation,
  useUnassignTeamLeaderMutation,
  useUnassignProjectManagerMutation,
} from '@/services/projectApi'
import {
  useLazyGetEmployeesQuery,
  useLazyGetOperationsManagerQuery,
  useLazyGetTeamleadersQuery,
  useLazyGetTeamsQuery,
} from '@/services/staffApi'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import {
  CalendarIcon,
  MoreHorizontal,
  PhoneIcon,
  PlusIcon,
  TrashIcon,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assignedTeamColumns, getStatusColor, menuOptions } from './data'
import DynamicAssignmentModal from './dynamic-assignment-modal'
import { ProjectManagerCard } from './ProjectManagerCard'
import { TeamSection } from './team-section'

type ModalConfig = {
  type: string
  title: string
  description: string
  selectLabel: string
  selectPlaceholder: string
  saveHandler: (selectedId: number) => Promise<void>
}

type TeamType =
    | 'team-member'
    | 'operations-manager'
    | 'project-manager'
    | 'team-leader'

export default function ProjectTeam() {
  const { id } = useParams()
  const { toast } = useToast()
  const venue_short_code = useShortCode()
  const [assignEmployee] = useAssignEmployeeMutation()
  const [assignOperationsManager] = useAssignOperationsManagersMutation()
  const [assignProjectManager] = useAssignProjectManagerMutation()
  const [assignTeamToProject] = useAssignTeamMutation()
  const [assignTeamLeaders] = useAssignTeamLeadersMutation()
  const [unassignEmployee] = useUnassignEmployeeMutation()
  const [unassignTeamLeader] = useUnassignTeamLeaderMutation()
  const [unassignOperationsManager] = useUnassignOperationsManagerMutation()
  const [unassignProjectManager] = useUnassignProjectManagerMutation()

  const [getEmployees] = useLazyGetEmployeesQuery()
  const [getOperationsManager] = useLazyGetOperationsManagerQuery()
  const [getTeams] = useLazyGetTeamsQuery()
  const [getTeamLeaders] = useLazyGetTeamleadersQuery()

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<TeamMember | null>(null)
  const [teamLeaderOpen, setTeamLeaderOpen] = useState(false)
  const [activeModal, setActiveModal] = useState<string>()
  const [modalOptions, setModalOptions] = useState<OptionsType[]>([])

  const [deleteTeamLeaderOpen, setDeleteTeamLeaderOpen] = useState(false)
  const [deleteOperationsManagerOpen, setDeleteOperationsManagerOpen] = useState(false)
  const [selectedTeamLeader, setSelectedTeamLeader] = useState<TeamMember | null>(null)
  const [selectedOperationsManager, setSelectedOperationsManager] = useState<TeamMember | null>(null)


  const projectParams = {
    id: id ?? '',
    venue_short_code,
  }

  const {
    data: projectsTeam,
    isFetching,
    isError,
    refetch,
  } = useGetProjectsTeamQuery(projectParams, { skip: !id })

  const handleRemoveEmployee = async () => {
    if (!selectedEmployee) return
    try {
      await unassignEmployee({
        venue_short_code,
        projectId: Number(id),
        employeeId: selectedEmployee.id,
      }).unwrap()
      toast({
        title: 'Success',
        description: 'Employee removed from project successfully',
      })
      setDeleteOpen(false)
      setSelectedEmployee(null)
      refetch()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove team member from the project',
        variant: 'destructive',
      })
    }
  }

  const handleRemoveTeamLeader = async (leaderId: number) => {
    try {
      await unassignTeamLeader({
        venue_short_code,
        projectId: Number(id),
        team_leader_ids: [leaderId],
      }).unwrap()
      toast({
        title: 'Success',
        description: 'Team leader removed successfully',
      })
      refetch()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove team leader',
        variant: 'destructive',
      })
    }
  }

  const handleRemoveOperationsManager = async (managerId: number) => {
    try {
      await unassignOperationsManager({
        venue_short_code,
        projectId: Number(id),
        operations_manager_ids: [managerId],
      }).unwrap()
      toast({
        title: 'Success',
        description: 'Operations manager removed successfully',
      })
      refetch()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove operations manager',
        variant: 'destructive',
      })
    }
  }

  const handleRemoveProjectManager = async (managerId: number) => {
    try {
      await unassignProjectManager({
        venue_short_code,
        projectId: Number(id),
        // @ts-ignore
        project_manager_id: managerId,
      }).unwrap()
      toast({
        title: 'Success',
        description: 'Project manager removed successfully',
      })
      refetch()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove project manager',
        variant: 'destructive',
      })
    }
  }

  const handleRemove = async (id: number, type: TeamType, member: TeamMember) => {
    switch (type) {
      case 'team-member':
        setSelectedEmployee(member)
        setDeleteOpen(true)
        break
      case 'team-leader':
        setSelectedTeamLeader(member)
        setDeleteTeamLeaderOpen(true)
        break
      case 'operations-manager':
        setSelectedOperationsManager(member)
        setDeleteOperationsManagerOpen(true)
        break
      case 'project-manager':
        await handleRemoveProjectManager(id)
        break
    }
  }

  useEffect(() => {
    if (activeModal) {
      switch (modalConfigs[activeModal].type) {
        case 'assign-employee':
          getEmployees(venue_short_code)
              .unwrap()
              .then((res) => {
                const filteredOptions = res.filter(
                    (item) =>
                        !projectsTeam?.team_members
                            .map((item) => item.id)
                            .includes(item.id)
                )
                setModalOptions(
                    filteredOptions.map((employee) => ({
                      value: {
                        label: employee.name,
                        value: employee.id.toString(),
                      },
                      label: employee.name,
                    }))
                )
              })
          break
        case 'assign-operations-manager':
          getOperationsManager({ venue_short_code })
              .unwrap()
              .then((res) => {
                const filteredOptions = res.filter(
                    (item) =>
                        !projectsTeam?.operations_managers
                            .map((item) => item.id)
                            .includes(item.id)
                )
                setModalOptions(
                    filteredOptions.map((opManager) => ({
                      value: {
                        label: opManager.name,
                        value: opManager.id.toString(),
                      },
                      label: opManager.name,
                    }))
                )
              })
          break
        case 'assign-team-to-project':
          getTeams({ venue_short_code, page: 1, size: 50 })
              .unwrap()
              .then((res) => {
                const filteredOptions = res.data.filter(
                    (item) => projectsTeam?.assigned_team?.id !== item.id
                )
                setModalOptions(
                    filteredOptions.map((team) => ({
                      value: {
                        label: team.name,
                        value: team.id.toString(),
                      },
                      label: team.name,
                    }))
                )
              })
          break
        default:
          getTeamLeaders({ venue_short_code })
              .unwrap()
              .then((res) => {
                setModalOptions(
                    res.map((teamLeader) => ({
                      value: {
                        label: teamLeader.name,
                        value: teamLeader.id.toString(),
                      },
                      label: teamLeader.name,
                    }))
                )
              })
          break
      }
    }
  }, [activeModal])

  useEffect(() => {
    if (teamLeaderOpen) {
      getTeamLeaders({ venue_short_code })
          .unwrap()
          .then((res) => {
            setModalOptions(
                res.map((teamLeader) => ({
                  value: {
                    label: teamLeader.name,
                    value: teamLeader.id.toString(),
                  },
                  label: teamLeader.name,
                }))
            )
          })
    }
  }, [teamLeaderOpen])

  const columns = (type: TeamType): ColumnDef<TeamMember>[] => {
    return [
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
                    <AvatarImage
                        src={original.profile_picture}
                        alt={original.name}
                    />
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
        header: 'Joined',
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
            <div className='flex w-fit items-center'>
              <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => handleRemove(original.id, type, original)}
                  className='hover:text-destructive focus:text-destructive'
              >
                <TrashIcon className='text-red-700' size={18} />
              </Button>
            </div>
        ),
      },
    ]
  }

  const modalConfigs: Record<string, ModalConfig> = {
    AssignEmployee: {
      type: 'assign-employee',
      title: 'Assign Employee',
      description: 'Select an employee to add to the project team.',
      selectLabel: 'Select Employee',
      selectPlaceholder: 'Choose an employee',
      saveHandler: async (selectedId: number) => {
        await assignEmployee({
          venue_short_code,
          projectId: Number(id),
          employeeId: Number(selectedId),
        })
            .unwrap()
            .then(() => {
              refetch()
              toast({
                title: 'Success',
                description: 'Employee assigned successfully',
              })
            })
            .catch(() => {
              toast({
                title: 'Error',
                description: 'Failed to assign employee',
                variant: 'destructive',
              })
            })
      },
    },
    AssignOperationsManager: {
      type: 'assign-operations-manager',
      title: 'Assign Operations Manager',
      description: 'Select an operations manager for the project.',
      selectLabel: 'Select Operations Manager',
      selectPlaceholder: 'Choose an operations manager',
      saveHandler: async (selectedId: number) => {
        await assignOperationsManager({
          venue_short_code,
          projectId: Number(id),
          operationsManagerIds: [selectedId],
        })
            .unwrap()
            .then(() => {
              refetch()
              toast({
                title: 'Success',
                description: 'Operations manager assigned successfully',
              })
            })
            .catch(() => {
              toast({
                title: 'Error',
                description: 'Failed to assign operations manager',
                variant: 'destructive',
              })
            })
      },
    },
    AssignProjectManager: {
      type: 'assign-project-manager',
      title: 'Assign Project Manager',
      description: 'Select a project manager for the project.',
      selectLabel: 'Select Project Manager',
      selectPlaceholder: 'Choose a project manager',
      saveHandler: async (selectedId: number) => {
        await assignProjectManager({
          venue_short_code,
          projectId: Number(id),
          employeeId: selectedId,
        })
            .unwrap()
            .then(() => {
              refetch()
              toast({
                title: 'Success',
                description: 'Project manager assigned successfully',
              })
            })
            .catch(() => {
              toast({
                title: 'Error',
                description: 'Failed to assign project manager',
                variant: 'destructive',
              })
            })
      },
    },
    AssignTeamToProject: {
      type: 'assign-team-to-project',
      title: 'Assign Team to Project',
      description: 'Select a team to assign to this project.',
      selectLabel: 'Select Team',
      selectPlaceholder: 'Choose a team',
      saveHandler: async (selectedId: number) => {
        await assignTeamToProject({
          venue_short_code,
          projectId: Number(id),
          teamId: selectedId,
        })
            .unwrap()
            .then(() => {
              refetch()
              toast({
                title: 'Success',
                description: 'Team assigned successfully',
              })
            })
            .catch(() => {
              toast({
                title: 'Error',
                description: 'Failed to assign team',
                variant: 'destructive',
              })
            })
      },
    },
  }

  const handleTeamLeaderAssignment = async (selectedId: number) => {
    try {
      await assignTeamLeaders({
        venue_short_code,
        projectId: Number(id),
        teamLeaderIds: [selectedId],
      }).unwrap()
      toast({
        title: 'Success',
        description: 'Team leader assigned successfully',
      })
      refetch()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to assign team leader',
        variant: 'destructive',
      })
    }
  }

  // @ts-ignore
  return (
      <Layout>
        <ConfirmationModal
            handleDelete={handleRemoveEmployee}
            open={deleteOpen}
            setOpen={setDeleteOpen}
            id={selectedEmployee}
            title='Remove Team Member'
            description='Are you sure you want to remove this member from the project? This action cannot be undone.'
        />

        <ConfirmationModal
            // @ts-ignore
            handleDelete={() => selectedTeamLeader && handleRemoveTeamLeader(selectedTeamLeader.id)}
            open={deleteTeamLeaderOpen}
            setOpen={setDeleteTeamLeaderOpen}
            id={selectedTeamLeader}
            title='Remove Team Leader'
            description='Are you sure you want to remove this team leader from the project? This action cannot be undone.'
        />

        <ConfirmationModal
            // @ts-ignore
            handleDelete={() => selectedOperationsManager && handleRemoveOperationsManager(selectedOperationsManager.id)}
            open={deleteOperationsManagerOpen}
            setOpen={setDeleteOperationsManagerOpen}
            id={selectedOperationsManager}
            title='Remove Operations Manager'
            description='Are you sure you want to remove this operations manager from the project? This action cannot be undone.'
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
              <h2 className='text-2xl font-bold tracking-tight'>Project Team</h2>
              <p className='text-muted-foreground'>
                Manage your project team members and their roles
              </p>
            </div>

            <div className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='flex items-center gap-2'>
                    <MoreHorizontal className='h-5 w-5' />
                    Manage Team
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side='bottom' align='end'>
                  {menuOptions.map(({ label, icon: Icon, action }) => (
                      <DropdownMenuItem
                          key={action}
                          onClick={() => setActiveModal(action)}
                      >
                        <Icon className='mr-2 h-4 w-4' /> {label}
                      </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                  onClick={() => setTeamLeaderOpen(true)}
                  className='flex items-center gap-2'
              >
                <PlusIcon className='h-4 w-4' />
                Add Team Leader
              </Button>
            </div>
          </div>

          {projectsTeam?.project_manager ? (
              <ProjectManagerCard
                  manager={projectsTeam.project_manager}
                  refetch={refetch}
              />
          ) : (
              <Card className='mb-8'>
                <CardContent className='p-6 text-center text-muted-foreground'>
                  <p>No project manager assigned</p>
                </CardContent>
              </Card>
          )}

          <TeamSection
              title='Operations Managers'
              description='Project operations management team'
              data={projectsTeam?.operations_managers}
              isLoading={isFetching}
              isError={isError}
              columns={columns('operations-manager')}
          />
          <TeamSection
              title='Assigned Team'
              description='Project assigned team'
              data={[projectsTeam?.assigned_team]}
              isLoading={isFetching}
              isError={isError}
              columns={assignedTeamColumns()}
          />
          <TeamSection
              title='Team Leaders'
              description='Project team leadership'
              data={projectsTeam?.team_leaders}
              isLoading={isFetching}
              isError={isError}
              columns={columns('team-leader')}
          />
          <TeamSection
              title='Team Members'
              description='Project team members'
              data={projectsTeam?.team_members}
              isLoading={isFetching}
              isError={isError}
              columns={columns('team-member')}
          />

          {activeModal && modalConfigs[activeModal] && (
              <DynamicAssignmentModal
                  open={Boolean(activeModal)}
                  setOpen={() => setActiveModal(undefined)}
                  title={modalConfigs[activeModal].title}
                  description={modalConfigs[activeModal].description}
                  selectLabel={modalConfigs[activeModal].selectLabel}
                  selectPlaceholder={modalConfigs[activeModal].selectPlaceholder}
                  options={modalOptions}
                  onSave={modalConfigs[activeModal].saveHandler}
                  isLoading={false}
              />
          )}

          <DynamicAssignmentModal
              open={teamLeaderOpen}
              setOpen={setTeamLeaderOpen}
              title='Add Team Leader'
              description='Select a team leader to add to the project.'
              selectLabel='Select Team Leader'
              selectPlaceholder='Choose a team leader'
              options={modalOptions}
              onSave={handleTeamLeaderAssignment}
              isLoading={false}
          />
        </Layout.Body>
      </Layout>
  )
}