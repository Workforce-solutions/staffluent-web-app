import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    PlusCircle,
} from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export default function TeamSchedule() {
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
                        <h2 className='text-2xl font-bold tracking-tight'>Team Schedule</h2>
                        <p className='text-sm text-muted-foreground'>
                            Manage team schedules and shifts
                        </p>
                    </div>
                    <Button onClick={() => {}}>
                        <PlusCircle className='mr-2 h-4 w-4' />
                        Add Schedule
                    </Button>
                </div>

                {/* Calendar View */}
                <Card>
                    <CardHeader>
                        <div className='flex items-center justify-between'>
                            <CardTitle>Schedule Calendar</CardTitle>
                            <div className='flex items-center space-x-2'>
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
                        <div className='h-[600px] bg-muted/5'>
                            {/* Calendar component will go here */}
                            <p className='py-4 text-center text-sm text-muted-foreground'>
                                No schedules found
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </Layout.Body>
        </Layout>
    )
}