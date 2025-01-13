import { Site } from '@/@types/site-management'
import { EmployeeResponse } from '@/@types/staff'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { useShortCode } from '@/hooks/use-local-storage'
import { useAddOshaMutation } from '@/services/safetyApi'
import { useGetSitesQuery } from '@/services/siteManagmentApi'
import { useGetEmployeesQuery } from '@/services/staffApi'
import { Trash2Icon } from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'

interface AddEditOSHAModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function AddEditOSHAModal({ open, setOpen }: AddEditOSHAModalProps) {
  const [formData, setFormData] = useState({
    construction_site_id: '',
    title: '',
    last_inspection_date: '',
    next_inspection_date: '',
    status: 'pending',
    requirements: [] as string[],
    required_actions: [] as string[],
    assigned_to: '',
  })

  useEffect(() => {
    if (open) {
      setFormData({
        construction_site_id: '',
        title: '',
        last_inspection_date: '',
        next_inspection_date: '',
        status: 'pending',
        requirements: [],
        required_actions: [],
        assigned_to: '',
      })
    }
  }, [open])

  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const short_code = useShortCode()
  const { data: sites } = useGetSitesQuery({ shortCode: short_code })
  const { data: employees } = useGetEmployeesQuery(short_code)
  const [addOsha] = useAddOshaMutation()
  const [requirements, setRequirements] = useState<string[]>([''])
  const [requiredActions, setRequiredActions] = useState<string[]>([''])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await addOsha({
        shortCode: short_code,
        complianceData: {
          ...formData,
          requirements: requirements,
          required_actions: requiredActions,
        },
      })
      if (response.data) {
        toast({
          title: 'Success',
          description: 'OSHA requirement has been saved.',
        })
        setOpen(false)
      } else {
        toast({
          title: 'Error',
          description: 'Failed to save OSHA requirement.',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save OSHA requirement.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...requirements]
    newRequirements[index] = value
    setRequirements(newRequirements)
  }

  const removeRequirement = (index: number) => {
    const newRequirements = [...requirements]
    newRequirements.splice(index, 1)
    setRequirements(newRequirements)
  }

  const handleRequiredActionChange = (index: number, value: string) => {
    const newRequiredActions = [...requiredActions]
    newRequiredActions[index] = value
    setRequiredActions(newRequiredActions)
  }

  const removeRequiredAction = (index: number) => {
    const newRequiredActions = [...requiredActions]
    newRequiredActions.splice(index, 1)
    setRequiredActions(newRequiredActions)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Add OSHA Requirement</DialogTitle>
          <DialogDescription>
            Add a new OSHA compliance requirement for tracking and management.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='site' className='text-right'>
                Construction Site
              </Label>
              <Select
                value={formData.construction_site_id}
                onValueChange={(value) =>
                  setFormData({ ...formData, construction_site_id: value })
                }
              >
                <SelectTrigger className='col-span-3'>
                  <SelectValue placeholder='Select construction site' />
                </SelectTrigger>
                <SelectContent>
                  {sites?.data?.map((site: Site) => (
                    <SelectItem key={site.id} value={site.id.toString()}>
                      {site.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='title' className='text-right'>
                Title
              </Label>
              <Input
                id='title'
                className='col-span-3'
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='last_inspection' className='text-right'>
                Last Inspection
              </Label>
              <Input
                id='last_inspection'
                type='date'
                className='col-span-3'
                value={formData.last_inspection_date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    last_inspection_date: e.target.value,
                  })
                }
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='next_inspection' className='text-right'>
                Next Inspection
              </Label>
              <Input
                id='next_inspection'
                type='date'
                className='col-span-3'
                value={formData.next_inspection_date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    next_inspection_date: e.target.value,
                  })
                }
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='status' className='text-right'>
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger className='col-span-3'>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='pending'>Pending</SelectItem>
                  <SelectItem value='compliant'>Compliant</SelectItem>
                  <SelectItem value='non-compliant'>Non-Compliant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {requirements.map((requirement, index) => (
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='requirements' className='text-right'>
                  Requirements {index + 1}
                </Label>
                <div key={index} className='col-span-2 flex items-center gap-2'>
                  <Input
                    value={requirement}
                    onChange={(e) =>
                      handleRequirementChange(index, e.target.value)
                    }
                  />
                </div>
                <Button type='button' variant='outline' onClick={() => removeRequirement(index)}>
                  <Trash2Icon className='w-4 h-4' />
                </Button>
              </div>
            ))}

            <div className='grid grid-cols-4 items-center gap-4'>
              <div className='col-span-3'></div>
              <Button
                type='button'
                variant='outline'
                onClick={() => setRequirements([...requirements, ''])}
              >
                Add Requirement
              </Button>
            </div>

            {requiredActions.map((requiredAction, index) => (
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='required_actions' className='text-right'>
                  Required Actions {index + 1}
                </Label>
                <div key={index} className='col-span-2 flex items-center gap-2'>
                  <Input
                    value={requiredAction}
                    onChange={(e) =>
                      handleRequiredActionChange(index, e.target.value)
                    }
                  />
                </div>
                <Button type='button' variant='outline' onClick={() => removeRequiredAction(index)}>
                  <Trash2Icon className='w-4 h-4' />
                </Button>
              </div>
            ))}

            <div className='grid grid-cols-4 items-center gap-4'>
              <div className='col-span-3'></div>
              <Button
                type='button'
                variant='outline'
                onClick={() => setRequiredActions([...requiredActions, ''])}
              >
                Add Actions
              </Button>
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='assigned_to' className='text-right'>
                Assigned To
              </Label>
              <Select
                value={formData.assigned_to}
                onValueChange={(value) =>
                  setFormData({ ...formData, assigned_to: value })
                }
              >
                <SelectTrigger className='col-span-3'>
                  <SelectValue placeholder='Select assignee' />
                </SelectTrigger>
                <SelectContent>
                  {employees?.map((employee: EmployeeResponse) => (
                    <SelectItem
                      key={employee.id}
                      value={employee.id.toString()}
                    >
                      {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type='submit' disabled={isLoading}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
