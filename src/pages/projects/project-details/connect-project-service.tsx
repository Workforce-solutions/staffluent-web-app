import { OpenModalProps } from '@/@types/common'
import ServicesDropdown from '@/components/staff/services-dropdown'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { useShortCode } from '@/hooks/use-local-storage'
import { useConnectProjectWithServiceMutation } from '@/services/projectApi'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import * as z from 'zod'

const formSchema = z.object({
  service_request_id: z.string().min(1, 'Please select a service'),
})

const ConnectProjectService = ({ setOpen, open }: OpenModalProps) => {
  const { id: project_id } = useParams<{ id: string }>()
  const venue_short_code = useShortCode()
  const { toast } = useToast()

  const [service_request_id, setServiceId] = useState<string>('')

  const [connectProjectWithService, { isLoading: isConnecting }] =
    useConnectProjectWithServiceMutation()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await connectProjectWithService({
        venue_short_code,
        project_id: Number(project_id),
        service_request_id: Number(values.service_request_id),
      }).unwrap()
      toast({
        title: 'Success',
        description: 'Project connected with service request successfully',
      })
      setOpen(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to connect project with service request',
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect project with service request</DialogTitle>
        </DialogHeader>

        <ServicesDropdown
          id={service_request_id === '' ? undefined : Number(service_request_id)}
          onChange={setServiceId}
          className='w-full'
        />
        <DialogFooter>
          <Button
            onClick={() => onSubmit({ service_request_id })}
            type='submit'
            disabled={isConnecting}
          >
            {isConnecting ? 'Connecting...' : 'Connect Service Request'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConnectProjectService
