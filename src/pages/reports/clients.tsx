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
import { Download, Users, UserPlus, UserMinus, TrendingUp } from 'lucide-react'
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
  ArcElement,
} from 'chart.js'
import { useGetClientAnalyticsQuery } from '@/services/adminAnalyticsApi'
import { useShortCode } from '@/hooks/use-local-storage'
import { DateRange } from 'react-day-picker'
import EmptyState from '@/components/table/empty-state'

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
  const [dateRange, setDateRange] = useState<DateRange>()
  const shortCode = useShortCode()

  const { data, isFetching, isError } = useGetClientAnalyticsQuery({
    venue_short_code: shortCode,
    date_from: dateRange?.from?.toISOString(),
    date_to: dateRange?.to?.toISOString(),
  })

  if (isFetching) {
    return <EmptyState isLoading={isFetching} isError={isError} />
  } else if (!data) {
    return <EmptyState isLoading={isFetching} isError={isError} />
  }
  const stats = data?.stats

  const charts = data?.charts

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
              Client Analytics
            </h2>
            <p className='text-sm text-muted-foreground'>
              Monitor client growth and engagement metrics
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
            <DateRangePicker value={dateRange} onValueChange={setDateRange} />
            <Button variant='outline'>
              <Download className='mr-2 h-4 w-4' />
              Export
            </Button>
          </div>
        </div>

        <div className='grid gap-4 md:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Clients
              </CardTitle>
              <Users className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stats.total_clients}</div>
              <p className='text-xs text-muted-foreground'>
                {(stats?.monthly_comparison.change ?? 0) > 0 ? '+' : ''}
                {stats?.monthly_comparison.change ?? 0}% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>New Clients</CardTitle>
              <UserPlus className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stats.new_clients}</div>
              <p className='text-xs text-muted-foreground'>This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Churn Rate</CardTitle>
              <UserMinus className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stats.churn_rate}%</div>
              <p className='text-xs text-muted-foreground'>Current period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Retention Rate
              </CardTitle>
              <TrendingUp className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stats.retention_rate}%</div>
              <p className='text-xs text-muted-foreground'>Current period</p>
            </CardContent>
          </Card>
        </div>

        <div className='grid gap-4 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Client Growth Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <Line
                data={charts.client_growth}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  //@ts-ignore
                  height: 300,
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Client Types</CardTitle>
            </CardHeader>
            <CardContent className='flex justify-center'>
              <div style={{ width: '300px', height: '300px' }}>
                <Doughnut
                  data={charts.client_types}
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
              data={charts?.quarterly_activity}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                //@ts-ignore
                height: 300,
              }}
            />
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
