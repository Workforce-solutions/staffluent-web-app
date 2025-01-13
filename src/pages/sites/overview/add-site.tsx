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
import { Building2, MapPin, Users, HardDrive, Calendar } from 'lucide-react'
import { useAddSiteMutation } from '@/services/siteManagmentApi'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetProjectsListQuery } from '@/services/projectApi'
import { ProjectsResponse } from '@/@types/project'

interface AddSiteModalProps {
    open: boolean
    setOpen: (open: boolean) => void
}

export function AddSiteModal({ open, setOpen }: AddSiteModalProps) {

    const short_code = useShortCode();
    const [addSite] = useAddSiteMutation()
    const [formData, setFormData] = useState({
        name: '',
        app_project_id: '',
        type: 'construction',
        status: 'active',
        address: '',
        location: {
            lat: '',
            lng: ''
        },
        manager: {
            name: '',
            email: '',
            phone: '',
            role: ''
        },
        startDate: '',
        endDate: '',
        estimatedWorkers: '',
        equipment: [] as Array<{
            name: string;
            status: 'operational' | 'maintenance' | 'offline';
        }>,
        safetyRequirements: '',
        budgetAllocation: '',
        description: ''
    })

    
    const [newEquipment, setNewEquipment] = useState({
        name: '',
        status: 'operational' as const
    })

    const { data } = useGetProjectsListQuery({ venue_short_code: short_code });
    
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const handleAddEquipment = () => {
        if (newEquipment.name) {
            setFormData({
                ...formData,
                equipment: [...formData.equipment, { ...newEquipment }]
            })
            setNewEquipment({ name: '', status: 'operational' })
        }
    }

    const handleRemoveEquipment = (index: number) => {
        const newEquipment = formData.equipment.filter((_, i) => i !== index)
        setFormData({ ...formData, equipment: newEquipment })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        try {

            const {location,manager, estimatedWorkers, startDate, endDate, ...data } = formData
            const response = await addSite({shortCode: short_code, siteData: {
                ...data,
                latitude: location.lat,
                longitude: location.lng,
                no_of_workers: estimatedWorkers,
                site_manager: manager.name,
                site_manager_email: manager.email,
                site_manager_phone: manager.phone,
                start_date: startDate,
                end_date: endDate
            }})
            if(response.data){
                toast({
                    title: 'Success',
                    description: 'Site created successfully',
                })
                setOpen(false)
            } else {
                toast({
                    title: 'Error',
                    description: 'Failed to create site',
                    variant: 'destructive',
                })
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to create site',
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
                            <Building2 className="h-6 w-6" />
                            <span>Add New Site</span>
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        Create a new work site. Fill in all required details.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto pr-2">
                    <form id="create-site-form" onSubmit={handleSubmit}>
                        <div className="grid gap-6 py-4">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Basic Information</h3>
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="project" className="text-left">Project</Label>
                                        <Select
                                            value={formData.app_project_id}
                                            onValueChange={(value) => setFormData({ ...formData, app_project_id: value })}
                                        >
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select project" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {data?.projects.map((project : ProjectsResponse) => (
                                                    <SelectItem value={project.id.toString()}>{project.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-left">Name</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="col-span-3"
                                            placeholder="Enter site name"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="type" className="text-left">Type</Label>
                                        <Select
                                            value={formData.type}
                                            onValueChange={(value) => setFormData({ ...formData, type: value })}
                                        >
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select site type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="construction">Construction</SelectItem>
                                                <SelectItem value="maintenance">Maintenance</SelectItem>
                                                <SelectItem value="renovation">Renovation</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="status" className="text-left">Status</Label>
                                        <Select
                                            value={formData.status}
                                            onValueChange={(value) => setFormData({ ...formData, status: value })}
                                        >
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="maintenance">Maintenance</SelectItem>
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Location Details */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <MapPin className="h-5 w-5" />
                                    <h3 className="text-lg font-medium">Location Details</h3>
                                </div>
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="address" className="text-left">Address</Label>
                                        <Input
                                            id="address"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            className="col-span-3"
                                            placeholder="Enter site address"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="latitude" className="text-left">Latitude</Label>
                                        <Input
                                            id="latitude"
                                            value={formData.location.lat}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                location: { ...formData.location, lat: e.target.value }
                                            })}
                                            className="col-span-3"
                                            placeholder="Enter latitude"
                                            type="number"
                                            step="any"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="longitude" className="text-left">Longitude</Label>
                                        <Input
                                            id="longitude"
                                            value={formData.location.lng}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                location: { ...formData.location, lng: e.target.value }
                                            })}
                                            className="col-span-3"
                                            placeholder="Enter longitude"
                                            type="number"
                                            step="any"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Manager Details */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Users className="h-5 w-5" />
                                    <h3 className="text-lg font-medium">Site Manager</h3>
                                </div>
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="managerName" className="text-left">Name</Label>
                                        <Input
                                            id="managerName"
                                            value={formData.manager.name}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                manager: { ...formData.manager, name: e.target.value }
                                            })}
                                            className="col-span-3"
                                            placeholder="Enter manager name"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="managerEmail" className="text-left">Email</Label>
                                        <Input
                                            id="managerEmail"
                                            type="email"
                                            value={formData.manager.email}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                manager: { ...formData.manager, email: e.target.value }
                                            })}
                                            className="col-span-3"
                                            placeholder="Enter manager email"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="managerPhone" className="text-left">Phone</Label>
                                        <Input
                                            id="managerPhone"
                                            value={formData.manager.phone}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                manager: { ...formData.manager, phone: e.target.value }
                                            })}
                                            className="col-span-3"
                                            placeholder="Enter manager phone"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Timeline */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Calendar className="h-5 w-5" />
                                    <h3 className="text-lg font-medium">Project Timeline</h3>
                                </div>
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="startDate" className="text-left">Start Date</Label>
                                        <Input
                                            id="startDate"
                                            type="date"
                                            value={formData.startDate}
                                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                            className="col-span-3"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="endDate" className="text-left">End Date</Label>
                                        <Input
                                            id="endDate"
                                            type="date"
                                            value={formData.endDate}
                                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                            className="col-span-3"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="workers" className="text-left">Est. Workers</Label>
                                        <Input
                                            id="workers"
                                            type="number"
                                            value={formData.estimatedWorkers}
                                            onChange={(e) => setFormData({ ...formData, estimatedWorkers: e.target.value })}
                                            className="col-span-3"
                                            placeholder="Number of workers"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Equipment */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <HardDrive className="h-5 w-5" />
                                    <h3 className="text-lg font-medium">Equipment</h3>
                                </div>
                                <div className="space-y-4">
                                    {formData.equipment.map((equip, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <span className="flex-1">{equip.name}</span>
                                            <span className="flex-1">{equip.status}</span>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleRemoveEquipment(index)}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    ))}

                                    <div className="flex space-x-2">
                                        <Input
                                            placeholder="Equipment name"
                                            value={newEquipment.name}
                                            onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
                                        />
                                        <Select
                                            value={newEquipment.status}
                                            onValueChange={(value: 'operational' | 'maintenance' | 'offline') =>
                                                //@ts-ignore
                                                setNewEquipment({ ...newEquipment, status: value })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="operational">Operational</SelectItem>
                                                <SelectItem value="maintenance">Maintenance</SelectItem>
                                                <SelectItem value="offline">Offline</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button type="button" onClick={handleAddEquipment}>
                                            Add
                                        </Button>
                                    </div>
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
                    <Button
                        type="submit"
                        form="create-site-form"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating...' : 'Create Site'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}