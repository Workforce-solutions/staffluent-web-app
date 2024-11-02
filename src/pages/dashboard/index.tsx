
import { Layout } from '@/components/custom/layout'
import { Button } from '@/components/custom/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search } from '@/components/search'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ThemeSwitch from '@/components/theme-switch'
// import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

// Mock data
const productivityData = [
  { name: 'Week 1', actual: 75, expected: 80 },
  { name: 'Week 2', actual: 82, expected: 80 },
  { name: 'Week 3', actual: 78, expected: 80 },
  { name: 'Week 4', actual: 85, expected: 80 },
]

const taskCompletionData = [
  { name: 'Completed', value: 68 },
  { name: 'In Progress', value: 25 },
  { name: 'Not Started', value: 7 },
]

const projectStatusData = [
  { name: 'Project A', completed: 75 },
  { name: 'Project B', completed: 50 },
  { name: 'Project C', completed: 90 },
  { name: 'Project D', completed: 30 },
]

const topPerformers = [
  { name: 'Alice Johnson', role: 'Developer', performance: 95 },
  { name: 'Bob Smith', role: 'Designer', performance: 92 },
  { name: 'Carol Williams', role: 'Manager', performance: 90 },
  { name: 'David Brown', role: 'Developer', performance: 88 },
  { name: 'Eva Davis', role: 'Marketing', performance: 87 },
]

export default function Dashboard() {
  return (
      <Layout>
        <Layout.Header>
          {/*<TopNav links={topNav} />*/}
          <div className='ml-auto flex items-center space-x-4'>
            <Search />
            <ThemeSwitch />
            <UserNav />
          </div>
        </Layout.Header>

        <Layout.Body>
          <div className='mb-2 flex items-center justify-between space-y-2'>
            <h1 className='text-2xl font-bold tracking-tight'>Staff Management Dashboard</h1>
            <div className='flex items-center space-x-2'>
              <Button>Export Data</Button>
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
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Total Staff</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>245</div>
                    <p className='text-xs text-muted-foreground'>+5% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Average Productivity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>82%</div>
                    <p className='text-xs text-muted-foreground'>+3% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Tasks Completed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>1,234</div>
                    <p className='text-xs text-muted-foreground'>+10% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Active Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>12</div>
                    <p className='text-xs text-muted-foreground'>2 completed this month</p>
                  </CardContent>
                </Card>
              </div>
              <div className='grid gap-4 md:grid-cols-2'>
                <Card>
                  <CardHeader>
                    <CardTitle>Productivity Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={productivityData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="actual" stroke="#8884d8" />
                        <Line type="monotone" dataKey="expected" stroke="#82ca9d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Task Completion Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie dataKey="value" data={taskCompletionData} fill="#8884d8" label />
                        <Tooltip />
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
                    {topPerformers.map((performer, index) => (
                        <div key={index} className='flex items-center'>
                          <Avatar className='h-9 w-9'>
                            <AvatarFallback>{performer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className='ml-4 space-y-1'>
                            <p className='text-sm font-medium leading-none'>{performer.name}</p>
                            <p className='text-sm text-muted-foreground'>{performer.role}</p>
                          </div>
                          <div className='ml-auto font-medium'>{performer.performance}%</div>
                        </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='tasks' className='space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle>Task Completion by Department</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={[
                      { name: 'Development', completed: 120, total: 150 },
                      { name: 'Design', completed: 80, total: 100 },
                      { name: 'Marketing', completed: 60, total: 80 },
                      { name: 'Sales', completed: 90, total: 100 },
                    ]}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" fill="#8884d8" name="Completed" />
                      <Bar dataKey="total" fill="#82ca9d" name="Total" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='projects' className='space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle>Project Status Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={projectStatusData} layout="vertical">
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" fill="#8884d8" />
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

// const topNav = [
//   { title: 'Dashboard', href: '/dashboard', isActive: true },
//   { title: 'Staff', href: '/staff', isActive: false },
//   { title: 'Projects', href: '/projects', isActive: false },
//   { title: 'Reports', href: '/reports', isActive: false },
// ]