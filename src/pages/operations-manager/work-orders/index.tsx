import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// operations-manager/work-orders/index.tsx
import {
    FileText,
    PlusCircle,
} from 'lucide-react'
import { useGetWorkOrdersListQuery } from '@/services/operationMangerApi'
import { useShortCode } from '@/hooks/use-local-storage'
import { useState } from 'react'
import { CreateEditOrderModal } from './create-edit-order'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import { columns } from './components/columns'

export default function WorkOrders() {

    const short_code = useShortCode()

    const { data: workOrders }: any = useGetWorkOrdersListQuery({
        id: 3,
        venue_short_code: short_code,
    })

    const [open, setOpen] = useState(false)

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
                    <Button onClick={() => setOpen(true)}>
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

                <Card className='p-5'>
                    <div className='mt-4 flex-1 space-y-4'>
                        <GenericTableWrapper
                            data={workOrders?.work_orders}
                            columns={columns}
                            rowsSelected
                        // {...{ isError }}
                        // isLoading={isFetching}
                        />
                    </div>
                </Card>
            </Layout.Body>

            <CreateEditOrderModal open={open} setOpen={setOpen} />
        </Layout>
    )
}