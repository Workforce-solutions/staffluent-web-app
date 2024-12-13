import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Input } from '@/components/ui/input'
import { Search, Plus, Check, Clock, AlertTriangle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import {AddWorkflowModal} from "./add-workflow";
import {useState} from "react";

const sampleWorkflows = [
    {
        id: 1,
        name: "Site Preparation",
        site: "Downtown Project",
        status: "in_progress",
        progress: 65,
        steps: [
            { name: "Ground Survey", status: "completed" },
            { name: "Equipment Setup", status: "completed" },
            { name: "Safety Barriers", status: "in_progress" },
            { name: "Utility Marking", status: "pending" }
        ],
        assignedTeam: "Team Alpha",
        estimatedCompletion: "2024-03-20"
    },
    {
        id: 2,
        name: "Foundation Work",
        site: "Midtown Complex",
        status: "pending",
        progress: 0,
        steps: [
            { name: "Material Delivery", status: "pending" },
            { name: "Excavation", status: "pending" },
            { name: "Reinforcement", status: "pending" },
            { name: "Concrete Pouring", status: "pending" }
        ],
        assignedTeam: "Team Beta",
        estimatedCompletion: "2024-04-15"
    }
]

const SiteWorkflows = () => {
    const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false)

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
                        <h2 className="text-2xl font-bold tracking-tight">Site Workflows</h2>
                        <p className="text-muted-foreground">
                            Manage and track construction site workflows
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search workflows..."
                                className="w-full pl-8 sm:w-64"
                                type="search"
                            />
                        </div>
                        <Button onClick={() => setIsWorkflowModalOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                            New Workflow
                        </Button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <span className="text-2xl font-bold">8</span>
                                <span className="text-sm text-muted-foreground">Active Workflows</span>
                                <Progress value={80} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <span className="text-2xl font-bold">85%</span>
                                <span className="text-sm text-muted-foreground">On Schedule</span>
                                <Progress value={85} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <span className="text-2xl font-bold">3</span>
                                <span className="text-sm text-muted-foreground">Pending Approval</span>
                                <Progress value={30} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Workflow List */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Active Workflows</CardTitle>
                            <Select defaultValue="all">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="in_progress">In Progress</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {sampleWorkflows.map((workflow) => (
                                <div key={workflow.id} className="border rounded-lg p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-medium text-lg">{workflow.name}</h3>
                                            <p className="text-sm text-muted-foreground">{workflow.site}</p>
                                        </div>
                                        <Badge
                                            variant={
                                                workflow.status === 'completed' ? 'success' :
                                                    workflow.status === 'in_progress' ? 'warning' :
                                                        'secondary'
                                            }
                                        >
                                            {workflow.status.replace('_', ' ')}
                                        </Badge>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Progress Bar */}
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-sm font-medium">Progress</span>
                                                <span className="text-sm text-muted-foreground">
                                                    {workflow.progress}%
                                                </span>
                                            </div>
                                            <Progress value={workflow.progress} className="h-2" />
                                        </div>

                                        {/* Workflow Steps */}
                                        <div className="space-y-3">
                                            {workflow.steps.map((step, index) => (
                                                <div key={index} className="flex items-center space-x-4">
                                                    {step.status === 'completed' ? (
                                                        <Check className="h-5 w-5 text-green-500" />
                                                    ) : step.status === 'in_progress' ? (
                                                        <Clock className="h-5 w-5 text-yellow-500" />
                                                    ) : (
                                                        <AlertTriangle className="h-5 w-5 text-gray-300" />
                                                    )}
                                                    <span className={`flex-1 text-sm ${
                                                        step.status === 'completed' ? 'line-through text-muted-foreground' : ''
                                                    }`}>
                                                        {step.name}
                                                    </span>
                                                    <Badge variant="outline">
                                                        {step.status}
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Footer Info */}
                                        <div className="flex justify-between items-center pt-4 border-t">
                                            <div className="flex items-center space-x-4">
                                                <div className="text-sm">
                                                    <span className="text-muted-foreground">Team: </span>
                                                    <span className="font-medium">{workflow.assignedTeam}</span>
                                                </div>
                                                <div className="text-sm">
                                                    <span className="text-muted-foreground">Due: </span>
                                                    <span className="font-medium">{workflow.estimatedCompletion}</span>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                View Details
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </Layout.Body>
            {isWorkflowModalOpen && (
                <AddWorkflowModal
                    open={isWorkflowModalOpen}
                    setOpen={setIsWorkflowModalOpen}
                />
            )}

        </Layout>
    )
}

export default SiteWorkflows