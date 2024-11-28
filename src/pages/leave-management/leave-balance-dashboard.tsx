import { Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  PieChart,
  LineChart,
  Line,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Download, Users, Calendar, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'

const LeaveBalanceDashboard = () => {
  // Sample data - replace with actual API data
  const departmentData = [
    { name: 'IT', value: 35 },
    { name: 'HR', value: 20 },
    { name: 'Sales', value: 25 },
    { name: 'Marketing', value: 15 },
  ]

  const leaveUsageTrend = [
    { month: 'Jan', annual: 15, sick: 5, personal: 2 },
    { month: 'Feb', annual: 18, sick: 7, personal: 3 },
    { month: 'Mar', annual: 20, sick: 4, personal: 1 },
    { month: 'Apr', annual: 25, sick: 6, personal: 4 },
    { month: 'May', annual: 22, sick: 8, personal: 2 },
    { month: 'Jun', annual: 30, sick: 5, personal: 3 },
  ]

  const employeeBalances = [
    {
      id: 1,
      name: 'John Doe',
      department: 'IT',
      annual: 15,
      sick: 8,
      personal: 3,
      status: 'active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      department: 'HR',
      annual: 12,
      sick: 10,
      personal: 2,
      status: 'on-leave',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      department: 'Sales',
      annual: 18,
      sick: 5,
      personal: 4,
      status: 'active',
    },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Leave Balance Dashboard
            </h2>
            <p className='text-muted-foreground'>
              Overview of company-wide leave balances and trends
            </p>
          </div>
          <Button variant='outline'>
            <Download className='mr-2 h-4 w-4' />
            Export Report
          </Button>
        </div>
        {/* Summary Cards */}
        <div className='grid gap-6 md:grid-cols-3'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Users className='h-4 w-4' />
                Total Employees on Leave
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold'>24</div>
              <p className='text-sm text-muted-foreground'>+2 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Calendar className='h-4 w-4' />
                Average Leave Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold'>12.5 days</div>
              <p className='text-sm text-muted-foreground'>
                Across all leave types
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <TrendingUp className='h-4 w-4' />
                Leave Utilization Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold'>68%</div>
              <p className='text-sm text-muted-foreground'>
                +5% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className='grid gap-6 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Department-wise Leave Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='h-[300px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Pie
                      data={departmentData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey='value'
                    >
                      {departmentData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Leave Usage Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='h-[300px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart data={leaveUsageTrend}>
                    <XAxis dataKey='month' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type='monotone' dataKey='annual' stroke='#0088FE' />
                    <Line type='monotone' dataKey='sick' stroke='#00C49F' />
                    <Line type='monotone' dataKey='personal' stroke='#FFBB28' />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Employee Balance Table */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0'>
            <CardTitle>Employee Leave Balances</CardTitle>
            <div className='flex gap-2'>
              <Select defaultValue='all'>
                <SelectTrigger className='w-[150px]'>
                  <SelectValue placeholder='Department' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Departments</SelectItem>
                  <SelectItem value='it'>IT</SelectItem>
                  <SelectItem value='hr'>HR</SelectItem>
                  <SelectItem value='sales'>Sales</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue='all'>
                <SelectTrigger className='w-[150px]'>
                  <SelectValue placeholder='Status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Status</SelectItem>
                  <SelectItem value='active'>Active</SelectItem>
                  <SelectItem value='on-leave'>On Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Annual Leave</TableHead>
                  <TableHead>Sick Leave</TableHead>
                  <TableHead>Personal Leave</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employeeBalances.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className='font-medium'>
                      {employee.name}
                    </TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.annual} days</TableCell>
                    <TableCell>{employee.sick} days</TableCell>
                    <TableCell>{employee.personal} days</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          employee.status === 'active' ? 'default' : 'secondary'
                        }
                      >
                        {employee.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  )
}

export default LeaveBalanceDashboard
