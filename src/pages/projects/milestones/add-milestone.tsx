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
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { FormEvent, useState } from 'react'
import { Calendar, Package, Construction } from 'lucide-react'

interface AddMilestoneModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}

type MaterialItem = {
  name: string
  quantity: string
  status: 'pending' | 'ordered' | 'delivered' | 'partial'
}

export function AddMilestoneModal({ open, setOpen }: AddMilestoneModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    status: 'scheduled',
    description: '',
    materials: [] as MaterialItem[],
    estimatedDuration: '',
    weatherSensitive: false,
    prerequisites: '',
    team: '',
    priority: 'medium',
  })

  const [newMaterial, setNewMaterial] = useState({
    name: '',
    quantity: '',
    status: 'pending' as const,
  })

  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleAddMaterial = () => {
    if (newMaterial.name && newMaterial.quantity) {
      setFormData({
        ...formData,
        materials: [...formData.materials, { ...newMaterial }],
      })
      setNewMaterial({ name: '', quantity: '', status: 'pending' })
    }
  }

  const handleRemoveMaterial = (index: number) => {
    const newMaterials = formData.materials.filter((_, i) => i !== index)
    setFormData({ ...formData, materials: newMaterials })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate dates
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      toast({
        title: 'Error',
        description: 'End date must be after start date',
        variant: 'destructive',
      })
      setIsLoading(false)
      return
    }

    try {
      // Add your API call here
      console.log('Submitting milestone:', formData)
      toast({
        title: 'Success',
        description: 'Milestone created successfully',
      })
      setOpen(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create milestone',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='flex max-h-[95vh] flex-col sm:max-w-[425px] md:min-w-[600px]'>
        <DialogHeader>
          <DialogTitle>
            <div className='flex items-center space-x-2'>
              <Construction className='h-6 w-6' />
              <span>Add New Milestone</span>
            </div>
          </DialogTitle>
          <DialogDescription>
            Create a new construction milestone. Fill in all required details.
          </DialogDescription>
        </DialogHeader>

        <div className='max-h-[90vh] flex-1 overflow-y-auto pr-2'>
          <form id='create-milestone-form' onSubmit={handleSubmit}>
            <div className='grid gap-6 py-4'>
              {/* Basic Information */}
              <div className='space-y-4'>
                <h3 className='text-lg font-medium'>Basic Information</h3>
                <div className='grid gap-4'>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='name' className='text-left'>
                      Name
                    </Label>
                    <Input
                      id='name'
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className='col-span-3'
                      placeholder='Enter milestone name'
                      required
                    />
                  </div>

                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='priority' className='text-left'>
                      Priority
                    </Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) =>
                        setFormData({ ...formData, priority: value })
                      }
                    >
                      <SelectTrigger className='col-span-3'>
                        <SelectValue placeholder='Select priority' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='low'>Low Priority</SelectItem>
                        <SelectItem value='medium'>Medium Priority</SelectItem>
                        <SelectItem value='high'>High Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Timeline Section */}
              <div className='space-y-4'>
                <div className='flex items-center space-x-2'>
                  <Calendar className='h-5 w-5' />
                  <h3 className='text-lg font-medium'>Timeline</h3>
                </div>
                <div className='grid gap-4'>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='startDate' className='text-left'>
                      Start Date
                    </Label>
                    <Input
                      id='startDate'
                      type='date'
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                      className='col-span-3'
                      required
                    />
                  </div>

                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='endDate' className='text-left'>
                      End Date
                    </Label>
                    <Input
                      id='endDate'
                      type='date'
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                      className='col-span-3'
                      required
                    />
                  </div>

                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='duration' className='text-left'>
                      Est. Duration (days)
                    </Label>
                    <Input
                      id='duration'
                      type='number'
                      min='1'
                      value={formData.estimatedDuration}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          estimatedDuration: e.target.value,
                        })
                      }
                      className='col-span-3'
                      required
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Materials Section */}
              <div className='space-y-4'>
                <div className='flex items-center space-x-2'>
                  <Package className='h-5 w-5' />
                  <h3 className='text-lg font-medium'>Required Materials</h3>
                </div>

                <div className='space-y-4'>
                  {formData.materials.map((material, index) => (
                    <div key={index} className='flex items-center space-x-2'>
                      <span className='flex-1'>{material.name}</span>
                      <span className='flex-1'>{material.quantity}</span>
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        onClick={() => handleRemoveMaterial(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}

                  <div className='flex space-x-2'>
                    <Input
                      placeholder='Material name'
                      value={newMaterial.name}
                      onChange={(e) =>
                        setNewMaterial({ ...newMaterial, name: e.target.value })
                      }
                    />
                    <Input
                      placeholder='Quantity'
                      value={newMaterial.quantity}
                      onChange={(e) =>
                        setNewMaterial({
                          ...newMaterial,
                          quantity: e.target.value,
                        })
                      }
                    />
                    <Button type='button' onClick={handleAddMaterial}>
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Additional Details */}
              <div className='grid gap-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='prerequisites' className='text-left'>
                    Prerequisites
                  </Label>
                  <Input
                    id='prerequisites'
                    value={formData.prerequisites}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        prerequisites: e.target.value,
                      })
                    }
                    className='col-span-3'
                    placeholder='Enter any prerequisite milestones'
                  />
                </div>

                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='description' className='text-left'>
                    Description
                  </Label>
                  <Input
                    id='description'
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className='col-span-3'
                    placeholder='Add detailed description'
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <DialogFooter className='mt-6 flex flex-none justify-between sm:justify-end sm:space-x-2'>
          <Button
            type='button'
            variant='outline'
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            form='create-milestone-form'
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Milestone'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
