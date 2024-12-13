import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
    Calendar,
    Clock,
    Users,
    PenTool,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    MapPin,
    FileText,
    History,
    Edit,
    Download
} from 'lucide-react'
import {EditAllocationModal} from "./edit-allocation";
import {ExtendAllocationModal} from "./extend-allocation";
import {EndAllocationModal} from "./end-allocation";
import {useState} from "react";

// Demo data for allocation details
const allocationDetails = {
    id: "EQ-2024-001",
    equipment: {
        name: "Safety Barrier System A",
        type: "Barrier",
        condition: "good",
        serialNumber: "SB-2024-001",
        maintenanceStatus: "up_to_date"
    },
    site: {
        name: "Downtown Project",
        location: "123 Main Street",
        city: "New York",
        state: "NY",
        manager: "Robert Wilson",
        contact: "+1 (555) 234-5678"
    },
    team: {
        name: "Team Alpha",
        leader: "John Smith",
        members: 8,
        contact: "+1 (555) 123-4567"
    },
    duration: {
        startDate: "2024-03-01",
        endDate: "2024-03-15",
        status: "in_use",
        progress: 60
    },
    inspections: [
        {
            id: "INS-001",
            date: "2024-03-05",
            type: "Routine Check",
            inspector: "Mike Johnson",
            status: "passed",
            notes: "Equipment in good condition"
        },
        {
            id: "INS-002",
            date: "2024-03-10",
            type: "Safety Audit",
            inspector: "Sarah Davis",
            status: "passed",
            notes: "All safety requirements met"
        }
    ],
    issues: [
        {
            id: "ISS-001",
            date: "2024-03-07",
            type: "Minor",
            description: "Slight wear on protective coating",
            status: "resolved",
            resolution: "Applied protective coating"
        }
    ],
    usage: {
        hoursUsed: 180,
        daysActive: 10,
        efficiency: 92,
        downtime: 2
    }
}

