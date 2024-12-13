import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import {
    Shield,
    AlertTriangle,
    HardHat,
    FileText,
    Calendar,
    Download,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'

const sampleData = {
    compliance: {
        overall: 92,
        inspections: 45,
        openIssues: 3,
        criticalFindings: 1
    },
    recentIncidents: [
        {
            id: 1,
            date: "2024-03-08",
            type: "Near Miss",
            location: "Site A - Floor 3",
            severity: "low",
            status: "resolved",
            description: "Worker spotted unsecured tool near edge"
        },
        {
            id: 2,
            date: "2024-03-05",
            type: "Safety Violation",
            location: "Site B - Ground Level",
            severity: "medium",
            status: "in_progress",
            description: "PPE compliance issue during inspection"
        }
    ],
    complianceByCategory: [
        { name: 'PPE', value: 95, color: '#22c55e' },
        { name: 'Fire Safety', value: 88, color: '#eab308' },
        { name: 'Fall Protection', value: 92, color: '#3b82f6' },
        { name: 'Equipment', value: 85, color: '#f97316' }
    ]
}

const SafetyComplianceReport = () => {
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
                        <h2 className="text-2xl font-bold tracking-tight">Safety Compliance Report</h2>
                        <p className="text-muted-foreground">
                            Monitor safety compliance and track incidents across sites
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select site" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Sites</SelectItem>
                                <SelectItem value="site-a">Site A</SelectItem>
                                <SelectItem value="site-b">Site B</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button>
                            <Download className="h-4 w-4 mr-2" />
                            Export Report
                        </Button>
                    </div>
                </div>

                {/* Overview Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Shield className="h-5 w-5 text-green-500" />
                                <span className="text-2xl font-bold">{sampleData.compliance.overall}%</span>
                                <span className="text-sm text-muted-foreground">Overall Compliance</span>
                                <Progress value={sampleData.compliance.overall} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <FileText className="h-5 w-5 text-blue-500" />
                                <span className="text-2xl font-bold">{sampleData.compliance.inspections}</span>
                                <span className="text-sm text-muted-foreground">Inspections Complete</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                <span className="text-2xl font-bold">{sampleData.compliance.openIssues}</span>
                                <span className="text-sm text-muted-foreground">Open Issues</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <HardHat className="h-5 w-5 text-red-500" />
                                <span className="text-2xl font-bold">{sampleData.compliance.criticalFindings}</span>
                                <span className="text-sm text-muted-foreground">Critical Findings</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Compliance by Category */}
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle>Compliance by Category</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={sampleData.complianceByCategory}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {sampleData.complianceByCategory.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                {sampleData.complianceByCategory.map((category, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">{category.name}</span>
                                            <span className="font-medium">{category.value}%</span>
                                        </div>
                                        <Progress
                                            value={category.value}
                                            className="h-2"
                                            style={{ backgroundColor: `${category.color}20` }} // Light version of category color
                                            // @ts-ignore
                                            indicatorClassName={`bg-[${category.color}]`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Incidents */}
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle>Recent Safety Incidents</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {sampleData.recentIncidents.map((incident) => (
                                    <div key={incident.id} className="border rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-medium">{incident.type}</h3>
                                                <p className="text-sm text-muted-foreground">{incident.location}</p>
                                            </div>
                                            <Badge
                                                variant={
                                                    incident.severity === 'low' ? 'secondary' :
                                                        incident.severity === 'medium' ? 'warning' :
                                                            'destructive'
                                                }
                                            >
                                                {incident.severity}
                                            </Badge>
                                        </div>
                                        <p className="text-sm mb-4">{incident.description}</p>
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <span>{incident.date}</span>
                                            </div>
                                            <Badge variant="outline">
                                                {incident.status.replace('_', ' ')}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="outline" className="w-full">
                                    View All Incidents
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Detailed Compliance Table */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Compliance Requirements Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <div className="grid grid-cols-4 gap-4 p-4 border-b font-medium">
                                    <div>Requirement</div>
                                    <div>Status</div>
                                    <div>Last Check</div>
                                    <div>Actions</div>
                                </div>
                                <div className="divide-y">
                                    {[
                                        { requirement: "PPE Compliance", status: "compliant", lastCheck: "2024-03-10" },
                                        { requirement: "Safety Training", status: "attention", lastCheck: "2024-03-08" },
                                        { requirement: "Equipment Inspection", status: "compliant", lastCheck: "2024-03-09" },
                                        { requirement: "Emergency Procedures", status: "compliant", lastCheck: "2024-03-07" }
                                    ].map((item, index) => (
                                        <div key={index} className="grid grid-cols-4 gap-4 p-4 items-center">
                                            <div>{item.requirement}</div>
                                            <div>
                                                <Badge
                                                    variant={item.status === 'compliant' ? 'success' : 'warning'}
                                                >
                                                    {item.status}
                                                </Badge>
                                            </div>
                                            <div className="text-sm text-muted-foreground">{item.lastCheck}</div>
                                            <div>
                                                <Button variant="outline" size="sm">
                                                    View Details
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </Layout.Body>

        </Layout>
    )
}

export default SafetyComplianceReport