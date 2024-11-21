import { useState } from 'react'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/custom/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

// Mock data for integrations
const integrations = [
  {
    id: 1,
    name: 'Time Tracking App',
    status: 'active',
    lastSync: '2024-10-14 10:30:00',
  },
  {
    id: 2,
    name: 'Project Management Tool',
    status: 'active',
    lastSync: '2024-10-14 10:25:00',
  },
  {
    id: 3,
    name: 'Communication Platform',
    status: 'error',
    lastSync: '2024-10-13 15:45:00',
  },
  {
    id: 4,
    name: 'HR Management System',
    status: 'active',
    lastSync: '2024-10-14 09:50:00',
  },
  {
    id: 5,
    name: 'Customer Support Tool',
    status: 'inactive',
    lastSync: '2024-10-12 11:20:00',
  },
]

// Mock data for aggregated metrics
const timeTrackingData = [
  { name: 'Productive', value: 75 },
  { name: 'Unproductive', value: 15 },
  { name: 'Neutral', value: 10 },
]

const projectProgressData = [
  { name: 'Project A', progress: 80 },
  { name: 'Project B', progress: 65 },
  { name: 'Project C', progress: 90 },
  { name: 'Project D', progress: 45 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function Integrations() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <Layout>
      <Layout.Header>
        <Search />
        <div className='ml-auto flex items-center space-x-2'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-4'>
        <div className='flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            Integration Hub
          </h1>
          <Button>Add New Integration</Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='integrations'>Integrations</TabsTrigger>
            <TabsTrigger value='metrics'>Aggregated Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value='overview'>
            <Card>
              <CardHeader>
                <CardTitle>Integration Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                  <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <CardTitle className='text-sm font-medium'>
                        Total Integrations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='text-2xl font-bold'>
                        {integrations.length}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <CardTitle className='text-sm font-medium'>
                        Active Integrations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='text-2xl font-bold'>
                        {
                          integrations.filter((i) => i.status === 'active')
                            .length
                        }
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <CardTitle className='text-sm font-medium'>
                        Data Points Collected
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='text-2xl font-bold'>24,583</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <CardTitle className='text-sm font-medium'>
                        Last Sync
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='text-2xl font-bold'>10 minutes ago</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='integrations'>
            <Card>
              <CardHeader>
                <CardTitle>Connected Integrations</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Sync</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {integrations.map((integration) => (
                      <TableRow key={integration.id}>
                        <TableCell className='font-medium'>
                          {integration.name}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              integration.status === 'active'
                                ? 'default'
                                : 'secondary'
                            }
                            className={
                              integration.status === 'error' ? 'bg-red-500' : ''
                            }
                          >
                            {integration.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{integration.lastSync}</TableCell>
                        <TableCell>
                          <Button variant='ghost'>Configure</Button>
                          <Button variant='ghost'>Sync Now</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='metrics'>
            <div className='grid gap-4 md:grid-cols-2'>
              <Card>
                <CardHeader>
                  <CardTitle>Time Tracking Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width='100%' height={300}>
                    <PieChart>
                      <Pie
                        data={timeTrackingData}
                        cx='50%'
                        cy='50%'
                        labelLine={false}
                        outerRadius={80}
                        fill='#8884d8'
                        dataKey='value'
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {timeTrackingData.map((_entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Project Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width='100%' height={300}>
                    <BarChart data={projectProgressData}>
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis dataKey='name' />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey='progress' fill='#8884d8' />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  )
}
