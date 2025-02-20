/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import SelectTimeFrame from '@/components/date-picker/select-time'
import ThemeSwitch from '@/components/theme-switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserNav } from '@/components/user-nav'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetPerformanceMetricsQuery } from '@/services/adminActivityApi'
import { format } from 'date-fns'
import { Download, Loader2 } from 'lucide-react'
import { useState } from 'react'
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

export default function PerformanceMetrics() {
  const short_code = useShortCode()
  const [timeFrame, setTimeFrame] = useState<
    'weekly' | 'monthly' | 'quarterly' | 'yearly'
  >('monthly')

  const { data, isLoading, isFetching } = useGetPerformanceMetricsQuery({
    venue_short_code: short_code,
    time_frame: timeFrame,
  })

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin' />
      </div>
    )
  }

  const formattedKPIData = data?.kpi_data.map((item) => ({
    date: format(new Date(item.date), 'MMM d'),
    activities: item.activities,
    completions: item.completions,
  }))

  return (
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-8'>
        <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Performance Metrics
              {isFetching && (
                  <span className='ml-2 text-sm text-muted-foreground'>
                  (Updating...)
                </span>
              )}
            </h2>
            <p className='text-muted-foreground'>
              Track and analyze team performance and activity metrics
            </p>
          </div>
          <div className='flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0'>
            <SelectTimeFrame {...{ setTimeFrame, timeFrame }} />
            <Button className='w-full sm:w-auto'>
              <Download className='mr-2 h-4 w-4' />
              Export Data
            </Button>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className='grid gap-4 md:grid-cols-4'>
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Total Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {data?.insights.total_activities.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Active Employees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {data?.insights.active_employees.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Tasks Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {data?.insights.task_completion_rate.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Peak Activity Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {data?.insights.most_active_time != null
                  ? `${data.insights.most_active_time}:00`
                  : 'N/A'}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='grid gap-6 md:grid-cols-2'>
          {/* Activity Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <LineChart data={formattedKPIData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='date' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type='monotone'
                    dataKey='activities'
                    stroke='#8884d8'
                    name='Total Activities'
                  />
                  <Line
                    type='monotone'
                    dataKey='completions'
                    stroke='#82ca9d'
                    name='Task Completions'
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Team Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <BarChart data={data?.team_performance}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey='efficiency'
                    fill='#8884d8'
                    name='Efficiency %'
                  />
                  <Bar
                    dataKey='engagement'
                    fill='#82ca9d'
                    name='Active Members'
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Staff Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Staff Performance Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart
                data={data?.staff_performance}
                layout='vertical'
                margin={{ left: 0, right: 30, top: 10, bottom: 10 }} // Adjusted margins
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis type='number' />
                <YAxis
                  type='category'
                  dataKey='name'
                  width={80} // Reduced width
                  tick={{ fontSize: 12 }} // Smaller font size
                />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey='activity_score'
                  fill='#8884d8'
                  name='Activity Score'
                />
                <Bar
                  dataKey='engagement_rate'
                  fill='#82ca9d'
                  name='Engagement Rate'
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='list-disc space-y-2 pl-5'>
              {/*// @ts-ignore*/}
              {data?.team_performance.length > 0 && (
                <li>
                  Team efficiency ranges from{' '}
                  <span className='font-medium'>
                    {/*// @ts-ignore*/}
                    {Math.min(
                      ...(data?.team_performance.map((t) => t.efficiency) ?? [
                        0,
                      ])
                    )}
                    %
                  </span>{' '}
                  to{' '}
                  <span className='font-medium'>
                    {/*// @ts-ignore*/}
                    {Math.max(
                      ...(data?.team_performance.map((t) => t.efficiency) ?? [
                        0,
                      ])
                    )}
                    %
                  </span>
                  {/*// @ts-ignore*/}
                  {Math.min(
                    ...(data?.team_performance.map((t) => t.efficiency) ?? [0])
                  ) ===
                    // @ts-ignore
                    Math.max(
                      ...(data?.team_performance.map((t) => t.efficiency) ?? [
                        0,
                      ])
                    ) && ' across all teams'}
                </li>
              )}
              {/*// @ts-ignore*/}
              {data?.staff_performance.length > 0 && (
                <li>
                  Top performer has completed{' '}
                  <span className='font-medium'>
                    {/*// @ts-ignore*/}
                    {Math.max(...data.staff_performance.map((s) => s.tasks))}
                  </span>
                  {/*// @ts-ignore*/} task
                  {Math.max(...data.staff_performance.map((s) => s.tasks)) !== 1
                    ? 's'
                    : ''}
                </li>
              )}
              {data?.insights.most_active_time !== null && (
                <li>
                  Peak activity time is{' '}
                  <span className='font-medium'>
                    {/*// @ts-ignore*/}
                    {data.insights.most_active_time}:00
                  </span>
                </li>
              )}
              <li>
                <span className='font-medium'>
                  {data?.insights.active_employees}
                </span>{' '}
                employee{data?.insights.active_employees !== 1 ? 's' : ''}{' '}
                active in this period
              </li>
            </ul>
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
