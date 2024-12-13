import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Plus,
    Construction,
    AlertTriangle,
    FileCheck,
    MapPin,
    Clock,
    CalendarDays,
    ArrowRight,
    Camera,
    PencilRuler,
    Verified,
    Rows
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'

// Types
interface Barrier {
    id: number
    type: string
    location: string
    status: 'active' | 'damaged' | 'maintenance' | 'removed'
    installDate: string
    lastInspection: string
    nextInspection: string
    compliance: number
    dimensions: {
        length: number
        height: number
    }
    specifications: {
        material: string
        reflective: boolean
        weatherproof: boolean
    }
    inspectionHistory: Array<{
        date: string
        status: string
        inspector: string
        issues?: string[]
    }>
    requiredSignage: string[]
    photos: string[]
}

// Demo data
const barrierData: Barrier[] = [
    {
        id: 1,
        type: "Jersey Barrier",
        location: "North Perimeter",
        status: "active",
        installDate: "2024-01-15",
        lastInspection: "2024-02-15",
        nextInspection: "2024-03-15",
        compliance: 95,
        dimensions: {
            length: 20,
            height: 1.8
        },
        specifications: {
            material: "Concrete",
            reflective: true,
            weatherproof: true
        },
        inspectionHistory: [
            {
                date: "2024-02-15",
                status: "Pass",
                inspector: "John Inspector",
                issues: []
            }
        ],
        requiredSignage: ["No Entry", "Construction Zone"],
        photos: ["barrier-1-front.jpg", "barrier-1-side.jpg"]
    },
    {
        id: 2,
        type: "Temporary Fencing",
        location: "East Access",
        status: "damaged",
        installDate: "2024-01-20",
        lastInspection: "2024-02-10",
        nextInspection: "2024-03-10",
        compliance: 75,
        dimensions: {
            length: 15,
            height: 2
        },
        specifications: {
            material: "Steel",
            reflective: false,
            weatherproof: true
        },
        inspectionHistory: [
            {
                date: "2024-02-10",
                status: "Fail",
                inspector: "Sarah Safety",
                issues: ["Fence panel bent", "Missing signage"]
            }
        ],
        requiredSignage: ["Construction Area", "Hard Hat Required"],
        photos: ["barrier-2-damage.jpg"]
    },
    {
        id: 3,
        type: "Safety Netting",
        location: "South Tower",
        status: "maintenance",
        installDate: "2024-02-01",
        lastInspection: "2024-02-20",
        nextInspection: "2024-03-20",
        compliance: 85,
        dimensions: {
            length: 30,
            height: 3
        },
        specifications: {
            material: "Nylon",
            reflective: true,
            weatherproof: true
        },
        inspectionHistory: [
            {
                date: "2024-02-20",
                status: "Maintenance Required",
                inspector: "Mike Maintenance",
                issues: ["Tension adjustment needed"]
            }
        ],
        requiredSignage: ["Fall Protection in Use", "Authorized Personnel Only"],
        photos: ["barrier-3-full.jpg"]
    }
]

const BarrierManagement = () => {
    const BarrierCard = ({ barrier }: { barrier: Barrier }) => (
        <Card>
            <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-medium">{barrier.type}</h3>
                        <p className="text-sm text-muted-foreground">{barrier.location}</p>
                    </div>
                    <Badge variant={
                        barrier.status === 'active' ? 'success' :
                            barrier.status === 'maintenance' ? 'warning' :
                                barrier.status === 'damaged' ? 'destructive' :
                                    'secondary'
                    }>
                        {barrier.status}
                    </Badge>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span>Compliance</span>
                            <span>{barrier.compliance}%</span>
                        </div>
                        <Progress value={barrier.compliance} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Specifications</p>
                            <div className="space-y-1">
                                <div className="flex items-center text-sm">
                                    <PencilRuler className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span>{barrier.dimensions.length}m × {barrier.dimensions.height}m</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Construction className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span>{barrier.specifications.material}</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Required Signage</p>
                            <div className="space-y-1">
                                {barrier.requiredSignage.map((sign, index) => (
                                    <div key={index} className="flex items-center text-sm">
                                        <Verified className="h-4 w-4 mr-2 text-muted-foreground" />
                                        <span>{sign}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>Installed: {barrier.installDate}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>Next Check: {barrier.nextInspection}</span>
                            </div>
                        </div>
                        {barrier.inspectionHistory[0].issues && barrier.inspectionHistory[0].issues.length > 0 && (
                            <div className="space-y-1">
                                {barrier.inspectionHistory[0].issues.map((issue, index) => (
                                    <div key={index} className="flex items-start text-sm text-yellow-600">
                                        <AlertTriangle className="h-4 w-4 mr-2 mt-1" />
                                        <span>{issue}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center pt-4 mt-4 border-t">
                        <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-2" />
                            {barrier.location}
                        </div>
                        <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                                <Camera className="h-4 w-4 mr-2" />
                                Photos
                            </Button>
                            <Button size="sm">
                                Inspect
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
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
                        <h2 className="text-2xl font-bold tracking-tight">Barrier Management</h2>
                        <p className="text-muted-foreground">
                            Monitor and manage site safety barriers
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Barrier
                        </Button>
                        <Button variant="outline">
                            <FileCheck className="h-4 w-4 mr-2" />
                            Batch Inspection
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Barriers</CardTitle>
                            <Rows className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{barrierData.length}</div>
                            <p className="text-xs text-muted-foreground">
                                Currently installed
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Issues Found</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {barrierData.reduce((sum, barrier) =>
                                    sum + (barrier.inspectionHistory[0].issues?.length || 0), 0
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Active problems
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
                            <Verified className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {Math.round(barrierData.reduce((sum, b) => sum + b.compliance, 0) / barrierData.length)}%
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Average compliance
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Next Inspection</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3d</div>
                            <p className="text-xs text-muted-foreground">
                                Until next check
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex space-x-2">
                    <Input
                        placeholder="Search barriers..."
                        className="max-w-sm"
                    />
                    <Button variant="outline">
                        Filter
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {barrierData.map(barrier => (
                        <BarrierCard key={barrier.id} barrier={barrier} />
                    ))}
                </div>
            </Layout.Body>
        </Layout>
    )
}

export default BarrierManagement