import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import { columns } from './components/columns'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetTasksListQuery } from '@/services/tasksApi'

export default function Tasks() {
  const short_code = useShortCode()
  const {
    data: tasks,
    isFetching,
    isError,
  } = useGetTasksListQuery({ venue_short_code: short_code })

  return (
    <Layout>
      <Layout.Header sticky>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Tasks</h2>
            <p className='text-muted-foreground'>Manage your tasks list</p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <GenericTableWrapper
            data={tasks?.tasks}
            columns={columns}
            showToolbar
            isLoading={isFetching}
            isError={isError}
          />
        </div>
      </Layout.Body>
    </Layout>
  )
}
