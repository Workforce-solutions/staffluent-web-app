import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
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
    MessageSquare,
} from 'lucide-react'

// operations-manager/client-requests/index.tsx
export default function ClientRequests() {
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
                        <h2 className='text-2xl font-bold tracking-tight'>Client Requests</h2>
                        <p className='text-sm text-muted-foreground'>
                            Manage and process client requests
                        </p>
                    </div>
                </div>

                <div className='grid gap-4 md:grid-cols-4'>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>Open Requests</CardTitle>
                            <MessageSquare className='h-4 w-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>0</div>
                            <p className='text-xs text-muted-foreground'>Pending requests</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <div className='flex items-center justify-between'>
                            <CardTitle>Request List</CardTitle>
                            <div className='flex items-center space-x-2'>
                                <Input
                                    placeholder='Search requests...'
                                    className='w-[200px]'
                                />
                                <Select>
                                    <SelectTrigger className='w-[150px]'>
                                        <SelectValue placeholder='Filter by status' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='all'>All Requests</SelectItem>
                                        <SelectItem value='pending'>Pending</SelectItem>
                                        <SelectItem value='in-review'>In Review</SelectItem>
                                        <SelectItem value='approved'>Approved</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='py-4 text-center text-sm text-muted-foreground'>
                            No requests found
                        </div>
                    </CardContent>
                </Card>
            </Layout.Body>
        </Layout>
    )
}

