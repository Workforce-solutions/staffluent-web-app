import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

import {
    ShieldCheck,
    PlusCircle,
} from 'lucide-react'

export default function ComplianceManagement() {
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
                        <h2 className='text-2xl font-bold tracking-tight'>Compliance Management</h2>
                        <p className='text-sm text-muted-foreground'>
                            Monitor compliance and safety standards
                        </p>
                    </div>
                    <Button onClick={() => {}}>
                        <PlusCircle className='mr-2 h-4 w-4' />
                        New Assessment
                    </Button>
                </div>

                <div className='grid gap-4 md:grid-cols-4'>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>Compliance Rate</CardTitle>
                            <ShieldCheck className='h-4 w-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>0%</div>
                            <p className='text-xs text-muted-foreground'>Overall compliance</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <div className='flex items-center justify-between'>
                            <CardTitle>Compliance Reports</CardTitle>
                            <div className='flex items-center space-x-2'>
                                <Input
                                    placeholder='Search reports...'
                                    className='w-[200px]'
                                />
                                <Select>
                                    <SelectTrigger className='w-[150px]'>
                                        <SelectValue placeholder='Filter by type' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='all'>All Reports</SelectItem>
                                        <SelectItem value='safety'>Safety</SelectItem>
                                        <SelectItem value='regulatory'>Regulatory</SelectItem>
                                        <SelectItem value='quality'>Quality</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='py-4 text-center text-sm text-muted-foreground'>
                            No compliance reports found
                        </div>
                    </CardContent>
                </Card>
            </Layout.Body>
        </Layout>
    )
}