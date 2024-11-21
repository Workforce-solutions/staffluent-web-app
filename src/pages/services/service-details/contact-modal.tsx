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

const ContactModal = ({ setOpen, open }: OpenModalProps) => {
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
            onClick={() => {
              setOpen(false)
            }}
          >
            Create support Ticket
          </Button>
          <Button
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
