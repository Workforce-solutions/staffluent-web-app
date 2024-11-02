import { OpenModalProps } from '@/@types/common'
import { TeamsResponse } from '@/@types/staff'
import DepartmentsDropdown from '@/components/staff/departments-dropdown'
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
import {
  useCreateTeamMutation,
  useUpdateTeamMutation,
} from '@/services/staffApi'
import { IconUsers } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

interface CreateEditTeamModalProps extends OpenModalProps {
  team?: TeamsResponse
}

export function CreateEditTeamModal({
  open,
  setOpen,
  team,
}: CreateEditTeamModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [departmentId, setDepartmentId] = useState<number>()
  const [createTeam, { isLoading: isCreating }] = useCreateTeamMutation()
  const [updateTeam, { isLoading: isUpdating }] = useUpdateTeamMutation()
  const { toast } = useToast()
  const venue_short_code = useShortCode()

  const isLoading = isCreating || isUpdating
  const isEditing = !!team

  useEffect(() => {
    if (team) {
      const id = team.department_id ? Number(team.department_id) : undefined
      setName(team.name)
      setDescription(team.description || '')
      setDepartmentId(id)
    } else {
      setName('')
      setDescription('')
      setDepartmentId(undefined)
    }
  }, [team])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!departmentId) {
      toast({
        title: 'Error',
        description: 'Please select a department',
        variant: 'destructive',
      })
      return
    }

    try {
      if (isEditing && team) {
        await updateTeam({
          id: team.id,
          name,
          description,
          department_id: departmentId,
          short_code: venue_short_code,
        }).unwrap()
      } else {
        await createTeam({
          name,
          description,
          department_id: departmentId,
          short_code: venue_short_code,
        }).unwrap()
      }

      toast({
        title: 'Success',
        description: `Team ${isEditing ? 'updated' : 'created'} successfully`,
      })
      setOpen(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${isEditing ? 'update' : 'create'} team`,
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
              <IconUsers size={24} />
              <span>{isEditing ? 'Edit Team' : 'Create New Team'}</span>
            </div>
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update team details. Click save when you're done."
              : "Add a new team to your organization. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-left'>
                Team Name
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
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='department' className='text-left'>
                Department
              </Label>
              <div className='col-span-3'>
                <DepartmentsDropdown
                  departmentId={
                    departmentId === 0 ? team?.department_id : departmentId
                  }
                  onChange={(value) => setDepartmentId(Number(value))}
                />
              </div>
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
              {isLoading
                ? isEditing
                  ? 'Updating...'
                  : 'Creating...'
                : isEditing
                  ? 'Update Team'
                  : 'Create Team'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
