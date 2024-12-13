import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import {
    TrendingUp,
    Download,
    Calendar,
    Building,
    Star,
    AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const performanceData = [
    { month: 'Jan', quality: 92, industry: 85 },
    { month: 'Feb', quality: 94, industry: 85 },
    { month: 'Mar', quality: 93, industry: 85 }
]

const qualityReports = [
    {
        id: "QR-2024-001",
        title: "Monthly Quality Assessment",
        location: "Main Office - North Wing",
        date: "March 2024",
        score: 94,
        status: "excellent",
        categories: [
            { name: "Safety Standards", score: 96 },
            { name: "Material Quality", score: 92 },
            { name: "Installation", score: 94 },
            { name: "Maintenance", score: 93 }
        ],
        highlights: [
            "Exceeded safety standards by 10%",
            "All materials meet premium quality benchmarks",
            "Zero safety incidents reported"
        ],
        recommendations: [
            "Schedule routine maintenance check in Q2"
        ]
    },
    {
        id: "QR-2024-002",
        title: "Service Quality Review",
        location: "Branch Office",
        date: "February 2024",
        score: 92,
        status: "good",
        categories: [
            { name: "Service Delivery", score: 94 },
            { name: "Response Time", score: 90 },
            { name: "Quality Control", score: 92 },
            { name: "Client Satisfaction", score: 91 }
        ],
        highlights: [
            "Above average response times",
            "High client satisfaction ratings",
            "Effective quality control measures"
        ],
        recommendations: [
            "Consider premium service upgrade options"
        ]
    }
]

export default function QualityReports() {
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
                        <h2 className="text-2xl font-bold tracking-tight">Quality Reports</h2>
                        <p className="text-muted-foreground">
                            View quality metrics and performance reports for your services
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Locations</SelectItem>
                                <SelectItem value="main">Main Office</SelectItem>
                                <SelectItem value="branch">Branch Office</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button>
                            <Download className="h-4 w-4 mr-2" />
                            Export Reports
                        </Button>
                    </div>
                </div>

                {/* Overview Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Star className="h-5 w-5 text-yellow-500" />
                                <span className="text-2xl font-bold">93%</span>
                                <span className="text-sm text-muted-foreground">Overall Quality</span>
                                <Progress value={93} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <TrendingUp className="h-5 w-5 text-green-500" />
                                <span className="text-2xl font-bold">+8%</span>
                                <span className="text-sm text-muted-foreground">Above Industry Avg</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Building className="h-5 w-5 text-blue-500" />
                                <span className="text-2xl font-bold">2</span>
                                <span className="text-sm text-muted-foreground">Locations Monitored</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <AlertCircle className="h-5 w-5 text-purple-500" />
                                <span className="text-2xl font-bold">0</span>
                                <span className="text-sm text-muted-foreground">Quality Concerns</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Performance Chart */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Quality Performance Trends</CardTitle>
                            <Tabs defaultValue="3m" className="w-[400px]">
                                <TabsList>
                                    <TabsTrigger value="3m">3 Months</TabsTrigger>
                                    <TabsTrigger value="6m">6 Months</TabsTrigger>
                                    <TabsTrigger value="1y">1 Year</TabsTrigger>
                                    <TabsTrigger value="all">All Time</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={performanceData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="quality"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        name="Your Quality Score"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="industry"
                                        stroke="#22c55e"
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                        name="Industry Average"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Quality Reports */}
                <div className="space-y-6">
                    {qualityReports.map((report) => (
                        <Card key={report.id}>
                            <CardContent className="p-6">
                                <div className="space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <h3 className="font-medium">{report.title}</h3>
                                                <Badge variant="outline">{report.id}</Badge>
                                            </div>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <Building className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm text-muted-foreground">{report.location}</span>
                                                <Calendar className="h-4 w-4 text-muted-foreground ml-2" />
                                                <span className="text-sm text-muted-foreground">{report.date}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-2xl font-bold">{report.score}%</span>
                                            <Badge
                                                variant={
                                                    report.status === 'excellent' ? 'success' :
                                                        report.status === 'good' ? 'default' :
                                                            'warning'
                                                }
                                            >
                                                {report.status}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <h4 className="text-sm font-medium mb-4">Category Scores</h4>
                                            <div className="space-y-4">
                                                {report.categories.map((category, index) => (
                                                    <div key={index} className="space-y-2">
                                                        <div className="flex justify-between text-sm">
                                                            <span>{category.name}</span>
                                                            <span className="font-medium">{category.score}%</span>
                                                        </div>
                                                        <Progress value={category.score} className="h-2" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-sm font-medium mb-2">Key Highlights</h4>
                                                <ul className="space-y-2">
                                                    {report.highlights.map((highlight, index) => (
                                                        <li key={index} className="text-sm text-muted-foreground flex items-start">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 mr-2" />
                                                            {highlight}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {report.recommendations.length > 0 && (
                                                <div>
                                                    <h4 className="text-sm font-medium mb-2">Recommendations</h4>
                                                    <ul className="space-y-2">
                                                        {report.recommendations.map((rec, index) => (
                                                            <li key={index} className="text-sm text-muted-foreground flex items-start">
                                                                <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 mt-1.5 mr-2" />
                                                                {rec}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-end space-x-2 pt-4 border-t">
                                        <Button variant="outline" size="sm">
                                            Download Report
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            Share Report
                                        </Button>
                                        <Button size="sm">
                                            View Full Details
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