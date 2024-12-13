import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts'
import { Progress } from '@/components/ui/progress'
import { Wrench, Clock, AlertTriangle, Battery, Timer } from 'lucide-react'
import {Legend} from "chart.js";

const usageData = [
    { month: 'Jan', utilization: 75, maintenance: 15, downtime: 10 },
    { month: 'Feb', utilization: 78, maintenance: 12, downtime: 10 },
    { month: 'Mar', utilization: 80, maintenance: 10, downtime: 10 },
    { month: 'Apr', utilization: 82, maintenance: 8, downtime: 10 },
    { month: 'May', utilization: 85, maintenance: 10, downtime: 5 },
    { month: 'Jun', utilization: 83, maintenance: 12, downtime: 5 }
]

const equipmentStatusData = [
    { name: 'Operational', value: 45, color: '#22c55e' },
    { name: 'Maintenance', value: 12, color: '#eab308' },
    { name: 'Offline', value: 8, color: '#dc2626' }
]

const equipmentMetrics = [
    {
        id: 1,
        name: "Excavator XC-100",
        type: "Heavy Equipment",
        utilization: 85,
        runtime: "245 hours",
        status: "operational",
        nextService: "15 days",
        alerts: 0
    },
    {
        id: 2,
        name: "Crane RT-200",
        type: "Heavy Equipment",
        utilization: 72,
        runtime: "180 hours",
        status: "maintenance",
        nextService: "2 days",
        alerts: 2
    },
    // Add more equipment...
]

const EquipmentUsageReport = () => {
    // @ts-ignore
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
                    <h2 className="text-2xl font-bold tracking-tight">Equipment Usage Report</h2>
                    <p className="text-muted-foreground">
                        Detailed analysis of equipment utilization and performance
                    </p>
                </div>

                {/* Overview Metrics */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Average Utilization</CardTitle>
                            <Timer className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">83%</div>
                            <p className="text-xs text-muted-foreground">+5% from last month</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Runtime Hours</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,245</div>
                            <p className="text-xs text-muted-foreground">This month</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Maintenance Alerts</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">8</div>
                            <p className="text-xs text-muted-foreground">Require attention</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Equipment Health</CardTitle>
                            <Battery className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">92%</div>
                            <p className="text-xs text-muted-foreground">Overall condition</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Usage Trend */}
                <Card>
                    <CardHeader>
                        <CardTitle>Equipment Usage Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={usageData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    {/*// @ts-ignore*/}
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="utilization"
                                        stroke="#2563eb"
                                        name="Utilization %"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="maintenance"
                                        stroke="#eab308"
                                        name="Maintenance %"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="downtime"
                                        stroke="#dc2626"
                                        name="Downtime %"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Equipment Status */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Equipment Status Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={equipmentStatusData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {equipmentStatusData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        {/*// @ts-ignore*/}
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Equipment Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {equipmentMetrics.map((equipment) => (
                                    <div key={equipment.id} className="space-y-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="font-medium">{equipment.name}</div>
                                                <div className="text-sm text-muted-foreground">{equipment.type}</div>
                                            </div>
                                            <Badge variant={
                                                equipment.status === 'operational' ? 'success' :
                                                    equipment.status === 'maintenance' ? 'warning' :
                                                        'destructive'
                                            }>
                                                {equipment.status}
                                            </Badge>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-sm">
                                                <span>Utilization</span>
                                                <span>{equipment.utilization}%</span>
                                            </div>
                                            <Progress value={equipment.utilization} className="h-2" />
                                        </div>
                                        <div className="grid grid-cols-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                <span>{equipment.runtime}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Wrench className="h-4 w-4 text-muted-foreground" />
                                                <span>Service in {equipment.nextService}</span>
                                            </div>
                                        </div>
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

export default EquipmentUsageReport