import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Input } from '@/components/ui/input'
import {
    Search,
    Plus,
    Clock,
    Users,
    Calendar,
    AlertTriangle,
    CircleDollarSign,
    PenTool,
    FileText,
    Shield,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EnhancedWorkOrderModal } from './add-work-order'
import {useNavigate} from "react-router-dom";

// Updated sample data to include new fields
const sampleWorkOrders = [
    {
        id: "WO-2024-001",
        title: "HVAC System Repair",
        type: "maintenance",
        priority: "high",
        status: "in_progress",
        customer: {
            name: "Tech Solutions Inc",
            contact: "John Smith",
            phone: "(555) 123-4567",
            email: "john@techsolutions.com"
        },
        location: {
            building: "Building A",
            floor: "Floor 3",
            room: "Server Room",
            accessInstructions: "Security clearance required"
        },
        asset: {
            id: "HVAC-001",
            name: "Server Room HVAC Unit",
            type: "HVAC System",
            warranty: true,
            lastService: "2024-01-15"
        },
        assignment: {
            assignedTo: "Team Alpha",
            specialty: "HVAC",
            scheduledStart: "2024-03-15T09:00",
            duration: "4",
            dueBy: "2024-03-15T17:00"
        },
        description: "Fix malfunctioning HVAC unit in server room",
        workPlan: {
            steps: [
                "Initial diagnostic",
                "Filter replacement",
                "System testing"
            ],
            requiredSkills: ["HVAC Certification", "Electrical"]
        },
        materials: [
            { name: "HVAC Filter", quantity: 2 },
            { name: "Coolant", quantity: 1 }
        ],
        financial: {
            estimatedCost: 850,
            notToExceed: 1000,
            warrantyWork: true,
            billable: true
        },
        checklists: [
            {
                id: "CL-001",
                title: "Pre-maintenance Checklist",
                items: [
                    { id: "1", text: "Power off system", completed: false },
                    { id: "2", text: "Safety check", completed: false }
                ]
            }
        ]
    },
    // ... [other sample work orders with the same structure]
]

export function WorkOrders() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [activeView, setActiveView] = useState("all")
    const navigate = useNavigate()

    return (
        <Layout>
            <Layout.Header className="border-b">
                <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body className="space-y-8 pb-8">
                {/* Header */}
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Work Orders</h2>
                        <p className="text-muted-foreground">
                            Manage and track maintenance and repair tasks
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search work orders..."
                                className="w-full pl-8 sm:w-64"
                                type="search"
                            />
                        </div>
                        <Button onClick={() => {
                            setSelectedOrder(null)
                            setIsModalOpen(true)
                        }}>
                            <Plus className="h-4 w-4 mr-2" />
                            Create Work Order
                        </Button>
                    </div>
                </div>

                {/* Enhanced Stats Overview */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <PenTool className="h-5 w-5 text-blue-500" />
                                <span className="text-2xl font-bold">12</span>
                                <span className="text-sm text-muted-foreground">Active Work Orders</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                                <span className="text-2xl font-bold">3</span>
                                <span className="text-sm text-muted-foreground">High Priority</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <FileText className="h-5 w-5 text-yellow-500" />
                                <span className="text-2xl font-bold">8</span>
                                <span className="text-sm text-muted-foreground">Pending Review</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Shield className="h-5 w-5 text-green-500" />
                                <span className="text-2xl font-bold">5</span>
                                <span className="text-sm text-muted-foreground">Warranty Work</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* View Controls */}
                <div className="flex justify-between items-center">
                    <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
                        <TabsList>
                            <TabsTrigger value="all">All Orders</TabsTrigger>
                            <TabsTrigger value="pending">Pending</TabsTrigger>
                            <TabsTrigger value="in_progress">In Progress</TabsTrigger>
                            <TabsTrigger value="completed">Completed</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <Select defaultValue="priority">
                        <SelectTrigger className="w-[180px] ml-4">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="priority">Priority</SelectItem>
                            <SelectItem value="date">Due Date</SelectItem>
                            <SelectItem value="status">Status</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Enhanced Work Orders List */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-6">
                            {sampleWorkOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="border rounded-lg p-6 cursor-pointer hover:border-primary/50 transition-colors"
                                    onClick={() => navigate(`/work-orders/${order.id}`)}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-medium text-lg">{order.title}</h3>
                                                <Badge variant="outline">{order.id}</Badge>
                                                {order.asset.warranty && (
                                                    <Badge variant="secondary">
                                                        <Shield className="h-3 w-3 mr-1" />
                                                        Warranty
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {order.customer.name} • {order.location.building}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Badge
                                                variant={
                                                    order.priority === 'high' ? 'destructive' :
                                                        order.priority === 'medium' ? 'warning' :
                                                            'secondary'
                                                }
                                            >
                                                {order.priority}
                                            </Badge>
                                            <Badge
                                                variant={
                                                    order.status === 'completed' ? 'success' :
                                                        order.status === 'in_progress' ? 'warning' :
                                                            'secondary'
                                                }
                                            >
                                                {order.status.replace('_', ' ')}
                                            </Badge>
                                        </div>
                                    </div>

                                    <p className="text-sm mb-4">{order.description}</p>

                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                            <span>{order.assignment.assignedTo}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span>Due: {new Date(order.assignment.dueBy).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <span>{order.assignment.duration} hours</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
                                            <span>${order.financial.estimatedCost}</span>
                                        </div>
                                    </div>

                                    {(order.materials.length > 0 || order.workPlan.steps.length > 0) && (
                                        <div className="mt-4 pt-4 border-t space-y-4">
                                            {order.materials.length > 0 && (
                                                <div>
                                                    <h4 className="text-sm font-medium mb-2">Required Materials</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {order.materials.map((material, idx) => (
                                                            <Badge key={idx} variant="outline">
                                                                {material.quantity}x {material.name}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {order.workPlan.steps.length > 0 && (
                                                <div>
                                                    <h4 className="text-sm font-medium mb-2">Work Steps</h4>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                        {order.workPlan.steps.map((step, idx) => (
                                                            <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <span className="font-medium">{idx + 1}.</span>
                                                                <span>{step}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </Layout.Body>

            <EnhancedWorkOrderModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                workOrder={selectedOrder}
            />
        </Layout>
    )
}

export default WorkOrders