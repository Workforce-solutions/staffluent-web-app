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
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Package, Building2 } from 'lucide-react'
import { useState, useEffect } from 'react'

interface InventoryItemModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  mode: 'add' | 'edit'
  itemData?: any // Replace with proper type when available
}

export function InventoryItemModal({
  open,
  setOpen,
  mode,
  itemData,
}: InventoryItemModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    minStock: '',
    location: '',
    warehouse: '',
    section: '',
    description: '',
    specifications: {
      height: '',
      length: '',
      weight: '',
      material: '',
    },
    supplier: '',
    cost: '',
    notes: '',
  })

  useEffect(() => {
    if (mode === 'edit' && itemData) {
      setFormData({
        ...formData,
        ...itemData,
      })
    }
  }, [itemData, mode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Add API call here in the future
      console.log('Form submitted:', formData)
      setTimeout(() => {
        setOpen(false)
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error:', error)
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-h-[95vh] overflow-y-auto sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>
            <div className='flex items-center gap-2'>
              <Package className='h-6 w-6' />
              <span>{mode === 'add' ? 'Add New Item' : 'Edit Item'}</span>
            </div>
          </DialogTitle>
          <DialogDescription>
            {mode === 'add'
              ? 'Add a new item to inventory'
              : 'Edit existing inventory item'}
          </DialogDescription>
        </DialogHeader>

        <form
          id='inventory-form'
          onSubmit={handleSubmit}
          className='max-h-[75vh] space-y-6 overflow-y-auto'
        >
          {/* Basic Information */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Basic Information</h3>
            <div className='grid gap-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Item Name
                </Label>
                <Input
                  id='name'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className='col-span-3'
                  required
                />
              </div>

              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='category' className='text-right'>
                  Category
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger className='col-span-3'>
                    <SelectValue placeholder='Select category' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='barriers'>Barriers</SelectItem>
                    <SelectItem value='signage'>Signage</SelectItem>
                    <SelectItem value='equipment'>Equipment</SelectItem>
                    <SelectItem value='tools'>Tools</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='description' className='text-right'>
                  Description
                </Label>
                <Textarea
                  id='description'
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className='col-span-3'
                  rows={3}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Quantity and Stock */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Quantity and Stock</h3>
            <div className='grid gap-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='quantity' className='text-right'>
                  Quantity
                </Label>
                <Input
                  id='quantity'
                  type='number'
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  className='col-span-3'
                  min='0'
                  required
                />
              </div>

              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='minStock' className='text-right'>
                  Minimum Stock
                </Label>
                <Input
                  id='minStock'
                  type='number'
                  value={formData.minStock}
                  onChange={(e) =>
                    setFormData({ ...formData, minStock: e.target.value })
                  }
                  className='col-span-3'
                  min='0'
                  required
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Location */}
          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <Building2 className='h-5 w-5' />
              <h3 className='text-lg font-medium'>Storage Location</h3>
            </div>
            <div className='grid gap-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='warehouse' className='text-right'>
                  Warehouse
                </Label>
                <Select
                  value={formData.warehouse}
                  onValueChange={(value) =>
                    setFormData({ ...formData, warehouse: value })
                  }
                >
                  <SelectTrigger className='col-span-3'>
                    <SelectValue placeholder='Select warehouse' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='warehouse-a'>Warehouse A</SelectItem>
                    <SelectItem value='warehouse-b'>Warehouse B</SelectItem>
                    <SelectItem value='warehouse-c'>Warehouse C</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='section' className='text-right'>
                  Section/Shelf
                </Label>
                <Input
                  id='section'
                  value={formData.section}
                  onChange={(e) =>
                    setFormData({ ...formData, section: e.target.value })
                  }
                  className='col-span-3'
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Specifications */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Specifications</h3>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='height'>Height</Label>
                <Input
                  id='height'
                  value={formData.specifications.height}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specifications: {
                        ...formData.specifications,
                        height: e.target.value,
                      },
                    })
                  }
                  placeholder='e.g., 1.2m'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='length'>Length</Label>
                <Input
                  id='length'
                  value={formData.specifications.length}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specifications: {
                        ...formData.specifications,
                        length: e.target.value,
                      },
                    })
                  }
                  placeholder='e.g., 2.4m'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='weight'>Weight</Label>
                <Input
                  id='weight'
                  value={formData.specifications.weight}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specifications: {
                        ...formData.specifications,
                        weight: e.target.value,
                      },
                    })
                  }
                  placeholder='e.g., 45kg'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='material'>Material</Label>
                <Input
                  id='material'
                  value={formData.specifications.material}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specifications: {
                        ...formData.specifications,
                        material: e.target.value,
                      },
                    })
                  }
                  placeholder='e.g., Steel'
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Purchase Information */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Purchase Information</h3>
            <div className='grid gap-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='supplier' className='text-right'>
                  Supplier
                </Label>
                <Input
                  id='supplier'
                  value={formData.supplier}
                  onChange={(e) =>
                    setFormData({ ...formData, supplier: e.target.value })
                  }
                  className='col-span-3'
                />
              </div>

              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='cost' className='text-right'>
                  Cost per Unit
                </Label>
                <Input
                  id='cost'
                  type='number'
                  value={formData.cost}
                  onChange={(e) =>
                    setFormData({ ...formData, cost: e.target.value })
                  }
                  className='col-span-3'
                  min='0'
                  step='0.01'
                />
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className='space-y-4'>
            <Label htmlFor='notes'>Additional Notes</Label>
            <Textarea
              id='notes'
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={3}
              placeholder='Add any additional notes or special requirements...'
            />
          </div>
        </form>

        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type='submit' form='inventory-form' disabled={isLoading}>
            {isLoading
              ? `${mode === 'add' ? 'Adding...' : 'Saving...'}`
              : mode === 'add'
                ? 'Add Item'
                : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
