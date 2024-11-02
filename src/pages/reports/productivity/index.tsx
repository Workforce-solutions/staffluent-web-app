import { useState } from 'react'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/custom/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { DownloadIcon } from 'lucide-react'

// Mock data for productivity reports
const productivityTrendData = [
    { week: 'Week 1', productivity: 85 },
    { week: 'Week 2', productivity: 88 },
    { week: 'Week 3', productivity: 92 },
    { week: 'Week 4', productivity: 90 },
    { week: 'Week 5', productivity: 95 },
]

const departmentProductivityData = [
    { department: 'Sales', productivity: 92 },
    { department: 'Marketing', productivity: 88 },
    { department: 'Engineering', productivity: 95 },
    { department: 'Customer Support', productivity: 90 },
    { department: 'HR', productivity: 87 },
]

const topPerformersData = [
    { name: 'John Doe', productivity: 98 },
    { name: 'Jane Smith', productivity: 97 },
    { name: 'Bob Johnson', productivity: 95 },
    { name: 'Alice Williams', productivity: 94 },
    { name: 'Charlie Brown', productivity: 93 },
]

export default function Productivity() {
    const [timeFrame, setTimeFrame] = useState('monthly')

    return (
        <Layout>
            <Layout.Header>
                <div className='ml-auto flex items-center space-x-4'>
                    <Search />
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body className='space-y-6'>
                <div className='flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0'>
                    <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
                        Productivity Reports
                    </h1>
                    <div className='flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0'>
                        <Select value={timeFrame} onValueChange={setTimeFrame}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Select time frame" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="quarterly">Quarterly</SelectItem>
                                <SelectItem value="yearly">Yearly</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className="w-full sm:w-auto">
                            <DownloadIcon className="mr-2 h-4 w-4" />
                            Export Report
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Productivity Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={productivityTrendData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="week" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="productivity" stroke="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Department Productivity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={departmentProductivityData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="department" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="productivity" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Top Performers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={topPerformersData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="productivity" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Productivity Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Overall productivity has increased by 5% compared to the previous {timeFrame} period.</li>
                            <li>The Engineering department shows the highest productivity at 95%.</li>
                            <li>John Doe and Jane Smith are consistently top performers, with productivity rates above 97%.</li>
                            <li>There's an opportunity to improve productivity in the HR department, which is currently at 87%.</li>
                        </ul>
                    </CardContent>
                </Card>
            </Layout.Body>
        </Layout>
    )
}