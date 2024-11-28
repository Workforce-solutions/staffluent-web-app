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
import { useLocalStorageString } from '@/hooks/use-local-storage'
import { AccountType } from '@/pages/auth/components/user-auth-form'
import { useNavigate } from 'react-router-dom'

const ContactModal = ({ setOpen, open }: OpenModalProps) => {
  const navigate = useNavigate()
  const accountType = useLocalStorageString('accountType') as AccountType
  const redirectToTickets = () => {
    setOpen(false)

    switch (accountType) {
      case AccountType.business:
        navigate(`/admin/support/tickets`)
        break
      case AccountType.client:
        navigate(`/client-portal/support`)
        break
    }
  }
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
            onClick={redirectToTickets}
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
