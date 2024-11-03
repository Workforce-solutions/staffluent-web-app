import { OpenModalProps, OptionsType } from '@/@types/common'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import SelectWrapper from '@/components/wrappers/select-wrapper'
import { useShortCode } from '@/hooks/use-local-storage'
import {
  useCreateTeamLeaderMutation,
  useGetTeamleadersQuery,
} from '@/services/staffApi'
import { IconBuilding } from '@tabler/icons-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

// eslint-disable-next-line react-refresh/only-export-components
export enum ROLES {
  Owner = 'Owner',
  operationManager = 'Operations Manager',
  teamLeader = 'Team Leader',
  officeManager = 'Office Manager',
}

export function CreateTeamLeader({ open, setOpen }: OpenModalProps) {
  const { toast } = useToast()
  const { id } = useParams()
  const short_code = useShortCode()
  const [selectedEmployee, setSelectedEmployee] = useState(-1)
  const [createTeamEmployee, { isLoading }] = useCreateTeamLeaderMutation()

  const { data: employees = [] } = useGetTeamleadersQuery({
    venue_short_code: short_code,
  })

  const employeeOptions: OptionsType[] = employees
    .filter((item) => item.role.name === ROLES.teamLeader)
    .map((employee) => ({
      value: { label: employee.name, value: employee.id.toString() },
      label: employee.name,
    }))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedEmployee !== -1) {
      try {
        await createTeamEmployee({
          short_code,
          id: Number(id),
          employee_id: selectedEmployee,
        }).unwrap()
        toast({
          title: 'Success',
          description: 'Team leader created successfully',
        })
        setOpen(false)
        setSelectedEmployee(-1)
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to create team leader',
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px] md:min-w-[600px]'>
        <DialogHeader>
          <DialogTitle>
            <div className='flex items-center space-x-2'>
              <IconBuilding size={24} />
              <span>Create New Team Leader</span>
            </div>
          </DialogTitle>
          <DialogDescription>
            Add a new team leader to your team. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-3'>
            <Label className='col-span-4 text-left'>Select Team Leader</Label>
            <SelectWrapper
              options={employeeOptions}
              onChange={(value) => setSelectedEmployee(value)}
              placeholder='Select teamleader'
            />
          </div>
          <DialogFooter className='mt-5 flex justify-between sm:justify-end sm:space-x-2'>
            <Button
              type='button'
              variant='outline'
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Employee'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
