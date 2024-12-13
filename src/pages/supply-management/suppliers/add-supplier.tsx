import { useState } from 'react'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface AddSupplierModalProps {
    open: boolean
    setOpen: (open: boolean) => void
}

export function AddSupplierModal({ open, setOpen }: AddSupplierModalProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        status: 'active',
        website: '',
        established: '',
        contact: {
            person: '',
            role: '',
            email: '',
            phone: '',
            alternatePhone: '',
        },
        address: {
            street: '',
            city: '',
            state: '',
            zip: '',
            country: '',
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Add API call here
            console.log('Form submitted:', formData)
            await new Promise(resolve => setTimeout(resolve, 1000))
            setOpen(false)
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-h-[95vh] overflow-y-auto sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Add New Supplier</DialogTitle>
                    <DialogDescription>
                        Add a new supplier to your supplier directory
                    </DialogDescription>
                </DialogHeader>

                <form id="add-supplier-form" onSubmit={handleSubmit}>
                    <Tabs defaultValue="basic" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="basic">Basic Info</TabsTrigger>
                            <TabsTrigger value="contact">Contact</TabsTrigger>
                            <TabsTrigger value="address">Address</TabsTrigger>
                        </TabsList>

                        <TabsContent value="basic" className="space-y-4">
                            <div className="space-y-4">
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Company Name</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="category">Category</Label>
                                            <Select
                                                value={formData.category}
                                                onValueChange={(value) => setFormData({ ...formData, category: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="safety">Safety Equipment</SelectItem>
                                                    <SelectItem value="construction">Construction Materials</SelectItem>
                                                    <SelectItem value="tools">Tools & Equipment</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="status">Status</Label>
                                            <Select
                                                value={formData.status}
                                                onValueChange={(value) => setFormData({ ...formData, status: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="active">Active</SelectItem>
                                                    <SelectItem value="inactive">Inactive</SelectItem>
                                                    <SelectItem value="under_review">Under Review</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="website">Website</Label>
                                            <Input
                                                id="website"
                                                value={formData.website}
                                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="established">Established</Label>
                                            <Input
                                                id="established"
                                                value={formData.established}
                                                onChange={(e) => setFormData({ ...formData, established: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="contact" className="space-y-4">
                            <div className="space-y-4">
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="contact.person">Contact Person</Label>
                                            <Input
                                                id="contact.person"
                                                value={formData.contact.person}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    contact: { ...formData.contact, person: e.target.value }
                                                })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="contact.role">Role</Label>
                                            <Input
                                                id="contact.role"
                                                value={formData.contact.role}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    contact: { ...formData.contact, role: e.target.value }
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="contact.email">Email</Label>
                                        <Input
                                            id="contact.email"
                                            type="email"
                                            value={formData.contact.email}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                contact: { ...formData.contact, email: e.target.value }
                                            })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="contact.phone">Phone</Label>
                                            <Input
                                                id="contact.phone"
                                                value={formData.contact.phone}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    contact: { ...formData.contact, phone: e.target.value }
                                                })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="contact.alternatePhone">Alternate Phone</Label>
                                            <Input
                                                id="contact.alternatePhone"
                                                value={formData.contact.alternatePhone}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    contact: { ...formData.contact, alternatePhone: e.target.value }
                                                })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="address" className="space-y-4">
                            <div className="space-y-4">
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="address.street">Street Address</Label>
                                        <Input
                                            id="address.street"
                                            value={formData.address.street}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                address: { ...formData.address, street: e.target.value }
                                            })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="address.city">City</Label>
                                            <Input
                                                id="address.city"
                                                value={formData.address.city}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    address: { ...formData.address, city: e.target.value }
                                                })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="address.state">State</Label>
                                            <Input
                                                id="address.state"
                                                value={formData.address.state}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    address: { ...formData.address, state: e.target.value }
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="address.zip">ZIP Code</Label>
                                            <Input
                                                id="address.zip"
                                                value={formData.address.zip}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    address: { ...formData.address, zip: e.target.value }
                                                })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="address.country">Country</Label>
                                            <Input
                                                id="address.country"
                                                value={formData.address.country}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    address: { ...formData.address, country: e.target.value }
                                                })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </form>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" form="add-supplier-form" disabled={isLoading}>
                        {isLoading ? "Adding..." : "Add Supplier"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}