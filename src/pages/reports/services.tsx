/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { UserNav } from '@/components/user-nav'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetServiceAnalyticsQuery } from '@/services/adminAnalyticsApi'
import { Clock, Download, Target, TrendingUp, Users } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'
import { DateRange } from 'react-day-picker'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Register Chart.js components
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

// Simple wrapper component to handle chart cleanup

const ChartWrapper = ({ children }: any) => {
  useEffect(() => {
    return () => {
      if (children.props.id) {
        const chart = ChartJS.getChart(children.props.id)
        if (chart) {
          chart.destroy()
        }
      }
    }
  }, [children])

  return children
}

export default function ServiceAnalytics() {
  const shortCode = useShortCode()
  const [period, setPeriod] = useState('thisMonth')
  const [dateRange, setDateRange] = useState<DateRange>()

  const { data, isLoading } = useGetServiceAnalyticsQuery({
    venue_short_code: shortCode,
    date_from: dateRange?.from?.toISOString(),
    date_to: dateRange?.to?.toISOString(),
  })

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
              Service Analytics
            </h2>
            <p className='text-sm text-muted-foreground'>
              Track and analyze service performance
            </p>
          </div>
          <div className='flex items-center space-x-2'>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select period' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='thisMonth'>This Month</SelectItem>
                <SelectItem value='lastMonth'>Last Month</SelectItem>
                <SelectItem value='thisYear'>This Year</SelectItem>
              </SelectContent>
            </Select>
            <DateRangePicker value={dateRange} onValueChange={setDateRange} />
            <Button variant='outline'>
              <Download className='mr-2 h-4 w-4' />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        {isLoading ? (
          <div className='grid gap-4 md:grid-cols-4'>
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                  <Skeleton className='h-5 w-[120px]' />
                  <Skeleton className='h-4 w-4 rounded' />
                </CardHeader>
                <CardContent>
                  <Skeleton className='h-8 w-[100px]' />
                  <Skeleton className='mt-1 h-4 w-[140px]' />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className='grid gap-4 md:grid-cols-4'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total Services
                </CardTitle>
                <Target className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {data?.stats.total_services}
                </div>
                <p className='text-xs text-muted-foreground'>
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Active Clients
                </CardTitle>
                <Users className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {data?.stats.active_clients}
                </div>
                <p className='text-xs text-muted-foreground'>
                  +8% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Avg Duration
                </CardTitle>
                <Clock className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {data?.stats.avg_duration}h
                </div>
                <p className='text-xs text-muted-foreground'>-15min from avg</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Growth Rate
                </CardTitle>
                <TrendingUp className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {data?.stats.growth_rate}%
                </div>
                <p className='text-xs text-muted-foreground'>Year over year</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Charts */}
        {isLoading ? (
          <div className='grid gap-4 md:grid-cols-2'>
            <Card>
              <CardHeader>
                <Skeleton className='h-8 w-[200px]' />
              </CardHeader>
              <CardContent>
                <Skeleton className='h-[300px] w-full' />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Skeleton className='h-8 w-[200px]' />
              </CardHeader>
              <CardContent className='flex justify-center'>
                <Skeleton className='h-[300px] w-[300px] rounded-full' />
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            <div className='grid gap-4 md:grid-cols-2'>
              <Card>
                <CardHeader>
                  <CardTitle>Service Usage Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartWrapper>
                    <Line
                      id='service-usage'
                      data={data?.charts.service_usage as any}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        //@ts-ignore
                        height: 300,
                      }}
                    />
                  </ChartWrapper>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category Distribution</CardTitle>
                </CardHeader>
                <CardContent className='flex justify-center'>
                  <div style={{ width: '300px', height: '300px' }}>
                    <ChartWrapper>
                      <Pie
                        id='category-distribution'
                        data={data?.charts.category_distribution as any}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                      />
                    </ChartWrapper>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Service</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartWrapper>
                  <Bar
                    id='revenue-service'
                    data={data?.charts.revenue_by_service as any}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      //@ts-ignore
                      height: 300,
                    }}
                  />
                </ChartWrapper>
              </CardContent>
            </Card>
          </>
        )}
      </Layout.Body>
    </Layout>
  )
}
