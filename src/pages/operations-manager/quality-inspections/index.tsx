import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import {
    PlusCircle,
    ClipboardCheck,
} from 'lucide-react'

export default function QualityInspections() {
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
                        <h2 className='text-2xl font-bold tracking-tight'>Quality Inspections</h2>
                        <p className='text-sm text-muted-foreground'>
                            Track and manage quality control
                        </p>
                    </div>
                    <Button onClick={() => {}}>
                        <PlusCircle className='mr-2 h-4 w-4' />
                        New Inspection
                    </Button>
                </div>

                {/* Stats Overview */}
                <div className='grid gap-4 md:grid-cols-4'>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>Total Inspections</CardTitle>
                            <ClipboardCheck className='h-4 w-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>0</div>
                            <p className='text-xs text-muted-foreground'>This month</p>
                        </CardContent>
                    </Card>

                    {/* Add more inspection stats */}
                </div>

                <Card>
                    <CardHeader>
                        <div className='flex items-center justify-between'>
                            <CardTitle>Recent Inspections</CardTitle>
                            <div className='flex items-center space-x-2'>
                                <Input
                                    placeholder='Search inspections...'
                                    className='w-[150px] sm:w-[250px]'
                                />
                                <Select>
                                    <SelectTrigger className='w-[150px]'>
                                        <SelectValue placeholder='Filter by status' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='all'>All Status</SelectItem>
                                        <SelectItem value='pending'>Pending</SelectItem>
                                        <SelectItem value='completed'>Completed</SelectItem>
                                        <SelectItem value='failed'>Failed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className='py-4 text-center text-sm text-muted-foreground'>
                            No inspections found
                        </p>
                    </CardContent>
                </Card>
            </Layout.Body>
        </Layout>
    )
}