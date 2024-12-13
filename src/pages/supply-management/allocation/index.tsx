import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
    Settings,
    Search,
    Plus,
    Building2,
    Users,
    CalendarClock,
} from 'lucide-react'
import {AddAllocationModal} from "./add-allocation";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const allocationData = [
    {
        id: "EQ-2024-001",
        equipment: "Safety Barrier System A",
        type: "Barrier",
        site: {
            name: "Downtown Project",
            location: "Main Entrance"
        },
        assignedTeam: "Team Alpha",
        startDate: "2024-03-01",
        endDate: "2024-03-15",
        status: "in_use",
        condition: "good",
        notes: "Regular inspection required weekly"
    },
    {
        id: "EQ-2024-002",
        equipment: "Mobile Signage Unit",
        type: "Signage",
        site: {
            name: "Midtown Complex",
            location: "South Wing"
        },
        assignedTeam: "Team Beta",
        startDate: "2024-03-05",
        endDate: "2024-03-20",
        status: "scheduled",
        condition: "excellent",
        notes: "Pre-deployment check completed"
    },
    {
        id: "EQ-2024-003",
        equipment: "Traffic Management Kit",
        type: "Traffic Control",
        site: {
            name: "Highway Project",
            location: "Section B"
        },
        assignedTeam: "Team Delta",
        startDate: "2024-03-10",
        endDate: "2024-04-10",
        status: "in_use",
        condition: "fair",
        notes: "Maintenance scheduled for next week"
    }
];

export default function EquipmentAllocation() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
                        <h2 className="text-2xl font-bold tracking-tight">Equipment Allocation</h2>
                        <p className="text-muted-foreground">
                            Manage and track equipment assignments across sites
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search equipment..."
                                className="w-full pl-8 sm:w-64"
                                type="search"
                            />
                        </div>
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="in_use">In Use</SelectItem>
                                <SelectItem value="scheduled">Scheduled</SelectItem>
                                <SelectItem value="available">Available</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button onClick={() => setIsAddModalOpen(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            New Allocation
                        </Button>
                    </div>
                </div>

                {/* Overview Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Settings className="h-5 w-5 text-blue-500" />
                                <span className="text-2xl font-bold">45</span>
                                <span className="text-sm text-muted-foreground">Total Equipment</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Building2 className="h-5 w-5 text-green-500" />
                                <span className="text-2xl font-bold">8</span>
                                <span className="text-sm text-muted-foreground">Active Sites</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Users className="h-5 w-5 text-yellow-500" />
                                <span className="text-2xl font-bold">12</span>
                                <span className="text-sm text-muted-foreground">Assigned Teams</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <CalendarClock className="h-5 w-5 text-purple-500" />
                                <span className="text-2xl font-bold">5</span>
                                <span className="text-sm text-muted-foreground">Pending Allocations</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Allocation List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Equipment Allocations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <div className="grid grid-cols-7 gap-4 p-4 border-b font-medium">
                                <div>Equipment</div>
                                <div>Site</div>
                                <div>Team</div>
                                <div>Start Date</div>
                                <div>End Date</div>
                                <div>Condition</div>
                                <div className="text-center">Status</div>
                            </div>
                            <div className="divide-y">
                                {allocationData.map((item) => (
                                    <div
                                        key={item.id}
                                        className="grid grid-cols-7 gap-4 p-4 items-center hover:bg-muted/50 cursor-pointer"
                                        onClick={() => navigate(`/supply-management/allocation/${item.id}`)}
                                    >
                                        <div>
                                            <div className="font-medium">{item.equipment}</div>
                                            <div className="text-sm text-muted-foreground">{item.type}</div>
                                        </div>
                                        <div>
                                            <div>{item.site.name}</div>
                                            <div className="text-sm text-muted-foreground">{item.site.location}</div>
                                        </div>
                                        <div>{item.assignedTeam}</div>
                                        <div className="text-sm">{item.startDate}</div>
                                        <div className="text-sm">{item.endDate}</div>
                                        <div>
                                            <Badge variant="outline">
                                                {item.condition}
                                            </Badge>
                                        </div>
                                        <div className="text-center">
                                            <Badge
                                                variant={
                                                    item.status === 'in_use' ? 'success' :
                                                        item.status === 'scheduled' ? 'warning' :
                                                            'secondary'
                                                }
                                            >
                                                {item.status.replace('_', ' ')}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Layout.Body>
            {isAddModalOpen && (
                <AddAllocationModal
                    open={isAddModalOpen}
                    setOpen={setIsAddModalOpen}
                />
            )}
        </Layout>
    )
}