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
import { useToast } from '@/components/ui/use-toast'
import { useShortCode } from '@/hooks/use-local-storage'
import RolesDropdown from '@/components/staff/roles-dropdown'
import { IconUserPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { useCreateAttachedRoleMutation } from '@/services/roleApi'

export function CreateAttachedRolesModal({ open, setOpen }: OpenModalProps) {
  const [roleId, setRoleId] = useState<string>('')
  const [attachRole, { isLoading }] = useCreateAttachedRoleMutation()
  const { toast } = useToast()
  const venue_short_code = useShortCode()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!roleId) {
      toast({
        title: 'Error',
        description: 'Please select a role',
        variant: 'destructive',
      })
      return
    }

    try {
      await attachRole({
        role_id: Number(roleId),
        is_custom: false,
        venue_short_code,
      }).unwrap()

      toast({
        title: 'Success',
        description: 'Role attached successfully',
      })
      setOpen(false)
      setRoleId('')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to attach role',
        variant: 'destructive',
      })
    }
  }

  const handleRoleChange = (value: string) => {
    setRoleId(value)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px] md:min-w-[600px]'>
        <DialogHeader>
          <DialogTitle>
            <div className='flex items-center space-x-2'>
              <IconUserPlus size={24} />
              <span>Attach Role</span>
            </div>
          </DialogTitle>
          <DialogDescription>
            Attach an available role to your organization. Click save when
            you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <RolesDropdown
              roleId={roleId}
              onChange={handleRoleChange}
              role='available'
            />
          </div>
          <DialogFooter className='flex justify-between sm:justify-end sm:space-x-2'>
            <Button
              type='button'
              variant='outline'
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={isLoading}>
              {isLoading ? 'Attaching...' : 'Attach Role'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
