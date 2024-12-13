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
import {Package, Plus, Trash2, Badge} from 'lucide-react'

interface OrderMaterialsModalProps {
    open: boolean
    setOpen: (open: boolean) => void
}

type MaterialItem = {
    name: string
    quantity: string
    unit: string
    urgency: 'normal' | 'urgent' | 'critical'
}

export function OrderMaterialsModal({ open, setOpen }: OrderMaterialsModalProps) {
    const [formData, setFormData] = useState({
        site: '',
        supplier: '',
        deliveryDate: '',
        purchaseOrder: '',
        notes: '',
        materials: [] as MaterialItem[]
    })

    const [newMaterial, setNewMaterial] = useState<MaterialItem>({
        name: '',
        quantity: '',
        unit: 'units',
        urgency: 'normal'
    })

    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const handleAddMaterial = () => {
        if (newMaterial.name && newMaterial.quantity) {
            setFormData({
                ...formData,
                materials: [...formData.materials, { ...newMaterial }]
            })
            setNewMaterial({
                name: '',
                quantity: '',
                unit: 'units',
                urgency: 'normal'
            })
        }
    }

    const handleRemoveMaterial = (index: number) => {
        const updatedMaterials = formData.materials.filter((_, i) => i !== index)
        setFormData({ ...formData, materials: updatedMaterials })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        if (formData.materials.length === 0) {
            toast({
                title: 'Error',
                description: 'Please add at least one material to the order',
                variant: 'destructive',
            })
            setIsLoading(false)
            return
        }

        try {
            // Add your API call here
            console.log('Submitting order:', formData)
            toast({
                title: 'Success',
                description: 'Material order created successfully',
            })
            setOpen(false)
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to create order',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="flex max-h-[95vh] flex-col sm:max-w-[425px] md:min-w-[600px]">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex items-center space-x-2">
                            <Package className="h-6 w-6" />
                            <span>Order Materials</span>
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        Create a new material order for your construction site.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto pr-2">
                    <form id="order-materials-form" onSubmit={handleSubmit}>
                        <div className="grid gap-6 py-4">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Order Information</h3>
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="site" className="text-left">
                                            Site
                                        </Label>
                                        <Select
                                            value={formData.site}
                                            onValueChange={(value) =>
                                                setFormData({ ...formData, site: value })
                                            }
                                        >
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select site" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="downtown">Downtown Project</SelectItem>
                                                <SelectItem value="midtown">Midtown Complex</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="supplier" className="text-left">
                                            Supplier
                                        </Label>
                                        <Select
                                            value={formData.supplier}
                                            onValueChange={(value) =>
                                                setFormData({ ...formData, supplier: value })
                                            }
                                        >
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select supplier" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="supplier-1">Steel Corp Inc.</SelectItem>
                                                <SelectItem value="supplier-2">BuildMix Ltd.</SelectItem>
                                                <SelectItem value="supplier-3">Construction Supplies Co.</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="deliveryDate" className="text-left">
                                            Delivery Date
                                        </Label>
                                        <Input
                                            id="deliveryDate"
                                            type="date"
                                            value={formData.deliveryDate}
                                            onChange={(e) =>
                                                setFormData({ ...formData, deliveryDate: e.target.value })
                                            }
                                            className="col-span-3"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="purchaseOrder" className="text-left">
                                            PO Number
                                        </Label>
                                        <Input
                                            id="purchaseOrder"
                                            value={formData.purchaseOrder}
                                            onChange={(e) =>
                                                setFormData({ ...formData, purchaseOrder: e.target.value })
                                            }
                                            className="col-span-3"
                                            placeholder="Enter PO number"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Materials List */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Materials</h3>

                                <div className="space-y-4">
                                    {formData.materials.map((material, index) => (
                                        <div key={index} className="flex items-center space-x-2 border rounded-md p-2">
                                            <span className="flex-1">{material.name}</span>
                                            <span className="text-sm text-muted-foreground">
                        {material.quantity} {material.unit}
                      </span>
                                            {/*// @ts-ignore*/}
                                            <Badge variant={
                                                material.urgency === 'critical' ? 'destructive' :
                                                    material.urgency === 'urgent' ? 'warning' :
                                                        'secondary'
                                            }>
                                                {material.urgency}
                                            </Badge>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemoveMaterial(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}

                                    <div className="grid grid-cols-7 gap-2">
                                        <Input
                                            placeholder="Material name"
                                            value={newMaterial.name}
                                            onChange={(e) =>
                                                setNewMaterial({ ...newMaterial, name: e.target.value })
                                            }
                                            className="col-span-2"
                                        />
                                        <Input
                                            type="number"
                                            placeholder="Quantity"
                                            value={newMaterial.quantity}
                                            onChange={(e) =>
                                                setNewMaterial({ ...newMaterial, quantity: e.target.value })
                                            }
                                        />
                                        <Select
                                            value={newMaterial.unit}
                                            onValueChange={(value) =>
                                                setNewMaterial({ ...newMaterial, unit: value })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Unit" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="units">Units</SelectItem>
                                                <SelectItem value="kg">KG</SelectItem>
                                                <SelectItem value="tons">Tons</SelectItem>
                                                <SelectItem value="meters">Meters</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Select
                                            value={newMaterial.urgency}
                                            onValueChange={(value: 'normal' | 'urgent' | 'critical') =>
                                                setNewMaterial({ ...newMaterial, urgency: value })
                                            }
                                            // @ts-ignore
                                            className="col-span-2"
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Urgency" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="normal">Normal</SelectItem>
                                                <SelectItem value="urgent">Urgent</SelectItem>
                                                <SelectItem value="critical">Critical</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button type="button" onClick={handleAddMaterial}>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Notes */}
                            <div className="grid gap-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="notes" className="text-left">
                                        Notes
                                    </Label>
                                    <Input
                                        id="notes"
                                        value={formData.notes}
                                        onChange={(e) =>
                                            setFormData({ ...formData, notes: e.target.value })
                                        }
                                        className="col-span-3"
                                        placeholder="Add any special instructions or notes"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <DialogFooter className="mt-6 flex flex-none justify-between sm:justify-end sm:space-x-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" form="order-materials-form" disabled={isLoading}>
                        {isLoading ? 'Creating Order...' : 'Place Order'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}