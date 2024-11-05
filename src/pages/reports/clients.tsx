import { Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DateRangePicker } from "@/components/ui/date-range-picker"
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Download,
    Users,
    UserPlus,
    UserMinus,
    TrendingUp,
} from 'lucide-react'
import { useState } from 'react'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    ArcElement
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
)

export default function ClientAnalytics() {
    const [dateRange, setDateRange] = useState({ from: undefined, to: undefined })

    const clientGrowthData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Total Clients',
                data: [150, 180, 220, 280, 320, 350],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    }

    const clientTypeData = {
        labels: ['Corporate', 'Small Business', 'Individual'],
        datasets: [{
            data: [45, 35, 20],
            backgroundColor: [
                'rgba(54, 162, 235, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
            ],
        }],
    }

    const clientActivityData = {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
            label: 'Active Clients',
            data: [250, 280, 310, 350],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
        }],
    }

    return (
        <Layout>
            <Layout.Header className="min-h-fit border-b">
                <div className="flex w-full flex-col">
                    <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
                        <ThemeSwitch />
                        <UserNav />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-medium">Client Analytics</h2>
                            <p className="text-sm text-muted-foreground">
                                Monitor client growth and engagement metrics
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Select defaultValue="thisMonth">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select period" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="thisMonth">This Month</SelectItem>
                                    <SelectItem value="lastMonth">Last Month</SelectItem>
                                    <SelectItem value="thisYear">This Year</SelectItem>
                                </SelectContent>
                            </Select>
                            <DateRangePicker
                                value={dateRange}
                                // @ts-ignore
                                onValueChange={setDateRange}
                            />
                            <Button variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Export
                            </Button>
                        </div>
                    </div>
                </div>
            </Layout.Header>

            <Layout.Body className="space-y-6 p-6">
                {/* Stats Overview */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,432</div>
                            <p className="text-xs text-muted-foreground">+8% from last month</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">New Clients</CardTitle>
                            <UserPlus className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">48</div>
                            <p className="text-xs text-muted-foreground">This month</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
                            <UserMinus className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2.4%</div>
                            <p className="text-xs text-muted-foreground">-0.5% from last month</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">95%</div>
                            <p className="text-xs text-muted-foreground">+2% from last month</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Client Growth Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Line
                                data={clientGrowthData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    // @ts-ignore
                                    height: 300,
                                }}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Client Types</CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <div style={{ width: '300px', height: '300px' }}>
                                <Doughnut
                                    data={clientTypeData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Quarterly Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Bar
                            data={clientActivityData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                // @ts-ignore
                                height: 300,
                            }}
                        />
                    </CardContent>
                </Card>
            </Layout.Body>
        </Layout>
    )
}