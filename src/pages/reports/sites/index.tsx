import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import {
    TrendingUp,
    Clock,
    Target,
    Download,
    Activity
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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'

const sampleData = {
    performance: {
        efficiency: 87,
        onTimeCompletion: 92,
        resourceUtilization: 84,
        qualityScore: 95
    },
    timelineData: [
        { date: '03/01', efficiency: 82, target: 85 },
        { date: '03/02', efficiency: 86, target: 85 },
        { date: '03/03', efficiency: 84, target: 85 },
        { date: '03/04', efficiency: 87, target: 85 },
        { date: '03/05', efficiency: 85, target: 85 },
        { date: '03/06', efficiency: 88, target: 85 },
        { date: '03/07', efficiency: 87, target: 85 }
    ],
    resourceMetrics: [
        { resource: 'Labor', utilized: 84, available: 100 },
        { resource: 'Equipment', utilized: 92, available: 100 },
        { resource: 'Materials', utilized: 78, available: 100 }
    ],
    milestoneProgress: [
        { name: 'Foundation Work', completion: 100, status: 'completed' },
        { name: 'Structural Framework', completion: 65, status: 'in_progress' },
        { name: 'Electrical Installation', completion: 30, status: 'in_progress' },
        { name: 'Plumbing', completion: 20, status: 'in_progress' },
        { name: 'Interior Finishing', completion: 0, status: 'pending' }
    ]
}

const SitePerformanceReport = () => {
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
                        <h2 className="text-2xl font-bold tracking-tight">Site Performance Report</h2>
                        <p className="text-muted-foreground">
                            Monitor site efficiency and resource utilization
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                        <Select defaultValue="7">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select timeframe" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="7">Last 7 Days</SelectItem>
                                <SelectItem value="30">Last 30 Days</SelectItem>
                                <SelectItem value="90">Last Quarter</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button>
                            <Download className="h-4 w-4 mr-2" />
                            Export Report
                        </Button>
                    </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Activity className="h-5 w-5 text-blue-500" />
                                <span className="text-2xl font-bold">{sampleData.performance.efficiency}%</span>
                                <span className="text-sm text-muted-foreground">Efficiency Rate</span>
                                <Progress value={sampleData.performance.efficiency} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Clock className="h-5 w-5 text-green-500" />
                                <span className="text-2xl font-bold">{sampleData.performance.onTimeCompletion}%</span>
                                <span className="text-sm text-muted-foreground">On-time Completion</span>
                                <Progress value={sampleData.performance.onTimeCompletion} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Target className="h-5 w-5 text-yellow-500" />
                                <span className="text-2xl font-bold">{sampleData.performance.resourceUtilization}%</span>
                                <span className="text-sm text-muted-foreground">Resource Utilization</span>
                                <Progress value={sampleData.performance.resourceUtilization} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <TrendingUp className="h-5 w-5 text-purple-500" />
                                <span className="text-2xl font-bold">{sampleData.performance.qualityScore}%</span>
                                <span className="text-sm text-muted-foreground">Quality Score</span>
                                <Progress value={sampleData.performance.qualityScore} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts and Tables */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Efficiency Timeline */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Performance Timeline</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={sampleData.timelineData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="efficiency"
                                            stroke="#3b82f6"
                                            strokeWidth={2}
                                            name="Efficiency"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="target"
                                            stroke="#22c55e"
                                            strokeWidth={2}
                                            strokeDasharray="5 5"
                                            name="Target"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Resource Utilization */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Resource Utilization</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={sampleData.resourceMetrics}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="resource" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="utilized" fill="#3b82f6" name="Utilized" />
                                        <Bar dataKey="available" fill="#e2e8f0" name="Available" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Milestone Progress */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Milestone Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {sampleData.milestoneProgress.map((milestone, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">{milestone.name}</span>
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
                                        <div className="flex items-center gap-2">
                                            <Progress value={milestone.completion} className="h-2" />
                                            <span className="text-sm text-muted-foreground w-12">
                                                {milestone.completion}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Performance Details Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Detailed Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <div className="grid grid-cols-4 gap-4 p-4 border-b font-medium">
                                <div>Metric</div>
                                <div>Current</div>
                                <div>Target</div>
                                <div>Status</div>
                            </div>
                            <div className="divide-y">
                                {[
                                    { metric: "Labor Productivity", current: "87%", target: "85%", status: "above_target" },
                                    { metric: "Equipment Uptime", current: "92%", target: "95%", status: "near_target" },
                                    { metric: "Material Usage", current: "78%", target: "80%", status: "below_target" },
                                    { metric: "Quality Compliance", current: "95%", target: "90%", status: "above_target" }
                                ].map((item, index) => (
                                    <div key={index} className="grid grid-cols-4 gap-4 p-4 items-center">
                                        <div>{item.metric}</div>
                                        <div className="font-medium">{item.current}</div>
                                        <div className="text-muted-foreground">{item.target}</div>
                                        <div>
                                            <Badge
                                                variant={
                                                    item.status === 'above_target' ? 'success' :
                                                        item.status === 'near_target' ? 'warning' :
                                                            'destructive'
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


        </Layout>
    )
}

export default SitePerformanceReport