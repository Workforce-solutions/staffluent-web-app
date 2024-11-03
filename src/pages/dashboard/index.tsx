/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import SelectTimeFrame from '@/components/date-picker/select-time'
import ThemeSwitch from '@/components/theme-switch'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserNav } from '@/components/user-nav'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetDashboardQuery } from '@/services/dashboardApi'
import { format } from 'date-fns'
import { Download, Loader2 } from 'lucide-react'
import { useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export default function Dashboard() {
  const short_code = useShortCode()
  const [timeFrame, setTimeFrame] = useState<
    'weekly' | 'monthly' | 'quarterly' | 'yearly'
  >('monthly')

  const { data, isLoading, isFetching } = useGetDashboardQuery({
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

  const productivityTrendData = data?.overview.productivityTrend.dates.map(
    (date, index) => ({
      date: format(new Date(date), 'MMM d'),
      actual: data.overview.productivityTrend.actual[index],
      expected: data.overview.productivityTrend.expected[index],
    })
  )

  return (
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-8'>
        <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Staff Management Dashboard
              {isFetching && (
                  <span className='ml-2 text-sm text-muted-foreground'>
                  (Updating...)
                </span>
              )}
            </h2>
            <p className='text-muted-foreground'>
              Monitor staff performance, tasks, and project progress
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

        <Tabs defaultValue='overview' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='performance'>Performance</TabsTrigger>
            <TabsTrigger value='tasks'>Tasks</TabsTrigger>
            <TabsTrigger value='projects'>Projects</TabsTrigger>
          </TabsList>

          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 md:grid-cols-4'>
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm font-medium text-muted-foreground'>
                    Total Staff
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    {data?.overview.totalStaff.count}
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    {data?.overview.totalStaff.change}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm font-medium text-muted-foreground'>
                    Average Productivity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    {data?.overview.averageProductivity.percentage}%
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    {data?.overview.averageProductivity.change}
                  </p>
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
                    {data?.overview.tasksCompleted.count}
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    {data?.overview.tasksCompleted.change}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm font-medium text-muted-foreground'>
                    Active Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    {data?.overview.activeProjects.count}
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    {data?.overview.activeProjects.completed}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className='grid gap-6 md:grid-cols-2'>
              <Card>
                <CardHeader>
                  <CardTitle>Productivity Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width='100%' height={300}>
                    <LineChart data={productivityTrendData}>
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis dataKey='date' />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type='monotone'
                        dataKey='actual'
                        stroke='#8884d8'
                        name='Actual'
                      />
                      <Line
                        type='monotone'
                        dataKey='expected'
                        stroke='#82ca9d'
                        name='Expected'
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Task Completion Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width='100%' height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          // @ts-ignore
                          {
                            name: 'Completed',
                            value:
                              parseInt(
                                data?.overview.taskCompletionStatus.completed ??
                                  ''
                              ) || 0,
                          },
                          // @ts-ignore
                          {
                            name: 'In Progress',
                            value:
                              parseInt(
                                data?.overview.taskCompletionStatus
                                  .inProgress ?? ''
                              ) || 0,
                          },
                          // @ts-ignore
                          {
                            name: 'Not Started',
                            value:
                              parseInt(
                                data?.overview.taskCompletionStatus
                                  .notStarted ?? ''
                              ) || 0,
                          },
                        ]}
                        cx='50%'
                        cy='50%'
                        outerRadius={100}
                        fill='#8884d8'
                        dataKey='value'
                        nameKey='name'
                      >
                        {[
                          { fill: '#16a34a' }, // green for Completed
                          { fill: '#2563eb' }, // blue for In Progress
                          { fill: '#dc2626' }, // red for Not Started
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='performance' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-8'>
                  {data?.performance.map((performer, index) => (
                    <div key={index} className='flex items-center'>
                      <Avatar className='h-9 w-9'>
                        <AvatarFallback>
                          {performer.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className='ml-4 space-y-1'>
                        <p className='text-sm font-medium leading-none'>
                          {performer.name}
                        </p>
                        <p className='text-sm text-muted-foreground'>
                          {performer.role}
                        </p>
                        <div className='text-sm text-muted-foreground'>
                          Activities: {performer.stats.activities} | Active
                          Days: {performer.stats.activeDays} | Tasks:{' '}
                          {performer.stats.completedTasks}
                        </div>
                      </div>
                      <div className='ml-auto font-medium'>
                        {performer.performanceScore}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='tasks' className='space-y-4'>
            <div className='grid gap-4 md:grid-cols-2'>
              <Card>
                <CardHeader>
                  <CardTitle>Task Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width='100%' height={300}>
                    <ResponsiveContainer width='100%' height={300}>
                      <PieChart>
                        <Pie
                          data={[
                            // @ts-ignore
                            {
                              name: 'Not Started',
                              value:
                                parseInt(
                                  data?.tasks.taskStatus.not_started ?? ''
                                ) || 0,
                            },
                            // @ts-ignore
                            {
                              name: 'In Progress',
                              value:
                                parseInt(
                                  data?.tasks.taskStatus.in_progress ?? ''
                                ) || 0,
                            },
                            // @ts-ignore
                            {
                              name: 'Completed',
                              value:
                                parseInt(
                                  data?.tasks.taskStatus.completed ?? ''
                                ) || 0,
                            },
                            // @ts-ignore
                            {
                              name: 'Cancelled',
                              value:
                                parseInt(
                                  data?.tasks.taskStatus.cancelled ?? ''
                                ) || 0,
                            },
                          ]}
                          cx='50%'
                          cy='50%'
                          outerRadius={100}
                          fill='#8884d8'
                          dataKey='value'
                          nameKey='name'
                        >
                          {/* THIS IS THE KEY PART WE WERE MISSING */}
                          {data?.tasks.taskStatus &&
                            [
                              { fill: '#dc2626' }, // red for Not Started
                              { fill: '#2563eb' }, // blue for In Progress
                              { fill: '#16a34a' }, // green for Completed
                              { fill: '#71717a' }, // gray for Cancelled
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Task Status Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='rounded-lg bg-green-50 p-4 dark:bg-green-950'>
                        <div className='text-2xl font-bold text-green-600 dark:text-green-400'>
                          {data?.tasks.taskStatus.completed || 0}
                        </div>
                        <div className='text-sm text-green-700 dark:text-green-300'>
                          Completed
                        </div>
                      </div>
                      <div className='rounded-lg bg-blue-50 p-4 dark:bg-blue-950'>
                        <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                          {data?.tasks.taskStatus.in_progress || 0}
                        </div>
                        <div className='text-sm text-blue-700 dark:text-blue-300'>
                          In Progress
                        </div>
                      </div>
                      <div className='rounded-lg bg-red-50 p-4 dark:bg-red-950'>
                        <div className='text-2xl font-bold text-red-600 dark:text-red-400'>
                          {data?.tasks.taskStatus.not_started || 0}
                        </div>
                        <div className='text-sm text-red-700 dark:text-red-300'>
                          Not Started
                        </div>
                      </div>
                      <div className='rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900'>
                        <div className='text-2xl font-bold text-zinc-600 dark:text-zinc-400'>
                          {/*// @ts-ignore*/}
                          {data?.tasks.taskStatus.cancelled || 0}
                        </div>
                        <div className='text-sm text-zinc-700 dark:text-zinc-300'>
                          Cancelled
                        </div>
                      </div>
                    </div>

                    <div className='border-t pt-4'>
                      <div className='text-sm text-muted-foreground'>
                        Total Tasks
                      </div>
                      <div className='text-2xl font-bold'>
                        {data?.tasks.taskStatus.total || 0}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/*// @ts-ignore*/}
            {data?.tasks.taskDistribution.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Tasks by Priority</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width='100%' height={300}>
                    {/*// @ts-ignore*/}
                    <BarChart data={data.tasks.taskDistribution}>
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis dataKey='priority' />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey='completed'
                        fill='#16a34a'
                        name='Completed'
                      />
                      <Bar dataKey='total' fill='#2563eb' name='Total' />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value='projects' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Project Status Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width='100%' height={300}>
                  <BarChart
                    data={data?.projects.statusOverview}
                    layout='vertical'
                    margin={{ left: 0, right: 30, top: 10, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis type='number' />
                    <YAxis
                      type='category'
                      dataKey='name'
                      width={80}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey='completion'
                      fill='#8884d8'
                      name='Completion %'
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  )
}
