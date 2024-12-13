import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Input } from '@/components/ui/input'
import {
    ClipboardList,
    Calendar,
    Plus,
    Search,
    Loader2,
    CheckCircle2,
    User
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from "@/components/ui/checkbox"

const checklistData = [
    {
        id: "CL-2024-001",
        name: "Pre-Construction Site Inspection",
        category: "Site Preparation",
        status: "in_progress",
        dueDate: "2024-03-15",
        assignedTo: "John Smith",
        progress: 75,
        items: [
            { text: "Site boundaries marked", checked: true },
            { text: "Utilities marked and verified", checked: true },
            { text: "Access routes identified", checked: true },
            { text: "Environmental concerns addressed", checked: false }
        ]
    },
    {
        id: "CL-2024-002",
        name: "Foundation Quality Check",
        category: "Structural",
        status: "pending",
        dueDate: "2024-03-16",
        assignedTo: "Sarah Johnson",
        progress: 0,
        items: [
            { text: "Concrete mix ratio verified", checked: false },
            { text: "Reinforcement placement checked", checked: false },
            { text: "Foundation depth measured", checked: false },
            { text: "Moisture barrier installed", checked: false }
        ]
    },
    {
        id: "CL-2024-003",
        name: "Safety Equipment Inspection",
        category: "Safety",
        status: "completed",
        dueDate: "2024-03-10",
        assignedTo: "Mike Wilson",
        progress: 100,
        items: [
            { text: "PPE inventory checked", checked: true },
            { text: "First aid kits verified", checked: true },
            { text: "Fire extinguishers inspected", checked: true },
            { text: "Emergency signs visible", checked: true }
        ]
    }
]

export function InspectionChecklists() {
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
                        <h2 className="text-2xl font-bold tracking-tight">Inspection Checklists</h2>
                        <p className="text-muted-foreground">
                            Manage and track inspection requirements
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search checklists..."
                                className="w-full pl-8 sm:w-64"
                                type="search"
                            />
                        </div>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            New Checklist
                        </Button>
                    </div>
                </div>

                {/* Overview Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <ClipboardList className="h-5 w-5 text-blue-500" />
                                <span className="text-2xl font-bold">24</span>
                                <span className="text-sm text-muted-foreground">Total Checklists</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Loader2 className="h-5 w-5 text-yellow-500" />
                                <span className="text-2xl font-bold">8</span>
                                <span className="text-sm text-muted-foreground">In Progress</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <span className="text-2xl font-bold">16</span>
                                <span className="text-sm text-muted-foreground">Completed</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Checklist Cards */}
                <div className="space-y-6">
                    {checklistData.map((checklist) => (
                        <Card key={checklist.id}>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <h3 className="font-medium">{checklist.name}</h3>
                                                <Badge variant="outline">{checklist.id}</Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{checklist.category}</p>
                                        </div>
                                        <Badge
                                            variant={
                                                checklist.status === 'completed' ? 'success' :
                                                    checklist.status === 'in_progress' ? 'warning' :
                                                        'secondary'
                                            }
                                        >
                                            {checklist.status.replace('_', ' ')}
                                        </Badge>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Progress</span>
                                            <span>{checklist.progress}%</span>
                                        </div>
                                        <Progress value={checklist.progress} className="h-2" />
                                    </div>

                                    <div className="space-y-3">
                                        {checklist.items.map((item, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <Checkbox checked={item.checked} />
                                                <span className={`text-sm ${item.checked ? 'line-through text-muted-foreground' : ''}`}>
                                                    {item.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-center pt-4 border-t">
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <User className="h-4 w-4" />
                                                {checklist.assignedTo}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                Due: {checklist.dueDate}
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Layout.Body>


        </Layout>
    )
}

export default InspectionChecklists