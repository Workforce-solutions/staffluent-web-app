// 'use client'

import { FieldValueProps, OpenModalProps, OptionsType } from '@/@types/common'
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
import { useShortCode } from '@/hooks/use-local-storage'
import {
  useCreateTeamEmployeeMutation,
  useGetEmployeesQuery,
} from '@/services/staffApi'
import { IconBuilding } from '@tabler/icons-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export function CreateTeamEmployee({ open, setOpen }: OpenModalProps) {
  const { toast } = useToast()
  const { id } = useParams()
  const short_code = useShortCode()
  const [createTeamEmployee, { isLoading }] = useCreateTeamEmployeeMutation()

  const [selectedEmployees, setSelectedEmployees] = useState<FieldValueProps[]>(
    []
  )

  const { data: employees = [] } = useGetEmployeesQuery(short_code)

  const employeeOptions: OptionsType[] = employees.map((employee) => ({
    value: { label: employee.name, value: employee.id.toString() },
    label: employee.name,
  }))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const employeeIds = selectedEmployees.map((employee) =>
        Number(employee.value)
      )
      await createTeamEmployee({
        short_code,
        id: Number(id),
        employees_ids: employeeIds,
      }).unwrap()
      toast({
        title: 'Success',
        description: 'Employee created successfully',
      })
      setOpen(false)
      setSelectedEmployees([])
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create employee',
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
              <span>Create New Employee</span>
            </div>
          </DialogTitle>
          <DialogDescription>
            Add a new employee to your team. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div>
            <Label className='col-span-4 text-left'>Select Employees</Label>
            <MultiselectDropdown
              itemValue={employeeOptions}
              value={selectedEmployees}
              setValue={setSelectedEmployees}
              multiSelectorPlaceholder='Select employees'
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
              {isLoading ? 'Creating...' : 'Create Employee'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
