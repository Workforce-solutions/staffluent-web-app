import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import {
     BarChart,
} from 'recharts'

export default function OperationalAnalytics() {
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
                        <h2 className='text-2xl font-bold tracking-tight'>Operational Analytics</h2>
                        <p className='text-sm text-muted-foreground'>
                            Monitor and analyze operational metrics
                        </p>
                    </div>
                </div>

                <div className='grid gap-4 md:grid-cols-4'>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>Efficiency Rate</CardTitle>
                            <BarChart className='h-4 w-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>0%</div>
                            <p className='text-xs text-muted-foreground'>Overall efficiency</p>
                        </CardContent>
                    </Card>
                </div>

                <div className='grid gap-6 md:grid-cols-2'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Trends</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='h-[300px] flex items-center justify-center text-muted-foreground'>
                                No data available
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Resource Utilization</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='h-[300px] flex items-center justify-center text-muted-foreground'>
                                No data available
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </Layout.Body>
        </Layout>
    )
}
