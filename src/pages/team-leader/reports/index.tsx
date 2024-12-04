import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// reports/index.tsx
import {
    Download,
    Users,
} from 'lucide-react'

export default function Reports() {
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
                        <h2 className='text-2xl font-bold tracking-tight'>Reports</h2>
                        <p className='text-sm text-muted-foreground'>
                            Team performance and analytics
                        </p>
                    </div>
                    <Button onClick={() => {}}>
                        <Download className='mr-2 h-4 w-4' />
                        Export Report
                    </Button>
                </div>

                {/* Report Selection */}
                <div className='grid gap-4 md:grid-cols-3'>
                    <Card className='cursor-pointer hover:bg-muted/50'>
                        <CardHeader>
                            <CardTitle className='flex items-center'>
                                <Users className='mr-2 h-5 w-5' />
                                Team Performance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-sm text-muted-foreground'>
                                View team productivity and performance metrics
                            </p>
                        </CardContent>
                    </Card>

                    {/* Add other report types */}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Report Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className='py-4 text-center text-sm text-muted-foreground'>
                            Select a report to view
                        </p>
                    </CardContent>
                </Card>
            </Layout.Body>
        </Layout>
    )
}