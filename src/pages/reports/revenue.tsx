import { Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Download,
  DollarSign,
  TrendingUp,
  ChevronUp,
  ChevronDown,
  CreditCard,
} from 'lucide-react'
import { useState } from 'react'
import { Line, Bar } from 'react-chartjs-2'
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
} from 'chart.js'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function RevenueReport() {
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined })

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [65000, 78000, 86000, 94000, 91000, 99000],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Target',
        data: [70000, 75000, 80000, 85000, 90000, 95000],
        borderColor: 'rgba(255, 99, 132, 0.5)',
        borderDash: [5, 5],
        tension: 0.1,
      },
    ],
  }

  const revenueByServiceData = {
    labels: [
      'Equipment Maintenance',
      'Repairs',
      'Installation',
      'Consultation',
      'Training',
    ],
    datasets: [
      {
        label: 'Revenue by Service',
        data: [45000, 35000, 28000, 22000, 18000],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  }

  const topServices = [
    { service: 'Equipment Maintenance', revenue: 45000, growth: 12.5 },
    { service: 'Emergency Repairs', revenue: 35000, growth: 8.2 },
    { service: 'Installation Services', revenue: 28000, growth: -2.3 },
    { service: 'Technical Consultation', revenue: 22000, growth: 15.7 },
    { service: 'Staff Training', revenue: 18000, growth: 5.1 },
  ]

  return (
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-6 '>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Revenue Report
            </h2>
            <p className='text-sm text-muted-foreground'>
              Analyze revenue streams and financial performance
            </p>
          </div>
          <div className='flex items-center space-x-2'>
            <Select defaultValue='thisMonth'>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select period' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='thisMonth'>This Month</SelectItem>
                <SelectItem value='lastMonth'>Last Month</SelectItem>
                <SelectItem value='thisYear'>This Year</SelectItem>
              </SelectContent>
            </Select>
            <DateRangePicker
              value={dateRange}
              // @ts-ignore
              onValueChange={setDateRange}
            />
            <Button variant='outline'>
              <Download className='mr-2 h-4 w-4' />
              Export
            </Button>
          </div>
        </div>
        {/* Stats Overview */}
        <div className='grid gap-4 md:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Revenue
              </CardTitle>
              <DollarSign className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>$148,000</div>
              <p className='text-xs text-muted-foreground'>
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Average Order Value
              </CardTitle>
              <CreditCard className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>$1,248</div>
              <p className='text-xs text-muted-foreground'>
                +5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Revenue Target
              </CardTitle>
              <TrendingUp className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>95%</div>
              <p className='text-xs text-muted-foreground'>Of monthly goal</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Year Growth</CardTitle>
              <TrendingUp className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>18.2%</div>
              <p className='text-xs text-muted-foreground'>Year over year</p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <Line
              data={revenueData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                // @ts-ignore
                height: 400,
              }}
            />
          </CardContent>
        </Card>

        <div className='grid gap-4 md:grid-cols-2'>
          {/* Revenue by Service */}
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

          {/* Top Performing Services */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Services</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead className='text-right'>Revenue</TableHead>
                    <TableHead className='text-right'>Growth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topServices.map((service) => (
                    <TableRow key={service.service}>
                      <TableCell>{service.service}</TableCell>
                      <TableCell className='text-right'>
                        ${service.revenue.toLocaleString()}
                      </TableCell>
                      <TableCell className='text-right'>
                        <span
                          className={`flex items-center justify-end ${
                            service.growth > 0
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {service.growth > 0 ? (
                            <ChevronUp className='mr-1 h-4 w-4' />
                          ) : (
                            <ChevronDown className='mr-1 h-4 w-4' />
                          )}
                          {Math.abs(service.growth)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </Layout.Body>
    </Layout>
  )
}
