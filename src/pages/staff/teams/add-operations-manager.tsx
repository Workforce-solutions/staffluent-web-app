import { FieldValueProps, OpenModalProps, OptionsType } from '@/@types/common'
import EmployeesDropdown from '@/components/staff/employee-dropdown'
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
import MultiselectDropdown from '@/components/wrappers/multiselect-dropdown'
import { useTeams } from '@/hooks/dropdown-values/use-teams'
import { useShortCode } from '@/hooks/use-local-storage'
import { useCreateTeamOfficeManagerMutation } from '@/services/staffApi'
import { IconBuilding } from '@tabler/icons-react'
import { useState } from 'react'
import { ROLES } from './team-employees/add-team-leader'

export function CreateOperationsManager({ open, setOpen }: OpenModalProps) {
  const { toast } = useToast()
  const short_code = useShortCode()
  const [createTeamOfficeManager, { isLoading }] =
    useCreateTeamOfficeManagerMutation()

  const [employee_id, setEmployeeId] = useState<string>()

  const [selectedTeams, setSelectedTeams] = useState<FieldValueProps[]>([])

  const { teamsData } = useTeams()

  const teamOptions: OptionsType[] = teamsData.map((team) => ({
    value: { label: team.name, value: team.id.toString() },
    label: team.name,
  }))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const team_ids = selectedTeams.map((employee) => Number(employee.value))
      await createTeamOfficeManager({
        short_code,
        employee_id: Number(employee_id),
        team_ids,
      }).unwrap()
      toast({
        title: 'Success',
        description: 'Operations Manager created successfully',
      })
      setOpen(false)
      setSelectedTeams([])
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create Operations Manager',
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
              <IconBuilding size={24} />
              <span>Create New Operation Manager</span>
            </div>
          </DialogTitle>
          <DialogDescription>
            Add a new Operation Manager to your team. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <div>
            <EmployeesDropdown
              onChange={setEmployeeId}
              id={employee_id}
              role={ROLES.operationManager}
            />
          </div>
          <div>
            <Label className='col-span-4 text-left'>Select Teams</Label>
            <MultiselectDropdown
              itemValue={teamOptions}
              value={selectedTeams}
              setValue={setSelectedTeams}
              multiSelectorPlaceholder='Select teams'
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
              {isLoading ? 'Creating...' : 'Create Operation Manager'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
