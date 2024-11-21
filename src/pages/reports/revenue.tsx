/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { UserNav } from '@/components/user-nav'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetRevenueAnalyticsQuery } from '@/services/adminAnalyticsApi'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  DollarSign,
  TrendingUp,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { DateRange } from 'react-day-picker'
import ExportComponent from './export-component'

// Register ChartJS components
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
  const shortCode = useShortCode()
  const [period, setPeriod] = useState('thisMonth')
  const [dateRange, setDateRange] = useState<DateRange>()

  // Refs for chart instances
  const lineChartRef: any = useRef<ChartJS | null>(null)
  const barChartRef: any = useRef<ChartJS | null>(null)

  const { data, isFetching } = useGetRevenueAnalyticsQuery({
    venue_short_code: shortCode,
    date_from: dateRange?.from?.toISOString(),
    date_to: dateRange?.to?.toISOString(),
  })

  // Clean up chart instances on unmount
  useEffect(() => {
    return () => {
      if (lineChartRef.current) {
        lineChartRef.current.destroy()
      }
      if (barChartRef.current) {
        barChartRef.current.destroy()
      }
    }
  }, [])

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    height: 400,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    height: 300,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  }

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
              Revenue Report
            </h2>
            <p className='text-sm text-muted-foreground'>
              Analyze revenue streams and financial performance
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
            <ExportComponent type='revenue' venue_short_code={shortCode} />
          </div>
        </div>

        {isFetching ? (
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
                  Total Revenue
                </CardTitle>
                <DollarSign className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  $
                  {parseFloat(data?.stats.total_revenue ?? '').toLocaleString()}
                </div>
                <p className='text-xs text-muted-foreground'>
                  {(data?.stats.monthly_comparison.change ?? 0) > 0 ? '+' : ''}
                  {data?.stats.monthly_comparison.change}% from last month
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
                <div className='text-2xl font-bold'>
                  ${data?.stats.avg_order_value.toLocaleString()}
                </div>
                <p className='text-xs text-muted-foreground'>
                  Average per service
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Revenue Growth
                </CardTitle>
                <TrendingUp className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {data?.stats.revenue_growth}%
                </div>
                <p className='text-xs text-muted-foreground'>
                  Month over month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Projected Revenue
                </CardTitle>
                <TrendingUp className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  ${data?.stats.projected_revenue.toLocaleString()}
                </div>
                <p className='text-xs text-muted-foreground'>For next month</p>
              </CardContent>
            </Card>
          </div>
        )}

        {isFetching ? (
          <div className='space-y-4'>
            <Card>
              <CardHeader>
                <Skeleton className='h-8 w-[200px]' />
              </CardHeader>
              <CardContent className='h-[400px]'>
                <Skeleton className='h-full w-full' />
              </CardContent>
            </Card>

            <div className='grid gap-4 md:grid-cols-2'>
              <Card>
                <CardHeader>
                  <Skeleton className='h-8 w-[200px]' />
                </CardHeader>
                <CardContent className='h-[300px]'>
                  <Skeleton className='h-full w-full' />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Skeleton className='h-8 w-[200px]' />
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <Skeleton className='h-4 w-[100px]' />
                        </TableHead>
                        <TableHead>
                          <Skeleton className='h-4 w-[100px]' />
                        </TableHead>
                        <TableHead>
                          <Skeleton className='h-4 w-[80px]' />
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <Skeleton className='h-4 w-[150px]' />
                          </TableCell>
                          <TableCell>
                            <Skeleton className='h-4 w-[100px]' />
                          </TableCell>
                          <TableCell>
                            <Skeleton className='h-4 w-[80px]' />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent className='h-[400px]'>
                {data?.charts.revenue_trends ? (
                  <Line
                    ref={lineChartRef}
                    data={data.charts.revenue_trends}
                    options={lineOptions}
                  />
                ) : (
                  <p>No revenue trend data available</p>
                )}
              </CardContent>
            </Card>

            <div className='grid gap-4 md:grid-cols-2'>
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Category</CardTitle>
                </CardHeader>
                <CardContent className='h-[300px]'>
                  {data?.charts.revenue_by_category ? (
                    <Bar
                      ref={barChartRef}
                      data={data.charts.revenue_by_category}
                      options={barOptions}
                    />
                  ) : (
                    <p>No revenue by category data available</p>
                  )}
                </CardContent>
              </Card>

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
                        <TableHead className='text-right'>Bookings</TableHead>
                        <TableHead className='text-right'>Avg Price</TableHead>
                        <TableHead className='text-right'>Growth</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data?.charts.top_services?.map((service) => (
                        <TableRow key={service.name}>
                          <TableCell>{service.name}</TableCell>
                          <TableCell className='text-right'>
                            $
                            {parseFloat(
                              service.revenue as string
                            ).toLocaleString()}
                          </TableCell>
                          <TableCell className='text-right'>
                            {service.bookings}
                          </TableCell>
                          <TableCell className='text-right'>
                            ${parseFloat(service.avg_price).toLocaleString()}
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
          </>
        )}
      </Layout.Body>
    </Layout>
  )
}
