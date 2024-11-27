// operations-manager/clients/index.tsx

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
import {Users} from "lucide-react";

export default function ClientManagement() {
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
                        <h2 className='text-2xl font-bold tracking-tight'>Clients</h2>
                        <p className='text-sm text-muted-foreground'>
                            Manage client relationships
                        </p>
                    </div>
                </div>

                <div className='grid gap-4 md:grid-cols-4'>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>Active Clients</CardTitle>
                            <Users className='h-4 w-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>0</div>
                            <p className='text-xs text-muted-foreground'>Total active clients</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <div className='flex items-center justify-between'>
                            <CardTitle>Client List</CardTitle>
                            <div className='flex items-center space-x-2'>
                                <Input
                                    placeholder='Search clients...'
                                    className='w-[200px]'
                                />
                                <Select>
                                    <SelectTrigger className='w-[150px]'>
                                        <SelectValue placeholder='Filter by type' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='all'>All Types</SelectItem>
                                        <SelectItem value='individual'>Individual</SelectItem>
                                        <SelectItem value='business'>Business</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='py-4 text-center text-sm text-muted-foreground'>
                            No clients found
                        </div>
                    </CardContent>
                </Card>
            </Layout.Body>
        </Layout>
    )
}