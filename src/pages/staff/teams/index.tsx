import { TeamsResponse } from '@/@types/staff'
import { Layout } from '@/components/custom/layout'
import { initialPage } from '@/components/table/data'
import ThemeSwitch from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { UserNav } from '@/components/user-nav'
import ConfirmationModal from '@/components/wrappers/confirmation-modal'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import { useShortCode } from '@/hooks/use-local-storage'
import { useDeleteTeamMutation, useGetTeamsQuery } from '@/services/staffApi'
import { PlusIcon, BlendIcon } from 'lucide-react'
import { useState } from 'react'
import { CreateOperationsManager } from './add-operations-manager'
import { getColumns } from './columns'
import { CreateEditTeamModal } from './create-edit-team'

export default function TeamsOverview() {
  const [paginationValues, setPaginationValues] = useState(initialPage)
  const venue_short_code = useShortCode()
  const [modalOpen, setModalOpen] = useState(false)
  const [openOfficeManager, setOpenOfficeManager] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<TeamsResponse>()
  const [searchTerm, setSearchTerm] = useState('')

  const { toast } = useToast()
  const [deleteTeam] = useDeleteTeamMutation()

  const {
    data: teamsResponse,
    isLoading,
    isError,
  } = useGetTeamsQuery({
    venue_short_code,
    ...paginationValues,
  })

  const handleDelete = async () => {
    if (!selectedTeam) return

    try {
      await deleteTeam({
        id: selectedTeam.id,
        short_code: venue_short_code,
      }).unwrap()

      toast({
        title: 'Success',
        description: 'Team deleted successfully',
      })
      setDeleteOpen(false)
      setSelectedTeam(undefined)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete team',
        variant: 'destructive',
      })
    }
  }

  const columns = getColumns({
    setDeleteOpen,
    setSelectedTeam,
    setModalOpen,
  })

  return (
    <Layout>
      <CreateEditTeamModal
        open={modalOpen}
        setOpen={setModalOpen}
        team={selectedTeam}
      />

      <CreateOperationsManager
        setOpen={setOpenOfficeManager}
        open={openOfficeManager}
      />

      <ConfirmationModal
        {...{ handleDelete }}
        open={deleteOpen}
        setOpen={setDeleteOpen}
        id={selectedTeam}
        title='Delete Team'
        description='Are you sure you want to delete this team? This action cannot be undone.'
      />

      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-8'>
        <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Teams</h2>
            <p className='text-muted-foreground'>
              Organize and manage your team departments
            </p>
          </div>
          <div className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0'>
            <Input
              placeholder='Search teams...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full sm:w-64'
            />
            <Button
              onClick={() => {
                setSelectedTeam(undefined)
                setModalOpen(true)
                setOpenOfficeManager(false)
              }}
              className='flex items-center gap-2'
            >
              <PlusIcon className='h-4 w-4' />
              Create Team
            </Button>

            <Button
              onClick={() => {
                setSelectedTeam(undefined)
                setOpenOfficeManager(true)
                setModalOpen(false)
              }}
              className='flex items-center gap-2'
            >
              <BlendIcon className='h-4 w-4' />
              Operations Managers
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className='pt-6'>
            <GenericTableWrapper
              columns={columns}
              data={teamsResponse?.data || []}
              isLoading={isLoading}
              isError={isError}
              paginationValues={paginationValues}
              setPaginationValues={setPaginationValues}
              total_pages={teamsResponse?.total_pages}
            />
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
