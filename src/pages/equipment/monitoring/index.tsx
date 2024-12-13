import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { 
  Battery,
  Clock,
  Timer,
  Activity,
  AlertCircle,
  Gauge,
  Filter
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'

// Types
interface UsageData {
  id: number
  equipment: string
  type: string
  currentOperator: string | null
  status: 'active' | 'idle' | 'maintenance'
  hoursToday: number
  utilization: number
  fuelLevel: number
  location: string
  alerts: string[]
  dailyUsage: Array<{
    hour: number
    usage: number
  }>
}

// Demo data
const usageData: UsageData[] = [
  {
    id: 1,
    equipment: "Excavator XC-200",
    type: "Heavy Equipment",
    currentOperator: "John Operator",
    status: "active",
    hoursToday: 6.5,
    utilization: 85,
    fuelLevel: 75,
    location: "Downtown Plaza Site",
    alerts: [],
    dailyUsage: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      usage: Math.floor(Math.random() * 100)
    }))
  },
  {
    id: 2,
    equipment: "Crane RT-300",
    type: "Heavy Equipment",
    currentOperator: "Sarah Crane",
    status: "active",
    hoursToday: 4.5,
    utilization: 92,
    fuelLevel: 60,
    location: "Tech Park Site",
    alerts: ["Maintenance due in 48 hours"],
    dailyUsage: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      usage: Math.floor(Math.random() * 100)
    }))
  },
  {
    id: 3,
    equipment: "Concrete Mixer CM-100",
    type: "Construction Equipment",
    currentOperator: null,
    status: "idle",
    hoursToday: 2.0,
    utilization: 45,
    fuelLevel: 90,
    location: "Riverside Complex",
    alerts: [],
    dailyUsage: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      usage: Math.floor(Math.random() * 100)
    }))
  }
]

const monthlyUsage = [
  { month: 'Jan', totalHours: 450, utilization: 75 },
  { month: 'Feb', totalHours: 480, utilization: 80 },
  { month: 'Mar', totalHours: 520, utilization: 85 },
  { month: 'Apr', totalHours: 490, utilization: 82 },
  { month: 'May', totalHours: 510, utilization: 84 },
  { month: 'Jun', totalHours: 540, utilization: 88 }
]

const UsageMonitoring = () => {
  const UsageCard = ({ data }: { data: UsageData }) => (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-medium">{data.equipment}</h3>
            <p className="text-sm text-muted-foreground">{data.type}</p>
          </div>
          <Badge variant={
            data.status === 'active' ? 'success' :
            data.status === 'idle' ? 'secondary' :
            'destructive'
          }>
            {data.status}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Utilization</span>
                <span>{data.utilization}%</span>
              </div>
              <Progress value={data.utilization} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Fuel Level</span>
                <span>{data.fuelLevel}%</span>
              </div>
              <Progress value={data.fuelLevel} className="h-2" />
            </div>
          </div>

          <div className="h-[100px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.dailyUsage}>
                <Line 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="#2563eb" 
                  strokeWidth={2} 
                  dot={false}
                />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{data.hoursToday} hours today</span>
              </div>
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{data.currentOperator || 'No operator'}</span>
              </div>
            </div>
            {data.alerts.length > 0 && (
              <div className="space-y-1">
                {data.alerts.map((alert, index) => (
                  <div key={index} className="flex items-center text-sm text-yellow-600">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <span>{alert}</span>
                  </div>
                ))}
              </div>
            )}
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
            <h2 className="text-2xl font-bold tracking-tight">Usage Monitoring</h2>
            <p className="text-muted-foreground">
              Real-time equipment usage tracking and analytics
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Equipment</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {usageData.filter(d => d.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Currently in use
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
              <Timer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {usageData.reduce((sum, d) => sum + d.hoursToday, 0).toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">
                Hours today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
              <Gauge className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">84%</div>
              <p className="text-xs text-muted-foreground">
                Fleet average
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fuel Status</CardTitle>
              <Battery className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75%</div>
              <p className="text-xs text-muted-foreground">
                Average fuel level
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Usage Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyUsage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    yAxisId="left"
                    dataKey="totalHours" 
                    fill="#2563eb" 
                    name="Total Hours"
                  />
                  <Bar 
                    yAxisId="right"
                    dataKey="utilization" 
                    fill="#22c55e" 
                    name="Utilization %"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {usageData.map(data => (
            <UsageCard key={data.id} data={data} />
          ))}
        </div>
      </Layout.Body>
    </Layout>
  )
}

export default UsageMonitoring