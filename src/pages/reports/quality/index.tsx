import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend
} from 'recharts'
import { Progress } from '@/components/ui/progress'
import { HardHat, AlertCircle, ClipboardCheck, TrendingUp } from 'lucide-react'

const qualityTrendData = [
    { month: 'Jan', score: 85, incidents: 3, inspections: 45 },
    { month: 'Feb', score: 88, incidents: 2, inspections: 48 },
    { month: 'Mar', score: 86, incidents: 4, inspections: 42 },
    { month: 'Apr', score: 90, incidents: 1, inspections: 50 },
    { month: 'May', score: 92, incidents: 1, inspections: 52 },
    { month: 'Jun', score: 91, incidents: 2, inspections: 49 }
]

const siteComplianceData = [
    { site: 'Downtown Plaza', score: 94, violations: 2, inspections: 32 },
    { site: 'Tech Park', score: 88, violations: 4, inspections: 28 },
    { site: 'Riverside Complex', score: 92, violations: 1, inspections: 30 },
    { site: 'Harbor Project', score: 86, violations: 5, inspections: 25 }
]

const QualityMetricsReports = () => {
    return (
        <Layout>
            <Layout.Header>
                <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Quality Metrics Report</h2>
                    <p className="text-muted-foreground">
                        Comprehensive quality performance analysis across all sites
                    </p>
                </div>

                {/* Overview Metrics */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Overall Quality Score</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">90.2%</div>
                            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Safety Compliance</CardTitle>
                            <HardHat className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">95%</div>
                            <p className="text-xs text-muted-foreground">Target: 98%</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Quality Incidents</CardTitle>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">Last 30 days</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Inspections</CardTitle>
                            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">142</div>
                            <p className="text-xs text-muted-foreground">Completed this month</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quality Score Trend */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quality Score Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={qualityTrendData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#2563eb"
                                        name="Quality Score"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="incidents"
                                        stroke="#dc2626"
                                        name="Incidents"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Site Compliance Overview */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Site Compliance Scores</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {siteComplianceData.map((site) => (
                                    <div key={site.site} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium">{site.site}</span>
                                            <span>{site.score}%</span>
                                        </div>
                                        <Progress value={site.score} className="h-2" />
                                        <div className="flex justify-between text-xs text-muted-foreground">
                                            <span>{site.violations} violations</span>
                                            <span>{site.inspections} inspections</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Inspections Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={siteComplianceData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="site" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar
                                            dataKey="inspections"
                                            fill="#2563eb"
                                            name="Inspections"
                                        />
                                        <Bar
                                            dataKey="violations"
                                            fill="#dc2626"
                                            name="Violations"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </Layout.Body>
        </Layout>
    )
}

export default QualityMetricsReports