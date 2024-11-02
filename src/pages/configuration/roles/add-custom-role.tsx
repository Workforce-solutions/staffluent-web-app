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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { useShortCode } from '@/hooks/use-local-storage'
import { useCreateCustomRoleMutation } from '@/services/roleApi'
import { IconUserShield } from '@tabler/icons-react'
import { useState } from 'react'

export function AddCustomRoleModal({ open, setOpen }: OpenModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [createCustomRole, { isLoading }] = useCreateCustomRoleMutation()
  const { toast } = useToast()
  const venue_short_code = useShortCode()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await createCustomRole({
        name,
        description,
        venue_short_code,
      }).unwrap()

      toast({
        title: 'Success',
        description: 'Custom role created successfully',
      })
      setOpen(false)
      setName('')
      setDescription('')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create custom role',
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px] md:min-w-[600px]'>
        <DialogHeader>
          <DialogTitle>
            <div className='flex items-center space-x-2'>
              <IconUserShield size={24} />
              <span>Create Custom Role</span>
            </div>
          </DialogTitle>
          <DialogDescription>
            Add a new custom role to your organization. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-left'>
                Role Name
              </Label>
              <Input
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='col-span-3'
                required
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='description' className='text-left'>
                Description
              </Label>
              <Input
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='col-span-3'
                required
              />
            </div>
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
              {isLoading ? 'Creating...' : 'Create Custom Role'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
