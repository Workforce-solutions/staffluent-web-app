import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Search,
    Filter,
    AlertCircle,
    ThermometerSun,
    Clock,
    Activity,
    Shield,
    HardHat
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Cell, Pie, PieChart, ResponsiveContainer, Legend } from 'recharts'

// Types
interface SiteAlert {
    id: number
    siteName: string
    type: 'safety' | 'weather' | 'equipment' | 'progress'
    severity: 'low' | 'medium' | 'high'
    message: string
    timestamp: string
}

interface SiteMetric {
    id: number
    siteName: string
    safetyScore: number
    weatherCondition: string
    temperature: number
    progress: number
    activeWorkers: number
    activeMachinery: number
    lastIncident: string | null
    alerts: number
}

// Demo data
const alertsData: SiteAlert[] = [
    {
        id: 1,
        siteName: "Downtown Plaza Project",
        type: "weather",
        severity: "high",
        message: "Strong winds expected - Review crane operations",
        timestamp: "10 minutes ago"
    },
    {
        id: 2,
        siteName: "Tech Park Development",
        type: "safety",
        severity: "medium",
        message: "PPE compliance below threshold in Zone B",
        timestamp: "30 minutes ago"
    },
    // Add more alerts...
]

const metricsData: SiteMetric[] = [
    {
        id: 1,
        siteName: "Downtown Plaza Project",
        safetyScore: 92,
        weatherCondition: "Clear",
        temperature: 72,
        progress: 45,
        activeWorkers: 28,
        activeMachinery: 5,
        lastIncident: null,
        alerts: 2
    },
    // Add more metrics...
]

const SiteMonitoring = () => {
    const AlertCard = ({ alert }: { alert: SiteAlert }) => (
        <Card>
            <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-medium">{alert.siteName}</h3>
                        <p className="text-sm text-muted-foreground">{alert.type.charAt(0).toUpperCase() + alert.type.slice(1)} Alert</p>
                    </div>
                    <Badge variant={
                        alert.severity === 'high' ? 'destructive' :
                            alert.severity === 'medium' ? 'warning' :
                                'default'
                    }>
                        {alert.severity.toUpperCase()}
                    </Badge>
                </div>

                <div className="space-y-4">
                    <p className="text-sm">{alert.message}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        {alert.timestamp}
                    </div>
                </div>
            </CardContent>
        </Card>
    )

    const MetricCard = ({ metric }: { metric: SiteMetric }) => (
        <Card>
            <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-medium">{metric.siteName}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <ThermometerSun className="h-4 w-4 mr-2" />
                            {metric.weatherCondition}, {metric.temperature}°F
                        </div>
                    </div>
                    {metric.alerts > 0 && (
                        <Badge variant="warning">
                            {metric.alerts} Active Alerts
                        </Badge>
                    )}
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span>Safety Score</span>
                            <span>{metric.safetyScore}%</span>
                        </div>
                        <Progress value={metric.safetyScore} className="h-2" />
                    </div>

                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{metric.progress}%</span>
                        </div>
                        <Progress value={metric.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="text-sm text-muted-foreground">Active Workers</div>
                            <div className="text-lg font-medium">{metric.activeWorkers}</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-sm text-muted-foreground">Active Machinery</div>
                            <div className="text-lg font-medium">{metric.activeMachinery}</div>
                        </div>
                    </div>

                    <div className="pt-4 border-t">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Last Incident:</span>
                            <span className="font-medium">
                {metric.lastIncident || 'No incidents reported'}
            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )

    return (
        <Layout>
            <Layout.Header>
                <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body className="space-y-8">
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Site Monitoring</h2>
                        <p className="text-muted-foreground">
                            Real-time monitoring and alerts for all sites
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                        <Input
                            placeholder="Search alerts..."
                            className="w-full sm:w-64"
                            type="search"
                            // @ts-ignore
                            icon={<Search className="h-4 w-4" />}
                        />
                        <Button variant="outline">
                            <Filter className="h-4 w-4 mr-2" />
                            Filters
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{alertsData.length}</div>
                            <p className="text-xs text-muted-foreground">
                                Requiring attention
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Average Safety Score</CardTitle>
                            <Shield className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">94%</div>
                            <p className="text-xs text-muted-foreground">
                                Across all sites
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Workers</CardTitle>
                            <HardHat className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {metricsData.reduce((acc, site) => acc + site.activeWorkers, 0)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Currently on site
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Activity Level</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">High</div>
                            <p className="text-xs text-muted-foreground">
                                Current status
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Alerts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {alertsData.map(alert => (
                                    <AlertCard key={alert.id} alert={alert} />
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Alert Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={[
                                                { name: 'Safety', value: 5, color: '#ef4444' },
                                                { name: 'Weather', value: 3, color: '#eab308' },
                                                { name: 'Equipment', value: 2, color: '#3b82f6' },
                                                { name: 'Progress', value: 1, color: '#22c55e' }
                                            ]}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {alertsData.map((_, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={['#ef4444', '#eab308', '#3b82f6', '#22c55e'][index % 4]}
                                                />
                                            ))}
                                        </Pie>
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {metricsData.map(metric => (
                        <MetricCard key={metric.id} metric={metric} />
                    ))}
                </div>
            </Layout.Body>
        </Layout>
    )
}

export default SiteMonitoring