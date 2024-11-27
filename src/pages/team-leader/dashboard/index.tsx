import { Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
// import { Badge } from '@/components/ui/badge'
import {
    Users,
    Briefcase,
    CheckCircle,
    Clock,
    // AlertCircle
} from 'lucide-react'
// import { format } from 'date-fns'
// import { Alert, AlertDescription } from '@/components/ui/alert'

export default function TeamLeaderDashboard() {
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
                        <h2 className='text-2xl font-bold tracking-tight'>Team Dashboard</h2>
                        <p className='text-sm text-muted-foreground'>
                            Welcome back! Here's your team's overview
                        </p>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className='grid gap-4 md:grid-cols-4'>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Team Members
                            </CardTitle>
                            <Users className='h-4 w-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>0</div>
                            <p className='text-xs text-muted-foreground'>
                                Active members
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
                                Tasks Completed
                            </CardTitle>
                            <CheckCircle className='h-4 w-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>0</div>
                            <p className='text-xs text-muted-foreground'>
                                This month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Hours Tracked
                            </CardTitle>
                            <Clock className='h-4 w-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>0h</div>
                            <p className='text-xs text-muted-foreground'>
                                This month
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Projects & Tasks Overview */}
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
                    <Card className='lg:col-span-4'>
                        <CardHeader>
                            <CardTitle>Active Projects</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-4'>
                                <p className='py-4 text-center text-sm text-muted-foreground'>
                                    No active projects
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='lg:col-span-3'>
                        <CardHeader>
                            <CardTitle>Recent Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-4'>
                                <p className='py-4 text-center text-sm text-muted-foreground'>
                                    No recent tasks
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Team Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Team Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-4'>
                            <p className='py-4 text-center text-sm text-muted-foreground'>
                                No recent activity
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </Layout.Body>
        </Layout>
    )
}