import { OpenModalProps } from '@/@types/common'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useParams } from 'react-router-dom'
import { useShortCode } from '@/hooks/use-local-storage'
import {
  useApproveServiceRequestMutation,
} from '@/services/service-requestApi'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { toast } from '@/components/ui/use-toast'

const ApproveModal = ({ setOpen, open, requested_date }: OpenModalProps & { requested_date: string }) => {

  const shortCode = useShortCode();
  const [approveRequest] = useApproveServiceRequestMutation();

  const [selectedDate, setSelectedDate] = useState(requested_date ? new Date(requested_date).toISOString().slice(0, -1) : '')

  const { id } = useParams();
  const handleApprove = async () => {
    try {
      await approveRequest({
        venue_short_code: shortCode,
        id: Number(id),
        scheduled_date: selectedDate,
      }).unwrap()
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.data.errors.scheduled_date[0],
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Approve</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve Request</DialogTitle>
          <DialogDescription>
            Approve the request and start a chat with the user
          </DialogDescription>
        </DialogHeader>
        <Input
          type='datetime-local'
          placeholder='Enter a message'
          className='mt-4'
          defaultValue={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          name='scheduled_date'
        />
        <DialogFooter>
          <div className='mt-4 flex justify-end space-x-2'>
            <Button
              variant='outline'
              className='w-48'
              onClick={() => {
                setOpen(false)
              }}
            >
              Cancel
            </Button>
            <Button
              className='w-48'
              onClick={handleApprove}
            >
              Approve
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ApproveModal
