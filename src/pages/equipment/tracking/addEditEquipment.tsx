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
import { FormEvent, useEffect, useState } from 'react'
import { useShortCode } from '@/hooks/use-local-storage'
import { Equipment } from '@/@types/site-management'
import {
  useAddEquipmentMutation,
  useUpdateEquipmentMutation,
} from '@/services/siteManagmentApi'

interface AddEquipmentModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  equipment?: Equipment
  refetch: () => void
}

export function AddEquipmentModal({
  open,
  setOpen,
  equipment,
  refetch,
}: AddEquipmentModalProps) {
  const short_code = useShortCode()
  const [addEquipment] = useAddEquipmentMutation()
  const [updateEquipment] = useUpdateEquipmentMutation()
  const [formData, setFormData] = useState<Partial<Equipment>>({
    name: '',
    type: '',
    model: '',
    location: '',
    serial_number: '',
    purchase_date: '',
    purchase_cost: 0,
    status: 'available',
    last_maintenance_date: '',
    next_maintenance_due: '',
    maintenance_interval_days: 0,
  })

  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (equipment) {
      setFormData({
        ...equipment,
        purchase_date: equipment.purchase_date
          ? equipment.purchase_date.split('T')[0]
          : '',
        last_maintenance_date: equipment.last_maintenance_date
          ? equipment.last_maintenance_date.split('T')[0]
          : '',
        next_maintenance_due: equipment.next_maintenance_due
          ? equipment.next_maintenance_due.split('T')[0]
          : '',
      })
    }
    return () => {
      setFormData({
        name: '',
        type: '',
        model: '',
        location: '',
        serial_number: '',
        purchase_date: '',
        purchase_cost: 0,
        status: 'available',
        maintenance_interval_days: 0,
        last_maintenance_date: '',
        next_maintenance_due: '',
      })
    }
  }, [equipment])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let response = null
      if (equipment) {
        response = await updateEquipment({
          shortCode: short_code,
          equipmentData: formData,
          id: equipment.id,
        })
      } else {
        response = await addEquipment({
          shortCode: short_code,
          equipmentData: formData,
        })
      }
      if (response) {
        refetch()
        toast({
          title: 'Success',
          description: equipment
            ? 'Equipment updated successfully'
            : 'Equipment added successfully',
        })
        setOpen(false)
      } else {
        toast({
          title: 'Error',
          description: 'Failed to add equipment',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add equipment',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='flex max-h-[90vh] flex-col overflow-y-auto sm:max-w-[425px] md:min-w-[600px]'>
        <DialogHeader>
          <DialogTitle>
            {equipment ? 'Edit Equipment' : 'Add New Equipment'}
          </DialogTitle>
          <DialogDescription>
            {equipment
              ? 'Edit details for equipment'
              : 'Add details for new equipment to track'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Name
              </Label>
              <Input
                id='name'
                className='col-span-3'
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='type' className='text-right'>
                Type
              </Label>
              <Input
                id='type'
                className='col-span-3'
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='model' className='text-right'>
                Model
              </Label>
              <Input
                id='model'
                className='col-span-3'
                value={formData.model}
                onChange={(e) =>
                  setFormData({ ...formData, model: e.target.value })
                }
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='serial' className='text-right'>
                Serial #
              </Label>
              <Input
                id='serial'
                className='col-span-3'
                value={formData.serial_number}
                onChange={(e) =>
                  setFormData({ ...formData, serial_number: e.target.value })
                }
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='location' className='text-right'>
                Location
              </Label>
              <Input
                id='location'
                className='col-span-3'
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='status' className='text-right'>
                Status
              </Label>
              <Select
                onValueChange={(
                  value: 'available' | 'maintenance' | 'offline'
                ) => setFormData({ ...formData, status: value })}
                defaultValue={formData.status}
              >
                <SelectTrigger className='col-span-3'>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='available'>Available</SelectItem>
                  <SelectItem value='maintenance'>Maintenance</SelectItem>
                  <SelectItem value='offline'>Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='purchase_date' className='text-right'>
                Purchase Date
              </Label>
              <Input
                id='purchase_date'
                type='date'
                className='col-span-3'
                value={formData.purchase_date}
                onChange={(e) =>
                  setFormData({ ...formData, purchase_date: e.target.value })
                }
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='purchase_cost' className='text-right'>
                Cost
              </Label>
              <Input
                id='purchase_cost'
                type='number'
                className='col-span-3'
                value={formData.purchase_cost}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    purchase_cost: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='last_maintenance_date' className='text-right'>
                Last Maintenance Date
              </Label>
              <Input
                id='last_maintenance_date'
                type='date'
                className='col-span-3'
                value={formData.last_maintenance_date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    last_maintenance_date: e.target.value,
                  })
                }
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='next_maintenance_due' className='text-right'>
                Next Maintenance Due
              </Label>
              <Input
                id='next_maintenance_due'
                type='date'
                className='col-span-3'
                value={formData.next_maintenance_due}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    next_maintenance_due: e.target.value,
                  })
                }
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='maintenance_interval_days' className='text-right'>
                Maintenance Interval (days)
              </Label>
              <Input
                id='maintenance_interval_days'
                type='number'
                className='col-span-3'
                value={formData.maintenance_interval_days}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maintenance_interval_days: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit' disabled={isLoading}>
              {isLoading
                ? equipment
                  ? 'Updating...'
                  : 'Adding...'
                : equipment
                  ? 'Update Equipment'
                  : 'Add Equipment'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddEquipmentModal
