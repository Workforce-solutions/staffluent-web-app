import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Download, RefreshCcw } from 'lucide-react'
import { useState } from 'react'
import {Layout} from "../../components/custom/layout";
import ThemeSwitch from "../../components/theme-switch";
import {UserNav} from "../../components/user-nav";

const mockData = {
    completionTrend: [
        { date: '2024-01', completed: 45, total: 52 },
        { date: '2024-02', completed: 48, total: 55 },
        { date: '2024-03', completed: 52, total: 58 }
    ],
    performanceMetrics: [
        { name: 'Response Time', value: 85 },
        { name: 'Completion Rate', value: 92 },
        { name: 'First-Time Fix', value: 78 },
        { name: 'Customer Satisfaction', value: 94 }
    ],
    costAnalysis: [
        { category: 'Labor', cost: 12500 },
        { category: 'Materials', cost: 8500 },
        { category: 'Equipment', cost: 3500 }
    ],
    timeDistribution: [
        { type: 'Repairs', hours: 145 },
        { type: 'Maintenance', hours: 210 },
        { type: 'Installation', hours: 95 },
        { type: 'Inspection', hours: 60 }
    ]
}

export default function WorkOrderReports() {
    const [timeframe, setTimeframe] = useState('month')

    return (
        <Layout>
            <Layout.Header className="border-b">
                <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body className="space-y-8 pb-8">
                <div className="space-y-6">
            {/* Header Controls */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Reports & Analytics</h2>
                    <p className="text-muted-foreground">Performance insights and metrics</p>
                </div>
                <div className="flex items-center gap-4">
                    <Select value={timeframe} onValueChange={setTimeframe}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="week">Last Week</SelectItem>
                            <SelectItem value="month">Last Month</SelectItem>
                            <SelectItem value="quarter">Last Quarter</SelectItem>
                            <SelectItem value="year">Last Year</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                    <Button variant="outline">
                        <RefreshCcw className="h-4 w-4 mr-2" />
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-1">
                            <p className="text-muted-foreground">Total Work Orders</p>
                            <p className="text-3xl font-bold">165</p>
                            <p className="text-sm text-green-600">↑ 12% from last period</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-1">
                            <p className="text-muted-foreground">Completion Rate</p>
                            <p className="text-3xl font-bold">92%</p>
                            <p className="text-sm text-green-600">↑ 5% from last period</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-1">
                            <p className="text-muted-foreground">Avg Response Time</p>
                            <p className="text-3xl font-bold">2.4h</p>
                            <p className="text-sm text-red-600">↓ 0.5h from target</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-1">
                            <p className="text-muted-foreground">Customer Satisfaction</p>
                            <p className="text-3xl font-bold">4.8</p>
                            <p className="text-sm text-green-600">↑ 0.2 from last period</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Completion Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={mockData.completionTrend}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="completed" stroke="#2563eb" />
                                    <Line type="monotone" dataKey="total" stroke="#64748b" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Cost Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={mockData.costAnalysis}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="category" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="cost" fill="#2563eb" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Time Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={mockData.timeDistribution}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="type" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="hours" fill="#2563eb" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Performance Metrics */}
            <Card>
                <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {mockData.performanceMetrics.map((metric) => (
                            <div key={metric.name} className="space-y-2">
                                <p className="text-muted-foreground">{metric.name}</p>
                                <p className="text-2xl font-bold">{metric.value}%</p>
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