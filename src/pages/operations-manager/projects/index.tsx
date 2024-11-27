import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

export default function TeamLeaderProjects() {
    // @ts-ignore
    const [open, setOpen] = useState(false)

    // @ts-ignore
    const columns = [
        // Add columns definition here
    ]

    return (
        <Layout>
            {/* Modal will go here */}
            <Layout.Header sticky>
                <div className='ml-auto flex items-center space-x-2'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <div className='flex items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Team Projects</h2>
                        <p className='text-muted-foreground'>
                            Manage and monitor your team's projects
                        </p>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <Button onClick={() => setOpen(true)}>
                            <PlusIcon className='mr-2 h-4 w-4' /> Add Project
                        </Button>
                    </div>
                </div>
                <div className='mt-4 flex-1 space-y-4'>
                    <GenericTableWrapper
                        data={[]}
                        // @ts-ignore
                        columns={columns}
                        rowsSelected
                        isError={false}
                        isLoading={false}
                    />
                </div>
            </Layout.Body>
        </Layout>
    )
}