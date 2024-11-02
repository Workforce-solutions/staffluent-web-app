import { useState } from 'react'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/custom/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { DownloadIcon } from 'lucide-react'

// Mock data for attendance reports
const attendanceTrendData = [
    { date: '2024-01-01', present: 95, absent: 3, late: 2 },
    { date: '2024-01-02', present: 93, absent: 5, late: 2 },
    { date: '2024-01-03', present: 97, absent: 2, late: 1 },
    { date: '2024-01-04', present: 94, absent: 4, late: 2 },
    { date: '2024-01-05', present: 96, absent: 3, late: 1 },
]

const attendanceOverviewData = [
    { status: 'Present', value: 90 },
    { status: 'Absent', value: 5 },
    { status: 'Late', value: 5 },
]

const departmentAttendanceData = [
    { department: 'Sales', attendance: 95 },
    { department: 'Marketing', attendance: 92 },
    { department: 'Engineering', attendance: 98 },
    { department: 'Customer Support', attendance: 94 },
    { department: 'HR', attendance: 96 },
]

export default function Attendance() {
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
                        Attendance Reports
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
                            <CardTitle>Attendance Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={attendanceTrendData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="present" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="absent" stroke="#82ca9d" />
                                    <Line type="monotone" dataKey="late" stroke="#ffc658" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Attendance Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie dataKey="value" data={attendanceOverviewData} fill="#8884d8" label />
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Department Attendance Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={departmentAttendanceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="department" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="attendance" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Attendance Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Overall attendance rate is 90% for the current {timeFrame} period.</li>
                            <li>The Engineering department has the highest attendance rate at 98%.</li>
                            <li>There's a slight increase in late arrivals on Mondays, averaging 3% higher than other days.</li>
                            <li>The Marketing department has the lowest attendance rate at 92%, which may require further investigation.</li>
                        </ul>
                    </CardContent>
                </Card>
            </Layout.Body>
        </Layout>
    )
}