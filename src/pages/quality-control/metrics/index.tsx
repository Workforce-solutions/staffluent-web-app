import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import {
    Target,
    Activity,
    AlertTriangle,
    CheckCircle2,
    ArrowUp,
    ArrowDown
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const performanceData = [
    { month: 'Jan', score: 85, target: 80 },
    { month: 'Feb', score: 88, target: 80 },
    { month: 'Mar', score: 92, target: 80 },
]

const qualityMetrics = {
    overall_score: 92,
    defect_rate: 2.3,
    inspection_pass_rate: 95,
    rework_percentage: 3.1,
    categories: [
        { name: "Structural Quality", score: 94, trend: "up" },
        { name: "Material Quality", score: 88, trend: "up" },
        { name: "Workmanship", score: 91, trend: "down" },
        { name: "Safety Standards", score: 96, trend: "up" }
    ],
    recent_issues: [
        { id: 1, title: "Concrete Mix Ratio", severity: "medium", status: "resolved" },
        { id: 2, title: "Wall Alignment", severity: "low", status: "in_progress" },
        { id: 3, title: "Paint Finish", severity: "low", status: "resolved" }
    ]
}

export function QualityMetrics() {
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
                        <h2 className="text-2xl font-bold tracking-tight">Quality Metrics</h2>
                        <p className="text-muted-foreground">
                            Monitor and analyze quality performance indicators
                        </p>
                    </div>
                </div>

                {/* Overview Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Target className="h-5 w-5 text-blue-500" />
                                <span className="text-2xl font-bold">{qualityMetrics.overall_score}%</span>
                                <span className="text-sm text-muted-foreground">Overall Quality Score</span>
                                <Progress value={qualityMetrics.overall_score} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                <span className="text-2xl font-bold">{qualityMetrics.defect_rate}%</span>
                                <span className="text-sm text-muted-foreground">Defect Rate</span>
                                <Progress value={qualityMetrics.defect_rate * 10} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <span className="text-2xl font-bold">{qualityMetrics.inspection_pass_rate}%</span>
                                <span className="text-sm text-muted-foreground">Inspection Pass Rate</span>
                                <Progress value={qualityMetrics.inspection_pass_rate} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Activity className="h-5 w-5 text-red-500" />
                                <span className="text-2xl font-bold">{qualityMetrics.rework_percentage}%</span>
                                <span className="text-sm text-muted-foreground">Rework Rate</span>
                                <Progress value={qualityMetrics.rework_percentage * 10} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Performance Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quality Performance Trend</CardTitle>
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
                                        dataKey="score"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        name="Quality Score"
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

                {/* Category Metrics */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quality Categories</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {qualityMetrics.categories.map((category, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{category.name}</span>
                                                {category.trend === 'up' ? (
                                                    <ArrowUp className="h-4 w-4 text-green-500" />
                                                ) : (
                                                    <ArrowDown className="h-4 w-4 text-red-500" />
                                                )}
                                            </div>
                                            <span className="text-sm">{category.score}%</span>
                                        </div>
                                        <Progress value={category.score} className="h-2" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Quality Issues</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {qualityMetrics.recent_issues.map((issue) => (
                                    <div key={issue.id} className="flex justify-between items-center p-3 border rounded-lg">
                                        <div>
                                            <p className="font-medium">{issue.title}</p>
                                            <Badge
                                                variant={
                                                    issue.severity === 'high' ? 'destructive' :
                                                        issue.severity === 'medium' ? 'warning' :
                                                            'secondary'
                                                }
                                            >
                                                {issue.severity}
                                            </Badge>
                                        </div>
                                        <Badge
                                            variant={issue.status === 'resolved' ? 'success' : 'warning'}
                                        >
                                            {issue.status.replace('_', ' ')}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </Layout.Body>


        </Layout>
    )
}

export default QualityMetrics