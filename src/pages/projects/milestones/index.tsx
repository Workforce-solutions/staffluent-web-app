import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import {
    Calendar,
    Plus,
    AlertTriangle,
    CheckCircle2,
    Cloud,
    Package
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {AddMilestoneModal} from "./add-milestone";
import {useState} from "react";

const sampleMilestones = [
    {
        id: 1,
        name: "Foundation Work",
        status: "completed",
        progress: 100,
        startDate: "2024-01-15",
        endDate: "2024-02-15",
        materials: [
            { name: "Concrete", status: "delivered", quantity: "50 yards" },
            { name: "Rebar", status: "delivered", quantity: "2000 units" }
        ],
        weatherDelays: 2,
        notes: "Completed ahead of schedule"
    },
    {
        id: 2,
        name: "Structural Framework",
        status: "in_progress",
        progress: 65,
        startDate: "2024-02-16",
        endDate: "2024-03-30",
        materials: [
            { name: "Steel Beams", status: "partial", quantity: "75/100 units" },
            { name: "Bolts", status: "delivered", quantity: "5000 units" }
        ],
        weatherDelays: 1,
        notes: "Slight delay due to material delivery"
    },
    {
        id: 3,
        name: "Electrical Installation",
        status: "scheduled",
        progress: 0,
        startDate: "2024-04-01",
        endDate: "2024-05-15",
        materials: [
            { name: "Wiring", status: "ordered", quantity: "1000m" },
            { name: "Circuit Breakers", status: "pending", quantity: "20 units" }
        ],
        weatherDelays: 0,
        notes: "Awaiting structural completion"
    }
]

const ConstructionMilestones = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    return (
        <Layout>
            <Layout.Header className="border-b">
                <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body className="space-y-8 pb-8">
                {/* Header Section */}
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Construction Milestones</h2>
                        <p className="text-muted-foreground">
                            Track and manage construction progress and materials
                        </p>
                    </div>
                    <Button onClick={() => setIsAddModalOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Milestone
                    </Button>
                </div>

                {/* Overview Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <span className="text-2xl font-bold">67%</span>
                                <span className="text-sm text-muted-foreground">Overall Progress</span>
                                <Progress value={67} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <span className="text-2xl font-bold">3</span>
                                <span className="text-sm text-muted-foreground">Weather Delays</span>
                                <div className="flex items-center text-muted-foreground">
                                    <Cloud className="h-4 w-4 mr-2" />
                                    <span className="text-sm">Total Days</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <span className="text-2xl font-bold">85%</span>
                                <span className="text-sm text-muted-foreground">Material Delivery</span>
                                <div className="flex items-center text-muted-foreground">
                                    <Package className="h-4 w-4 mr-2" />
                                    <span className="text-sm">On Schedule</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <span className="text-2xl font-bold">2/5</span>
                                <span className="text-sm text-muted-foreground">Completed Milestones</span>
                                <div className="flex items-center text-muted-foreground">
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                    <span className="text-sm">Of Total</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Milestones List */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Project Milestones</CardTitle>
                            <div className="flex items-center space-x-2">
                                <Select defaultValue="all">
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="Filter Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Statuses</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="in_progress">In Progress</SelectItem>
                                        <SelectItem value="scheduled">Scheduled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {sampleMilestones.map((milestone) => (
                                <div key={milestone.id} className="border rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-medium text-lg">{milestone.name}</h3>
                                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                <Calendar className="h-4 w-4" />
                                                <span>{milestone.startDate} - {milestone.endDate}</span>
                                            </div>
                                        </div>
                                        <Badge
                                            variant={
                                                milestone.status === 'completed' ? 'success' :
                                                    milestone.status === 'in_progress' ? 'warning' :
                                                        'secondary'
                                            }
                                        >
                                            {milestone.status.replace('_', ' ')}
                                        </Badge>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm font-medium">Progress</span>
                                                <span className="text-sm text-muted-foreground">
                                                    {milestone.progress}%
                                                </span>
                                            </div>
                                            <Progress value={milestone.progress} className="h-2" />
                                        </div>

                                        <div className="border-t pt-4">
                                            <h4 className="text-sm font-medium mb-2">Materials</h4>
                                            <div className="space-y-2">
                                                {milestone.materials.map((material, idx) => (
                                                    <div key={idx} className="flex justify-between items-center">
                                                        <span className="text-sm">{material.name}</span>
                                                        <Badge variant="outline">
                                                            {material.quantity}
                                                        </Badge>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {milestone.weatherDelays > 0 && (
                                            <div className="flex items-center text-sm text-yellow-600 dark:text-yellow-500">
                                                <AlertTriangle className="h-4 w-4 mr-2" />
                                                {milestone.weatherDelays} days of weather delays
                                            </div>
                                        )}

                                        <div className="flex justify-end space-x-2">
                                            <Button variant="outline" size="sm">
                                                Update Progress
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </Layout.Body>
            {isAddModalOpen && (
                <AddMilestoneModal
                    open={isAddModalOpen}
                    setOpen={setIsAddModalOpen}
                />
            )}

        </Layout>
    )
}

export default ConstructionMilestones