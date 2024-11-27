import { Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import {
    Users,
    Briefcase,
    // CheckCircle,
    // Clock,
    FileText,
    ShieldCheck,
    BarChart,
    ClipboardList
} from 'lucide-react'

export default function OperationsManagerDashboard() {
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
                        <h2 className='text-2xl font-bold tracking-tight'>Operations Dashboard</h2>
                        <p className='text-sm text-muted-foreground'>
                            Welcome back! Here's your operational overview
                        </p>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className='grid gap-4 md:grid-cols-4'>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Active Teams
                            </CardTitle>
                            <Users className='h-4 w-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>0</div>
                            <p className='text-xs text-muted-foreground'>
                                Teams in operation
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Active Projects
                            </CardTitle>
                            <Briefcase className='h-4 w-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>0</div>
                            <p className='text-xs text-muted-foreground'>
                                In progress
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Work Orders
                            </CardTitle>
                            <FileText className='h-4 w-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>0</div>
                            <p className='text-xs text-muted-foreground'>
                                Open orders
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Efficiency Rate
                            </CardTitle>
                            <BarChart className='h-4 w-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>0%</div>
                            <p className='text-xs text-muted-foreground'>
                                Overall efficiency
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Operations Overview */}
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
                    <Card className='lg:col-span-4'>
                        <CardHeader>
                            <CardTitle>Operational Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-4'>
                                <p className='py-4 text-center text-sm text-muted-foreground'>
                                    No performance data available
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='lg:col-span-3'>
                        <CardHeader>
                            <CardTitle>Latest Incidents</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-4'>
                                <p className='py-4 text-center text-sm text-muted-foreground'>
                                    No recent incidents
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Bottom Cards */}
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
                    <Card className='lg:col-span-4'>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0'>
                            <CardTitle>Compliance Status</CardTitle>
                            <ShieldCheck className='h-4 w-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-4'>
                                <p className='py-4 text-center text-sm text-muted-foreground'>
                                    No compliance issues
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='lg:col-span-3'>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0'>
                            <CardTitle>Pending Tasks</CardTitle>
                            <ClipboardList className='h-4 w-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-4'>
                                <p className='py-4 text-center text-sm text-muted-foreground'>
                                    No pending tasks
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </Layout.Body>
        </Layout>
    )
}