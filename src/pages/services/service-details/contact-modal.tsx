import { OpenModalProps } from '@/@types/common'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useNavigate } from 'react-router-dom'

const ContactModal = ({ setOpen, open }: OpenModalProps) => {

  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Contact us</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Us</DialogTitle>
          <DialogDescription>
            Contact us by opening support ticket or chating with us
          </DialogDescription>
        </DialogHeader>
        <div className='mt-4 flex justify-end space-x-2'>
          <Button
            variant='outline'
            className='w-48'
            onClick={() => {
              setOpen(false)
              navigate(`/support/tickets`)
            }}
          >
            Redirect to support Ticket
          </Button>
          <Button
            className='w-48'
            onClick={() => {
              // Logic to start a chat
              console.log('Start chat clicked')
              setOpen(false)
            }}
          >
            Start Chat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ContactModal
