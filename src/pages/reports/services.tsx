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
import { Download, TrendingUp, Users, Clock, Target } from 'lucide-react'
import { useState } from 'react'
import { Line, Bar, Pie } from 'react-chartjs-2'
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

export default function ServiceAnalytics() {
    const [dateRange, setDateRange] = useState({ from: undefined, to: undefined })

    // Sample data for charts
    const serviceUsageData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Service Usage',
                data: [65, 78, 66, 84, 71, 89],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    }

    const categoryDistributionData = {
        labels: ['Maintenance', 'Repair', 'Installation', 'Consultation'],
        datasets: [{
            data: [45, 25, 20, 10],
            backgroundColor: [
                'rgba(54, 162, 235, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
            ],
        }],
    }

    const revenueByServiceData = {
        labels: ['Service A', 'Service B', 'Service C', 'Service D', 'Service E'],
        datasets: [{
            label: 'Revenue',
            data: [12000, 19000, 15000, 21000, 16000],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
        }],
    }

    // @ts-ignore
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
                            <h2 className="text-lg font-medium">Service Analytics</h2>
                            <p className="text-sm text-muted-foreground">
                                Track and analyze service performance
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
                            <CardTitle className="text-sm font-medium">Total Services</CardTitle>
                            <Target className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">248</div>
                            <p className="text-xs text-muted-foreground">+12% from last month</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,432</div>
                            <p className="text-xs text-muted-foreground">+8% from last month</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2.4h</div>
                            <p className="text-xs text-muted-foreground">-15min from avg</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+15%</div>
                            <p className="text-xs text-muted-foreground">Year over year</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Service Usage Trends</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Line
                                data={serviceUsageData}
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
                            <CardTitle>Category Distribution</CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <div style={{ width: '300px', height: '300px' }}>
                                <Pie
                                    data={categoryDistributionData}
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
                        <CardTitle>Revenue by Service</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Bar
                            data={revenueByServiceData}
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