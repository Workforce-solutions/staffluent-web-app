import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Input } from '@/components/ui/input'
import {
    Search,
    Calendar,
    CheckCircle2,
    Clock,
    MapPin,
    FileText,
    Image,
    User,
    Building2,
    Download,
    ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const serviceHistory = [
    {
        id: "SRV-2024-001",
        type: "Installation",
        serviceType: "Barrier Installation",
        location: {
            name: "Main Office",
            address: "123 Business Ave",
            area: "North Entrance"
        },
        date: "2024-03-10",
        status: "completed",
        duration: "4 hours",
        technicians: [
            { name: "John Smith", role: "Lead Technician" },
            { name: "Sarah Johnson", role: "Assistant Technician" }
        ],
        materials: [
            { name: "Safety Barrier", quantity: 2 },
            { name: "Mounting Hardware", quantity: 1 }
        ],
        documents: [
            { type: "completion_certificate", name: "Completion Certificate" },
            { type: "installation_photos", name: "Installation Photos" },
            { type: "quality_report", name: "Quality Inspection Report" }
        ],
        satisfaction: 5,
        notes: "Installation completed according to specifications. Client signed off on all safety requirements.",
        warranty: {
            start: "2024-03-10",
            end: "2025-03-10",
            status: "active"
        }
    },
    {
        id: "SRV-2024-002",
        type: "Maintenance",
        serviceType: "Quarterly Maintenance",
        location: {
            name: "Branch Office",
            address: "456 Corporate Blvd",
            area: "Main Entrance"
        },
        date: "2024-03-05",
        status: "completed",
        duration: "2 hours",
        technicians: [
            { name: "Mike Wilson", role: "Maintenance Specialist" }
        ],
        materials: [
            { name: "Replacement Parts", quantity: 1 }
        ],
        documents: [
            { type: "maintenance_report", name: "Maintenance Report" },
            { type: "inspection_photos", name: "Inspection Photos" }
        ],
        satisfaction: 4,
        notes: "Routine maintenance completed. Minor adjustments made to improve performance.",
        warranty: {
            start: "2023-12-15",
            end: "2024-12-15",
            status: "active"
        }
    }
]

export default function ServiceHistory() {
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
                        <h2 className="text-2xl font-bold tracking-tight">Service History</h2>
                        <p className="text-muted-foreground">
                            View detailed history of all services and maintenance
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search services..."
                                className="w-full pl-8 sm:w-64"
                                type="search"
                            />
                        </div>
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Filter by type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Services</SelectItem>
                                <SelectItem value="installation">Installation</SelectItem>
                                <SelectItem value="maintenance">Maintenance</SelectItem>
                                <SelectItem value="repair">Repair</SelectItem>
                                <SelectItem value="inspection">Inspection</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button>
                            <Download className="h-4 w-4 mr-2" />
                            Export History
                        </Button>
                    </div>
                </div>

                {/* Overview Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <span className="text-2xl font-bold">28</span>
                                <span className="text-sm text-muted-foreground">Total Services</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Building2 className="h-5 w-5 text-blue-500" />
                                <span className="text-2xl font-bold">4</span>
                                <span className="text-sm text-muted-foreground">Service Locations</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Clock className="h-5 w-5 text-purple-500" />
                                <span className="text-2xl font-bold">3</span>
                                <span className="text-sm text-muted-foreground">Active Warranties</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Calendar className="h-5 w-5 text-yellow-500" />
                                <span className="text-2xl font-bold">2</span>
                                <span className="text-sm text-muted-foreground">Upcoming Services</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Service History List */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Service Records</CardTitle>
                            <Tabs defaultValue="all" className="w-[400px]">
                                <TabsList>
                                    <TabsTrigger value="all">All Time</TabsTrigger>
                                    <TabsTrigger value="year">This Year</TabsTrigger>
                                    <TabsTrigger value="quarter">This Quarter</TabsTrigger>
                                    <TabsTrigger value="month">This Month</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {serviceHistory.map((service) => (
                                <div key={service.id} className="border rounded-lg p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <h3 className="font-medium">{service.serviceType}</h3>
                                                <Badge variant="outline">{service.id}</Badge>
                                            </div>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <p className="text-sm text-muted-foreground">
                                                    {service.location.name} - {service.location.area}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Badge
                                                variant={service.status === 'completed' ? 'success' : 'secondary'}
                                            >
                                                {service.status}
                                            </Badge>
                                            {service.satisfaction && (
                                                <Badge variant="outline">
                                                    {service.satisfaction}/5 Satisfaction
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-sm font-medium mb-2">Service Details</h4>
                                                <div className="grid grid-cols-2 gap-2 text-sm">
                                                    <div className="text-muted-foreground">Date:</div>
                                                    <div>{service.date}</div>
                                                    <div className="text-muted-foreground">Duration:</div>
                                                    <div>{service.duration}</div>
                                                    <div className="text-muted-foreground">Type:</div>
                                                    <div>{service.type}</div>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-medium mb-2">Technicians</h4>
                                                <div className="space-y-2">
                                                    {service.technicians.map((tech, index) => (
                                                        <div key={index} className="flex items-center space-x-2">
                                                            <User className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm">{tech.name}</span>
                                                            <span className="text-sm text-muted-foreground">({tech.role})</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-sm font-medium mb-2">Documents & Photos</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {service.documents.map((doc, index) => (
                                                        <Button key={index} variant="outline" size="sm">
                                                            {doc.type === 'installation_photos' || doc.type === 'inspection_photos' ? (
                                                                <Image className="h-4 w-4 mr-2" />
                                                            ) : (
                                                                <FileText className="h-4 w-4 mr-2" />
                                                            )}
                                                            {doc.name}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>

                                            {service.warranty && (
                                                <div>
                                                    <h4 className="text-sm font-medium mb-2">Warranty Information</h4>
                                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                                        <div className="text-muted-foreground">Start Date:</div>
                                                        <div>{service.warranty.start}</div>
                                                        <div className="text-muted-foreground">End Date:</div>
                                                        <div>{service.warranty.end}</div>
                                                        <div className="text-muted-foreground">Status:</div>
                                                        <div>
                                                            <Badge variant="outline">
                                                                {service.warranty.status}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-end space-x-2 pt-4 mt-4 border-t">
                                        <Button variant="outline" size="sm">
                                            Download Report
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            Schedule Service
                                        </Button>
                                        <Button size="sm">
                                            View Details
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </Layout.Body>

        </Layout>
    )
}