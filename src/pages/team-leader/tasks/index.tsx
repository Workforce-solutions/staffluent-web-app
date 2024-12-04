import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'

export default function TeamLeaderTasks() {
    // @ts-ignore
    const columns = [
        // Add columns definition here
    ]

    return (
        <Layout>
            <Layout.Header sticky>
                <div className='ml-auto flex items-center space-x-2'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <div className='mb-2 flex items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Team Tasks</h2>
                        <p className='text-muted-foreground'>Manage your team's tasks</p>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <Button onClick={() => {}}>
                            <PlusIcon className='mr-2 h-4 w-4' /> Add Task
                        </Button>
                    </div>
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                    <GenericTableWrapper
                        data={[]}
                        // @ts-ignore
                        columns={columns}
                        showToolbar
                        isLoading={false}
                        isError={false}
                    />
                </div>
            </Layout.Body>
        </Layout>
    )
}