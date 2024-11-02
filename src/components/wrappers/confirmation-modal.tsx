import { OpenModalProps } from '@/@types/common'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'

interface ConfirmationModalProps<T> extends OpenModalProps {
  handleDelete: (id: T) => Promise<void>
  id: T
  title: string
  description?: string
  loading?: boolean
}

const ConfirmationModal = <T,>({
  setOpen,
  open,
  handleDelete,
  id,
  title,
  description = '',
  loading = false,
}: ConfirmationModalProps<T>) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDeleteClick = async () => {
    setIsLoading(true)
    try {
      await handleDelete(id)
    } finally {
      setIsLoading(false)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={handleDeleteClick}
            disabled={loading || isLoading}
            aria-busy={loading || isLoading}
          >
            {loading || isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmationModal
