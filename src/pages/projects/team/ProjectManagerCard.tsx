import { TeamMember } from '@/@types/project'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import ConfirmationModal from '@/components/wrappers/confirmation-modal'
import { useShortCode } from '@/hooks/use-local-storage'
import { useUnassignProjectManagerMutation } from '@/services/projectApi'
import { format } from 'date-fns'
import { CalendarIcon, MailIcon, PhoneIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getStatusColor } from './data'
import { Button } from '@/components/ui/button'

interface ProjectManagerProps {
  manager: TeamMember
  refetch: () => void
}

export const ProjectManagerCard = ({
  manager,
  refetch,
}: ProjectManagerProps) => {
  const [unassignProjectManager] = useUnassignProjectManagerMutation()
  const venue_short_code = useShortCode()
  const { id } = useParams()

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedManager, setSelectedManager] = useState<number>()

  const handleRemoveProjectManager = async () => {
    if (!manager?.id) return
    try {
      await unassignProjectManager({
        venue_short_code,
        projectId: Number(id),
        employeeId: manager.id,
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

  const openDeleteModal = () => {
    setSelectedManager(manager.id)
    setDeleteOpen(true)
  }

  if (!manager) return null

  return (
    <Card className='relative mb-8'>
      <ConfirmationModal
        handleDelete={handleRemoveProjectManager}
        open={deleteOpen}
        setOpen={setDeleteOpen}
        id={selectedManager}
        title='Remove Project Manager'
        description={`Are you sure you want to unassign ${manager.name} from this project?`}
      />

      <CardContent className='flex flex-col items-start space-y-4 p-6 sm:flex-row sm:space-x-6 sm:space-y-0'>
        <Avatar className='h-20 w-20 ring-2 ring-primary/10'>
          {manager.profile_picture.length <= 2 ? (
            <AvatarFallback className='bg-primary/10 text-xl text-primary'>
              {manager.profile_picture}
            </AvatarFallback>
          ) : (
            <AvatarImage src={manager.profile_picture} alt={manager.name} />
          )}
        </Avatar>

        <div className='flex-1 space-y-4'>
          <div className='flex flex-col justify-between gap-2 sm:flex-row sm:items-center'>
            <div>
              <h3 className='text-xl font-bold'>{manager.name}</h3>
              <p className='text-sm text-muted-foreground'>
                {manager.role || 'Project Manager'}
              </p>
            </div>
            <div className='flex items-center gap-2'>
              <Badge
                className={`${getStatusColor(manager.status)} w-fit px-4 py-1`}
                variant='outline'
              >
                {manager.status}
              </Badge>

              <Button
                variant='ghost'
                size='icon'
                onClick={openDeleteModal}
                className='text-red-700 hover:text-red-700/80'
              >
                <Trash2Icon className='h-5 w-5' />
              </Button>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            <div className='flex items-center space-x-2 text-sm'>
              <MailIcon className='h-4 w-4 text-muted-foreground' />
              <span className='truncate'>{manager.email}</span>
            </div>
            <div className='flex items-center space-x-2 text-sm'>
              <PhoneIcon className='h-4 w-4 text-muted-foreground' />
              <span>{manager.phone || 'N/A'}</span>
            </div>
            {manager.assigned_at && (
              <div className='flex items-center space-x-2 text-sm'>
                <CalendarIcon className='h-4 w-4 text-muted-foreground' />
                <span>
                  Since {format(new Date(manager.assigned_at), 'MMM d, yyyy')}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
