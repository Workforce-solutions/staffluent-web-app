import { OpenModalProps } from '@/@types/common'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetProjectsListQuery } from '@/services/projectApi'
import { useConnectServiceRequestWithProjectMutation } from '@/services/service-requestApi'
import { useState } from 'react'

interface ConnectProjectModalProps extends OpenModalProps {
  serviceRequestId: number
}

export const ConnectProjectModal = ({
  open,
  setOpen,
  serviceRequestId,
}: ConnectProjectModalProps) => {
  const [projectId, setProjectId] = useState<string>('')
  const shortCode = useShortCode()
  const { toast } = useToast()

  const { data: projectsData } = useGetProjectsListQuery({
    venue_short_code: shortCode,
  })

  const [connectWithProject, { isLoading }] =
    useConnectServiceRequestWithProjectMutation()

  // Filter out projects that already have a service_id
  const availableProjects =
    projectsData?.projects.filter((project) => !project.service_id) || []

  const handleSubmit = async () => {
    if (!projectId) {
      toast({
        title: 'Error',
        description: 'Please select a project',
        variant: 'destructive',
      })
      return
    }

    try {
      await connectWithProject({
        venue_short_code: shortCode,
        id: serviceRequestId,
        project_id: Number(projectId),
      }).unwrap()

      toast({
        title: 'Success',
        description: 'Successfully connected service request with project',
      })
      setOpen(false)
      setProjectId('')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to connect service request with project',
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Connect to Project</DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Select Project</label>
            <Select value={projectId} onValueChange={setProjectId}>
              <SelectTrigger>
                <SelectValue placeholder='Select a project' />
              </SelectTrigger>
              <SelectContent>
                {availableProjects.map((project) => (
                  <SelectItem key={project.id} value={project.id.toString()}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {availableProjects.length === 0 && (
              <p className='text-sm text-muted-foreground'>
                No available projects found. Only projects without services can
                be connected.
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isLoading || !projectId}>
            {isLoading ? 'Connecting...' : 'Connect Project'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
