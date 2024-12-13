import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, Users, Truck, HardDrive, ArrowRight, Clock } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

// Types
interface Resource {
    id: number
    name: string
    type: 'equipment' | 'vehicle' | 'material'
    status: 'available' | 'in-use' | 'maintenance'
    assignedTo: string | null
    location: string
    lastUpdated: string
    utilization: number
}

interface ResourceAllocation {
    id: number
    siteName: string
    resourceCount: number
    workers: number
    vehicles: number
    equipment: number
    utilizationRate: number
    lastUpdated: string
}

// Demo data
const resourcesData: Resource[] = [
    {
        id: 1,
        name: "Excavator XC-100",
        type: "equipment",
        status: "in-use",
        assignedTo: "Downtown Plaza Project",
        location: "Site A",
        lastUpdated: "10 minutes ago",
        utilization: 85
    },
    {
        id: 2,
        name: "Dump Truck DT-200",
        type: "vehicle",
        status: "available",
        assignedTo: null,
        location: "Central Depot",
        lastUpdated: "1 hour ago",
        utilization: 0
    },
    // Add more resources...
]

const allocationData: ResourceAllocation[] = [
    {
        id: 1,
        siteName: "Downtown Plaza Project",
        resourceCount: 15,
        workers: 45,
        vehicles: 5,
        equipment: 10,
        utilizationRate: 85,
        lastUpdated: "5 minutes ago"
    },
    // Add more allocations...
]

const SiteResources = () => {
    const ResourceCard = ({ resource }: { resource: Resource }) => (
        <Card>
            <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-medium">{resource.name}</h3>
                        <p className="text-sm text-muted-foreground">{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</p>
                    </div>
                    <Badge variant={
                        resource.status === 'available' ? 'success' :
                            resource.status === 'in-use' ? 'warning' :
                                'destructive'
                    }>
                        {resource.status}
                    </Badge>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span>Utilization</span>
                            <span>{resource.utilization}%</span>
                        </div>
                        <Progress value={resource.utilization} className="h-2" />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Location:</span>
                            <span>{resource.location}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Assigned To:</span>
                            <span>{resource.assignedTo || 'Unassigned'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Last Updated:</span>
                            <span>{resource.lastUpdated}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )

    const AllocationCard = ({ allocation }: { allocation: ResourceAllocation }) => (
        <Card>
            <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-medium">{allocation.siteName}</h3>
                        <p className="text-sm text-muted-foreground">
                            {allocation.resourceCount} total resources
                        </p>
                    </div>
                    <Button variant="ghost" size="icon">
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold">{allocation.workers}</div>
                            <p className="text-xs text-muted-foreground">Workers</p>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold">{allocation.vehicles}</div>
                            <p className="text-xs text-muted-foreground">Vehicles</p>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold">{allocation.equipment}</div>
                            <p className="text-xs text-muted-foreground">Equipment</p>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span>Utilization Rate</span>
                            <span>{allocation.utilizationRate}%</span>
                        </div>
                        <Progress value={allocation.utilizationRate} className="h-2" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )

    return (
        <Layout>
            <Layout.Header>
                <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body className="space-y-8">
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Resource Allocation</h2>
                        <p className="text-muted-foreground">
                            Manage and track resource distribution across sites
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                        <Input
                            placeholder="Search resources..."
                            className="w-full sm:w-64"
                            type="search"
                            // @ts-ignore
                            icon={<Search className="h-4 w-4" />}
                        />
                        <Button variant="outline">
                            <Filter className="h-4 w-4 mr-2" />
                            Filters
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
                            <HardDrive className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{resourcesData.length}</div>
                            <p className="text-xs text-muted-foreground">
                                Across all sites
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Workers</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">127</div>
                            <p className="text-xs text-muted-foreground">
                                Currently deployed
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Vehicles</CardTitle>
                            <Truck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">24</div>
                            <p className="text-xs text-muted-foreground">
                                In operation
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">78%</div>
                            <p className="text-xs text-muted-foreground">
                                Resource efficiency
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Site Allocations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {allocationData.map(allocation => (
                                <AllocationCard key={allocation.id} allocation={allocation} />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {resourcesData.map(resource => (
                        <ResourceCard key={resource.id} resource={resource} />
                    ))}
                </div>
            </Layout.Body>
        </Layout>
    )
}

export default SiteResources