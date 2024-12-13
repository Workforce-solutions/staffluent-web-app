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
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Checkbox } from '@/components/ui/checkbox'


interface EnhancedWorkOrderModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    workOrder?: any
}

export function EnhancedWorkOrderModal({ open, setOpen, workOrder }: EnhancedWorkOrderModalProps) {
    const [activeTab, setActiveTab] = useState('basic')
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        // Basic Information
        title: '',
        category: '',
        priority: '',
        status: 'new',
        description: '',

        // Customer & Location
        customer: {
            name: '',
            id: '',
            contact: '',
            phone: '',
            email: '',
        },
        location: {
            building: '',
            floor: '',
            room: '',
            accessInstructions: '',
        },

        // Assignment & Scheduling
        assignment: {
            specialty: '',
            assignedTo: '',
            accessType: '',
            scheduledStart: '',
            duration: '',
            dueBy: '',
        },

        // Asset & Work Details
        asset: {
            id: '',
            name: '',
            type: '',
            warranty: false,
            lastService: '',
        },
        workPlan: {
            steps: [],
            estimatedTime: '',
            requiredSkills: [],
        },

        // Checklists & Tasks
        checklists: [],
        todos: [],

        // Financial Details
        financial: {
            estimatedCost: '',
            notToExceed: '',
            poNumber: '',
            warrantyWork: false,
            billable: true,
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            // API call would go here
            console.log('Submitting:', formData)
            setOpen(false)
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-h-[95vh] max-w-[800px] flex flex-col">
                <DialogHeader>
                    <DialogTitle>
                        {workOrder ? 'Edit Work Order' : 'Create Work Order'}
                    </DialogTitle>
                    <DialogDescription>
                        {workOrder ? 'Modify the work order details' : 'Create a new work order with detailed specifications'}
                    </DialogDescription>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
                    <TabsList className="grid grid-cols-6 gap-4">
                        <TabsTrigger value="basic">Basic Info</TabsTrigger>
                        <TabsTrigger value="customer">Customer</TabsTrigger>
                        <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
                        <TabsTrigger value="assets">Assets</TabsTrigger>
                        <TabsTrigger value="tasks">Tasks</TabsTrigger>
                        <TabsTrigger value="financial">Financial</TabsTrigger>
                    </TabsList>

                    <ScrollArea className="flex-1 px-1">
                        <form id="work-order-form" onSubmit={handleSubmit}>
                            <TabsContent value="basic" className="space-y-4 py-4">
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label>Category</Label>
                                            <Select
                                                value={formData.category}
                                                onValueChange={(value) =>
                                                    setFormData({ ...formData, category: value })
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="maintenance">Maintenance</SelectItem>
                                                    <SelectItem value="repair">Repair</SelectItem>
                                                    <SelectItem value="installation">Installation</SelectItem>
                                                    <SelectItem value="inspection">Inspection</SelectItem>
                                                    <SelectItem value="emergency">Emergency</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Priority</Label>
                                            <Select
                                                value={formData.priority}
                                                onValueChange={(value) =>
                                                    setFormData({ ...formData, priority: value })
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select priority" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="low">Low</SelectItem>
                                                    <SelectItem value="medium">Medium</SelectItem>
                                                    <SelectItem value="high">High</SelectItem>
                                                    <SelectItem value="emergency">Emergency</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Status</Label>
                                            <Select
                                                value={formData.status}
                                                onValueChange={(value) =>
                                                    setFormData({ ...formData, status: value })
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="new">New</SelectItem>
                                                    <SelectItem value="assigned">Assigned</SelectItem>
                                                    <SelectItem value="in_progress">In Progress</SelectItem>
                                                    <SelectItem value="on_hold">On Hold</SelectItem>
                                                    <SelectItem value="completed">Completed</SelectItem>
                                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Title</Label>
                                        <Input
                                            value={formData.title}
                                            onChange={(e) =>
                                                setFormData({ ...formData, title: e.target.value })
                                            }
                                            placeholder="Enter work order title"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Description</Label>
                                        <Textarea
                                            value={formData.description}
                                            onChange={(e) =>
                                                setFormData({ ...formData, description: e.target.value })
                                            }
                                            placeholder="Enter work order description"
                                            required
                                            rows={4}
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="customer" className="space-y-4 py-4">
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Customer Name</Label>
                                            <Input
                                                value={formData.customer.name}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        customer: { ...formData.customer, name: e.target.value }
                                                    })
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Customer ID</Label>
                                            <Input
                                                value={formData.customer.id}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        customer: { ...formData.customer, id: e.target.value }
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Contact Person</Label>
                                            <Input
                                                value={formData.customer.contact}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        customer: { ...formData.customer, contact: e.target.value }
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Phone</Label>
                                            <Input
                                                value={formData.customer.phone}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        customer: { ...formData.customer, phone: e.target.value }
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <Input
                                            type="email"
                                            value={formData.customer.email}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    customer: { ...formData.customer, email: e.target.value }
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Location</Label>
                                        <Input
                                            value={formData.location.building}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    location: { ...formData.location, building: e.target.value }
                                                })
                                            }
                                            placeholder="Enter location/building"
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="scheduling" className="space-y-4 py-4">
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Scheduled Start</Label>
                                            <Input
                                                type="datetime-local"
                                                value={formData.assignment.scheduledStart}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        assignment: { ...formData.assignment, scheduledStart: e.target.value }
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Due By</Label>
                                            <Input
                                                type="datetime-local"
                                                value={formData.assignment.dueBy}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        assignment: { ...formData.assignment, dueBy: e.target.value }
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Assigned To</Label>
                                        <Select
                                            value={formData.assignment.assignedTo}
                                            onValueChange={(value) =>
                                                setFormData({
                                                    ...formData,
                                                    assignment: { ...formData.assignment, assignedTo: value }
                                                })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select assignee" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="team_a">Team A</SelectItem>
                                                <SelectItem value="team_b">Team B</SelectItem>
                                                <SelectItem value="team_c">Team C</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Duration (hours)</Label>
                                        <Input
                                            type="number"
                                            value={formData.assignment.duration}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    assignment: { ...formData.assignment, duration: e.target.value }
                                                })
                                            }
                                            min="0"
                                            step="0.5"
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="assets" className="space-y-4 py-4">
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Asset ID</Label>
                                            <Input
                                                value={formData.asset.id}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        asset: { ...formData.asset, id: e.target.value }
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Asset Name</Label>
                                            <Input
                                                value={formData.asset.name}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        asset: { ...formData.asset, name: e.target.value }
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="warranty"
                                            checked={formData.asset.warranty}
                                            onCheckedChange={(checked) =>
                                                setFormData({
                                                    ...formData,
                                                    asset: { ...formData.asset, warranty: checked as boolean }
                                                })
                                            }
                                        />
                                        <Label htmlFor="warranty">Under Warranty</Label>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="tasks" className="space-y-4 py-4">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Task Description</Label>
                                        <Textarea
                                            value={formData.workPlan.steps.join('\n')}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    workPlan: {
                                                        ...formData.workPlan,
                                                        // @ts-ignore
                                                        steps: e.target.value.split('\n').filter(Boolean)
                                                    }
                                                })
                                            }
                                            placeholder="Enter tasks (one per line)"
                                            rows={4}
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="financial" className="space-y-4 py-4">
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Estimated Cost ($)</Label>
                                            <Input
                                                type="number"
                                                value={formData.financial.estimatedCost}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        financial: { ...formData.financial, estimatedCost: e.target.value }
                                                    })
                                                }
                                                min="0"
                                                step="0.01"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>PO Number</Label>
                                            <Input
                                                value={formData.financial.poNumber}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        financial: { ...formData.financial, poNumber: e.target.value }
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="billable"
                                                checked={formData.financial.billable}
                                                onCheckedChange={(checked) =>
                                                    setFormData({
                                                        ...formData,
                                                        financial: { ...formData.financial, billable: checked as boolean }
                                                    })
                                                }
                                            />
                                            <Label htmlFor="billable">Billable</Label>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </form>
                    </ScrollArea>

                    <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button type="submit" form="work-order-form" disabled={isLoading}>
                            {isLoading ? "Saving..." : workOrder ? "Update Work Order" : "Create Work Order"}
                        </Button>
                    </DialogFooter>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}