export default function AllocationDetails() {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isExtendModalOpen, setIsExtendModalOpen] = useState(false)
    const [isEndModalOpen, setIsEndModalOpen] = useState(false)

    const [selectedAllocation] = useState(allocationDetails)


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
                        <div className="flex items-center space-x-2">
                            <h2 className="text-2xl font-bold tracking-tight">{allocationDetails.equipment.name}</h2>
                            <Badge variant="outline">{allocationDetails.id}</Badge>
                            <Badge variant={
                                allocationDetails.duration.status === 'in_use' ? 'success' :
                                    allocationDetails.duration.status === 'scheduled' ? 'warning' :
                                        'secondary'
                            }>
                                {allocationDetails.duration.status.replace('_', ' ')}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground mt-1">
                            {allocationDetails.site.name} • {allocationDetails.team.name}
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline" onClick={() => setIsEditModalOpen(true)}>
                            <Edit className="h-4 w-4 mr-2"/>
                            Edit
                        </Button>
                        <Button onClick={() => setIsExtendModalOpen(true)}>
                            <History className="h-4 w-4 mr-2"/>
                            Extend
                        </Button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Clock className="h-5 w-5 text-blue-500" />
                                <span className="text-2xl font-bold">{allocationDetails.usage.hoursUsed}h</span>
                                <span className="text-sm text-muted-foreground">Hours Used</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Calendar className="h-5 w-5 text-green-500" />
                                <span className="text-2xl font-bold">{allocationDetails.usage.daysActive}</span>
                                <span className="text-sm text-muted-foreground">Days Active</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <CheckCircle2 className="h-5 w-5 text-yellow-500" />
                                <span className="text-2xl font-bold">{allocationDetails.usage.efficiency}%</span>
                                <span className="text-sm text-muted-foreground">Efficiency Rate</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                                <span className="text-2xl font-bold">{allocationDetails.usage.downtime}h</span>
                                <span className="text-sm text-muted-foreground">Downtime</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="inspections">Inspections</TabsTrigger>
                        <TabsTrigger value="issues">Issues</TabsTrigger>
                        <TabsTrigger value="usage">Usage</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            {/* Equipment Details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Equipment Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <PenTool className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">Type: {allocationDetails.equipment.type}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Serial Number</p>
                                                <p className="font-medium">{allocationDetails.equipment.serialNumber}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Condition</p>
                                                <Badge variant="outline">{allocationDetails.equipment.condition}</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Site Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Site Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <MapPin className="h-4 w-4 text-muted-foreground" />
                                            <span>{allocationDetails.site.location}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Site Manager</p>
                                                <p className="font-medium">{allocationDetails.site.manager}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Contact</p>
                                                <p className="font-medium">{allocationDetails.site.contact}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Team Details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Team Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                            <span>{allocationDetails.team.members} Team Members</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Team Leader</p>
                                                <p className="font-medium">{allocationDetails.team.leader}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Contact</p>
                                                <p className="font-medium">{allocationDetails.team.contact}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Duration */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Duration</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Start Date</p>
                                                <p className="font-medium">{allocationDetails.duration.startDate}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">End Date</p>
                                                <p className="font-medium">{allocationDetails.duration.endDate}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Progress</span>
                                                <span>{allocationDetails.duration.progress}%</span>
                                            </div>
                                            <Progress value={allocationDetails.duration.progress} className="h-2" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="inspections">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle>Inspection History</CardTitle>
                                    <Button variant="outline" size="sm">
                                        <Download className="h-4 w-4 mr-2" />
                                        Export
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {allocationDetails.inspections.map((inspection) => (
                                        <div key={inspection.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                                    <span className="font-medium">{inspection.type}</span>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{inspection.notes}</p>
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <Users className="h-4 w-4 mr-2" />
                                                    <span>{inspection.inspector}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <Badge
                                                    variant={inspection.status === 'passed' ? 'success' : 'destructive'}
                                                >
                                                    {inspection.status}
                                                </Badge>
                                                <p className="text-sm text-muted-foreground mt-1">{inspection.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="issues">
                        <Card>
                            <CardHeader>
                                <CardTitle>Reported Issues</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {allocationDetails.issues.map((issue) => (
                                        <div key={issue.id} className="flex items-start justify-between border-b pb-4 last:border-0">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                                    <span className="font-medium">{issue.description}</span>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{issue.resolution}</p>
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <Clock className="h-4 w-4 mr-2" />
                                                    <span>{issue.date}</span>
                                                </div>
                                            </div>
                                            <Badge
                                                variant={issue.status === 'resolved' ? 'success' : 'warning'}
                                            >
                                                {issue.status}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="usage">
                        <Card>
                            <CardHeader>
                                <CardTitle>Usage Analytics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {/* Usage Statistics */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold">Performance Metrics</h3>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span>Efficiency Rate</span>
                                                    <span>{allocationDetails.usage.efficiency}%</span>
                                                </div>
                                                <Progress value={allocationDetails.usage.efficiency} className="h-2" />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Total Hours Used</p>
                                                    <p className="text-2xl font-bold">{allocationDetails.usage.hoursUsed}h</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Days Active</p>
                                                    <p className="text-2xl font-bold">{allocationDetails.usage.daysActive}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Downtime Analysis */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold">Downtime Analysis</h3>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span>Uptime Rate</span>
                                                    <span>{((allocationDetails.usage.hoursUsed - allocationDetails.usage.downtime) / allocationDetails.usage.hoursUsed * 100).toFixed(1)}%</span>
                                                </div>
                                                <Progress
                                                    value={((allocationDetails.usage.hoursUsed - allocationDetails.usage.downtime) / allocationDetails.usage.hoursUsed * 100)}
                                                    className="h-2"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Total Downtime</p>
                                                    <p className="text-2xl font-bold">{allocationDetails.usage.downtime}h</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Current Status</p>
                                                    <Badge variant={allocationDetails.duration.status === 'in_use' ? 'success' : 'warning'}>
                                                        {allocationDetails.duration.status.replace('_', ' ')}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Footer Actions */}
                <div className="flex justify-between items-center pt-6 border-t">
                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            Export Report
                        </Button>
                        <Button variant="outline" size="sm">
                            <History className="h-4 w-4 mr-2" />
                            View History
                        </Button>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="destructive" size="sm" onClick={() => setIsEndModalOpen(true)}>
                            <XCircle className="h-4 w-4 mr-2" />
                            End Allocation
                        </Button>
                    </div>
                </div>
            </Layout.Body>

            <EditAllocationModal
                open={isEditModalOpen}
                setOpen={setIsEditModalOpen}
                allocation={selectedAllocation}
            />
            <ExtendAllocationModal
                open={isExtendModalOpen}
                setOpen={setIsExtendModalOpen}
            />
            <EndAllocationModal
                open={isEndModalOpen}
                setOpen={setIsEndModalOpen}
            />
        </Layout>
    )
}