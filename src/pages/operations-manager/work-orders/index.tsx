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

// operations-manager/work-orders/index.tsx
import {
    FileText,
    PlusCircle,
} from 'lucide-react'

export default function WorkOrders() {
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
                        <h2 className='text-2xl font-bold tracking-tight'>Work Orders</h2>
                        <p className='text-sm text-muted-foreground'>
                            Manage and track work orders
                        </p>
                    </div>
                    <Button onClick={() => {}}>
                        <PlusCircle className='mr-2 h-4 w-4' />
                        Create Work Order
                    </Button>
                </div>

                <div className='grid gap-4 md:grid-cols-4'>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>Open Orders</CardTitle>
                            <FileText className='h-4 w-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>0</div>
                            <p className='text-xs text-muted-foreground'>Pending work orders</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <div className='flex items-center justify-between'>
                            <CardTitle>Work Orders List</CardTitle>
                            <div className='flex items-center space-x-2'>
                                <Input
                                    placeholder='Search orders...'
                                    className='w-[200px]'
                                />
                                <Select>
                                    <SelectTrigger className='w-[150px]'>
                                        <SelectValue placeholder='Filter by status' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='all'>All Orders</SelectItem>
                                        <SelectItem value='pending'>Pending</SelectItem>
                                        <SelectItem value='in-progress'>In Progress</SelectItem>
                                        <SelectItem value='completed'>Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='py-4 text-center text-sm text-muted-foreground'>
                            No work orders found
                        </div>
                    </CardContent>
                </Card>
            </Layout.Body>
        </Layout>
    )
}