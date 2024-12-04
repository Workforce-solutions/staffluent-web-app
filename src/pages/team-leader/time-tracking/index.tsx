import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    Clock,
    PlusCircle,
} from 'lucide-react'
import { DatePicker } from '@/components/ui/date-picker'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export default function TimeTracking() {
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
                        <h2 className='text-2xl font-bold tracking-tight'>Time Tracking</h2>
                        <p className='text-sm text-muted-foreground'>
                            Monitor team time and attendance
                        </p>
                    </div>
                    <Button onClick={() => {}}>
                        <PlusCircle className='mr-2 h-4 w-4' />
                        Add Time Entry
                    </Button>
                </div>

                {/* Stats Overview */}
                <div className='grid gap-4 md:grid-cols-4'>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>Total Hours</CardTitle>
                            <Clock className='h-4 w-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>0h</div>
                            <p className='text-xs text-muted-foreground'>This month</p>
                        </CardContent>
                    </Card>

                    {/* Add other time tracking stats */}
                </div>

                <Card>
                    <CardHeader>
                        <div className='flex items-center justify-between'>
                            <CardTitle>Time Entries</CardTitle>
                            <div className='flex items-center space-x-2'>
                                <DatePicker />
                                <Select>
                                    <SelectTrigger className='w-[150px]'>
                                        <SelectValue placeholder='Filter by member' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='all'>All Members</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className='py-4 text-center text-sm text-muted-foreground'>
                            No time entries found
                        </p>
                    </CardContent>
                </Card>
            </Layout.Body>
        </Layout>
    )
}