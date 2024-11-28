import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UserNav } from '@/components/user-nav'
import { AlertCircle, Clock, DollarSign, Download, Users } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

// Overtime Dashboard Component
const OvertimeDashboard = () => {
  const monthlyData = [
    { month: 'Jan', hours: 45 },
    { month: 'Feb', hours: 52 },
    { month: 'Mar', hours: 38 },
    { month: 'Apr', hours: 62 },
    { month: 'May', hours: 55 },
    // ... more data
  ]

  const departmentData = [
    { department: 'IT', hours: 120 },
    { department: 'Sales', hours: 85 },
    { department: 'Support', hours: 95 },
    { department: 'Operations', hours: 150 },
  ]

  return (
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>
      <div className='space-y-6 px-5'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-3xl font-bold tracking-tight'>
              Overtime Dashboard
            </h2>
            <p className='text-muted-foreground'>
              Overview of overtime hours and costs
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <Select defaultValue='thisMonth'>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select period' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='thisMonth'>This Month</SelectItem>
                <SelectItem value='lastMonth'>Last Month</SelectItem>
                <SelectItem value='thisQuarter'>This Quarter</SelectItem>
                <SelectItem value='thisYear'>This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant='outline'>
              <Download className='mr-2 h-4 w-4' />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className='grid gap-4 md:grid-cols-4'>
          <Card>
            <CardContent className='pt-6'>
              <div className='flex items-center justify-between space-y-1'>
                <p className='text-sm font-medium leading-none'>Total Hours</p>
                <Clock className='h-4 w-4 text-muted-foreground' />
              </div>
              <div className='flex items-center'>
                <div className='text-2xl font-bold'>326.5</div>
                <div className='ml-2 text-sm text-green-500'>+12.3%</div>
              </div>
              <p className='text-xs text-muted-foreground'>vs last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='pt-6'>
              <div className='flex items-center justify-between space-y-1'>
                <p className='text-sm font-medium leading-none'>Total Cost</p>
                <DollarSign className='h-4 w-4 text-muted-foreground' />
              </div>
              <div className='flex items-center'>
                <div className='text-2xl font-bold'>$4,892</div>
                <div className='ml-2 text-sm text-red-500'>-2.5%</div>
              </div>
              <p className='text-xs text-muted-foreground'>vs last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='pt-6'>
              <div className='flex items-center justify-between space-y-1'>
                <p className='text-sm font-medium leading-none'>Employees</p>
                <Users className='h-4 w-4 text-muted-foreground' />
              </div>
              <div className='flex items-center'>
                <div className='text-2xl font-bold'>45</div>
                <div className='ml-2 text-sm text-green-500'>+5</div>
              </div>
              <p className='text-xs text-muted-foreground'>with overtime</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='pt-6'>
              <div className='flex items-center justify-between space-y-1'>
                <p className='text-sm font-medium leading-none'>
                  Avg Hours/Employee
                </p>
                <AlertCircle className='h-4 w-4 text-muted-foreground' />
              </div>
              <div className='flex items-center'>
                <div className='text-2xl font-bold'>7.25</div>
                <div className='ml-2 text-sm text-yellow-500'>+0.5</div>
              </div>
              <p className='text-xs text-muted-foreground'>per week</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className='grid gap-4 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Monthly Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='h-[300px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='month' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type='monotone' dataKey='hours' stroke='#8884d8' />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Department Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='h-[300px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='department' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='hours' fill='#8884d8' />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default OvertimeDashboard
