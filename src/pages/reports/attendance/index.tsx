import { useState } from 'react'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/custom/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Download, Loader2 } from 'lucide-react'
import { useGetAttendanceQuery, useExportAttendanceMutation } from '@/services/attendanceApi'
import { useShortCode } from '@/hooks/use-local-storage'
import { format } from 'date-fns'
import { toast } from '@/components/ui/use-toast'


// Color configuration
const COLORS = {
    present: '#16a34a', // green-600
    late: '#eab308',    // yellow-500
    absent: '#dc2626',  // red-600
}

export default function Attendance() {
    const short_code = useShortCode()
    const [timeFrame, setTimeFrame] = useState<'weekly' | 'monthly' | 'quarterly' | 'yearly'>('monthly')

    const { data, isLoading, isFetching } = useGetAttendanceQuery({
        venue_short_code: short_code,
        time_frame: timeFrame
    })
    const [exportAttendance, { isLoading: isExporting }] = useExportAttendanceMutation()

    const handleExport = async () => {
        try {
            const blob = await exportAttendance({
                venue_short_code: short_code,
                time_frame: timeFrame
            }).unwrap()

            // Create and trigger download
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `attendance-report-${timeFrame}-${format(new Date(), 'yyyy-MM-dd')}.xlsx`

            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)

            toast({
                title: "Export Successful",
                description: "Your attendance report has been downloaded.",
            })
        } catch (error) {
            console.error('Export failed:', error)
            toast({
                title: "Export Failed",
                description: "Failed to generate the attendance report. Please try again.",
                variant: "destructive",
            })
        }
    }

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    const formattedTrendData = data?.attendanceTrend.map(item => ({
        ...item,
        date: format(new Date(item.date), 'MMM d')
    }))


    return (
        <Layout>
            <Layout.Header>
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body className='space-y-6'>
                <div className='flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>
                            Attendance Reports
                            {isFetching && <span className="text-sm text-muted-foreground ml-2">(Updating...)</span>}
                        </h2>
                        <p className="text-muted-foreground">
                            Track and analyze attendance patterns
                        </p>
                    </div>
                    <div className='flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0'>
                        {/*// @ts-ignore*/}
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
                        <Button
                            className="w-full sm:w-auto"
                            onClick={handleExport}
                            disabled={isExporting}
                        >
                            {isExporting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Exporting...
                                </>
                            ) : (
                                <>
                                    <Download className="mr-2 h-4 w-4" />
                                    Export Report
                                </>
                            )}
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
                                <LineChart data={formattedTrendData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="present"
                                        stroke={COLORS.present}
                                        name="Present %"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="late"
                                        stroke={COLORS.late}
                                        name="Late %"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="absent"
                                        stroke={COLORS.absent}
                                        name="Absent %"
                                    />
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
                                    <Pie
                                        data={data?.attendanceOverview}
                                        dataKey="value"
                                        nameKey="status"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        label
                                    >
                                        {data?.attendanceOverview.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[entry.status.toLowerCase() as keyof typeof COLORS]}
                                            />
                                        ))}
                                    </Pie>
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
                            <BarChart data={data?.departmentAttendance}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="department" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="attendance"
                                    fill={COLORS.present}
                                    name="Attendance Rate %"
                                />
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
                            <li>
                                Overall attendance rate is{' '}
                                <span className="font-medium">{data?.insights.overallRate}%</span>
                                {' '}for the current {data?.insights.timeFrame} period.
                            </li>
                            {data?.insights.bestDepartment && (
                                <li>
                                    <span className="font-medium">{data.insights.bestDepartment.department}</span>
                                    {' '}has the highest attendance rate at{' '}
                                    <span className="font-medium">{data.insights.bestDepartment.attendance}%</span>.
                                </li>
                            )}
                            {data?.insights.highestLateDay && (
                                <li>
                                    Higher late arrivals on{' '}
                                    <span className="font-medium">{data.insights.highestLateDay}s</span>,
                                    {' '}with a late arrival rate of{' '}
                                    <span className="font-medium">{data.insights.lateArrivalRate}%</span>.
                                </li>
                            )}
                            {data?.insights.worstDepartment && (
                                <li>
                                    <span className="font-medium">{data.insights.worstDepartment.department}</span>
                                    {' '}has the lowest attendance rate at{' '}
                                    <span className="font-medium">{data.insights.worstDepartment.attendance}%</span>,
                                    which may require attention.
                                </li>
                            )}
                        </ul>
                    </CardContent>
                </Card>
            </Layout.Body>
        </Layout>
    )
}