// pages/productivity.tsx
import { useState } from 'react'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/custom/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Download, Loader2 } from 'lucide-react'
import { useGetProductivityQuery, useExportProductivityMutation } from '@/services/productivityApi'
import { toast } from '@/components/ui/use-toast'
import { useShortCode } from '@/hooks/use-local-storage'
import { format } from 'date-fns'

export default function Productivity() {
    const short_code = useShortCode()
    const [timeFrame, setTimeFrame] = useState<'weekly' | 'monthly' | 'quarterly' | 'yearly'>('monthly')

    const { data, isLoading, isFetching } = useGetProductivityQuery({
        venue_short_code: short_code,
        time_frame: timeFrame
    })

    const [exportProductivity, { isLoading: isExporting }] = useExportProductivityMutation()

    const handleExport = async () => {
        try {
            const blob = await exportProductivity({
                venue_short_code: short_code,
                time_frame: timeFrame
            }).unwrap()

            // Create and trigger download
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `productivity-report-${timeFrame}-${format(new Date(), 'yyyy-MM-dd')}.xlsx`

            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)

            toast({
                title: "Export Successful",
                description: "Your productivity report has been downloaded.",
            })
        } catch (error) {
            console.error('Export failed:', error)
            toast({
                title: "Export Failed",
                description: "Failed to generate the productivity report. Please try again.",
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

    const formattedTrendData = data?.productivityTrend.map(item => ({
        ...item,
        date: format(new Date(item.date), 'MMM d')
    }))

    return (
        <Layout>
            <Layout.Header>
                <div className='ml-auto flex items-center space-x-2'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body className='space-y-6'>
                <div className='flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>
                            Productivity Reports
                            {isFetching && <span className="text-sm text-muted-foreground ml-2">(Updating...)</span>}
                        </h2>
                        <p className="text-muted-foreground">
                            Track and analyze team productivity metrics
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
                            <CardTitle>Productivity Trend</CardTitle>
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
                                        dataKey="productivity"
                                        stroke="#2563eb"
                                        name="Productivity %"
                                    />
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
                                <BarChart data={data?.departmentProductivity}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="department" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                        dataKey="productivity"
                                        fill="#16a34a"
                                        name="Productivity %"
                                    />
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
                            <BarChart
                                data={data?.topPerformers}
                                layout="vertical"
                                margin={{ left: 10 }} // Add more space for names
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    tick={{ fontSize: 12 }}
                                />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="productivity"
                                    fill="#8884d8"
                                    name="Productivity %"
                                />
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
                            <li>
                                {/*// @ts-ignore*/}
                                Overall productivity has {data?.insights.productivityChange >= 0 ? 'increased' : 'decreased'} by{' '}
                                <span className="font-medium">
                                    {Math.abs(data?.insights.productivityChange || 0)}%
                                </span>{' '}
                                compared to the previous {data?.insights.timeFrame} period.
                            </li>
                            {data?.insights.bestDepartment && (
                                <li>
                                    <span className="font-medium">{data.insights.bestDepartment.department}</span>
                                    {' '}shows the highest productivity at{' '}
                                    <span className="font-medium">{data.insights.bestDepartment.productivity}%</span>.
                                </li>
                            )}
                            {data?.insights.topPerformers.map((performer, index) => (
                                <li key={index}>
                                    <span className="font-medium">{performer.name}</span>
                                    {' '}is a top performer with{' '}
                                    <span className="font-medium">{performer.productivity}%</span>
                                    {' '}productivity.
                                </li>
                            ))}
                            {data?.insights.improvementTarget && (
                                <li>
                                    There's an opportunity to improve productivity in the{' '}
                                    <span className="font-medium">{data.insights.improvementTarget.department}</span>
                                    {' '}department, which is currently at{' '}
                                    <span className="font-medium">{data.insights.improvementTarget.productivity}%</span>.
                                </li>
                            )}
                        </ul>
                    </CardContent>
                </Card>
            </Layout.Body>
        </Layout>
    )
}