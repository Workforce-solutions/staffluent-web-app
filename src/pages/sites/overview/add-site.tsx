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
import { Building2, MapPin, Users, Calendar } from 'lucide-react'
import { useAddSiteMutation } from '@/services/siteManagmentApi'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetProjectsListQuery } from '@/services/projectApi'
import { ProjectsResponse } from '@/@types/project'
import { useGetEmployeesQuery, useGetTeamsQuery } from '@/services/staffApi'
import MultiselectDropdown from '@/components/wrappers/multiselect-dropdown'
import { FieldValueProps } from '@/@types/common'

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
        manager: '',
        startDate: '',
        endDate: '',
        teamId: []  as FieldValueProps[],
        estimatedWorkers: '',
        equipment: [] as Array<{
            name: string;
            status: 'operational' | 'maintenance' | 'offline';
        }>,
        safetyRequirements: '',
        budgetAllocation: '',
        description: ''
    })

    
    // const [newEquipment, setNewEquipment] = useState({
    //     name: '',
    //     status: 'operational' as const
    // })

    const { data } = useGetProjectsListQuery({ venue_short_code: short_code });
    
    const { data: employees } = useGetEmployeesQuery(short_code) 
    const { data: teams } = useGetTeamsQuery({ 
        venue_short_code: short_code,
        page: 1,
        size: 100
    })
    
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        try {

            const {location, estimatedWorkers, startDate, endDate, teamId, ...data } = formData
            const response = await addSite({shortCode: short_code, siteData: {
                ...data,
                latitude: location.lat,
                longitude: location.lng,
                no_of_workers: estimatedWorkers,
                start_date: startDate,
                end_date: endDate,
                team_id: teamId.map(team => team.value)
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
                            <Building2 className="w-6 h-6" />
                            <span>Add New Site</span>
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        Create a new work site. Fill in all required details.
                    </DialogDescription>
                </DialogHeader>

                <div className="overflow-y-auto flex-1 pr-2">
                    <form id="create-site-form" onSubmit={handleSubmit}>
                        <div className="grid gap-6 py-4">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Basic Information</h3>
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-4 gap-4 items-center">
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
                                    <div className="grid grid-cols-4 gap-4 items-center">
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

                                    <div className="grid grid-cols-4 gap-4 items-center">
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

                                    <div className="grid grid-cols-4 gap-4 items-center">
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
                                    <MapPin className="w-5 h-5" />
                                    <h3 className="text-lg font-medium">Location Details</h3>
                                </div>
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-4 gap-4 items-center">
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
                                    <div className="grid grid-cols-4 gap-4 items-center">
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
                                    <div className="grid grid-cols-4 gap-4 items-center">
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
                                    <Users className="w-5 h-5" />
                                    <h3 className="text-lg font-medium">Site Manager</h3>
                                </div>
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-4 gap-4 items-center">
                                        <Label htmlFor="managerId" className="text-left">Select Manager</Label>
                                        <Select 
                                            value={formData.manager}
                                            onValueChange={(value) => {
                                                setFormData({
                                                    ...formData,
                                                    manager: value
                                                });
                                            }}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a manager" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {employees?.map((employee) => (
                                                    <SelectItem key={employee.id} value={employee.id.toString()}>
                                                        {employee.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Timeline */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Calendar className="w-5 h-5" />
                                    <h3 className="text-lg font-medium">Project Timeline</h3>
                                </div>
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-4 gap-4 items-center">
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
                                    <div className="grid grid-cols-4 gap-4 items-center">
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
                                    <div className="grid grid-cols-4 gap-4 items-center">
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

                            {/* Team Selection */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Users className="w-5 h-5" />
                                    <h3 className="text-lg font-medium">Team Assignment</h3>
                                </div>
                                <div className="grid grid-cols-4 gap-4 items-center">
                                    <Label htmlFor="team" className="text-left">Assigned Teams</Label>
                                    <div className="col-span-3">
                                        <MultiselectDropdown
                                            itemValue={teams?.data.map((team) => ({
                                                value: {
                                                    value: team.id.toString(),
                                                    label: team.name
                                                }
                                            })) || []}
                                            value={formData.teamId}
                                            setValue={(values) => {
                                                setFormData({
                                                    ...formData,
                                                    teamId: values
                                                })
                                            }}
                                            multiSelectorPlaceholder="Select teams"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Equipment */}
                            {/* <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <HardDrive className="w-5 h-5" />
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
                            </div> */}
                        </div>
                    </form>
                </div>

                <DialogFooter className="flex flex-none justify-between mt-6 sm:justify-end sm:space-x-2">
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