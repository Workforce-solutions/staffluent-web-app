import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetProjectsListQuery } from '@/services/projectApi'
import { useState } from 'react'
import { columns } from './components/columns'
import { CreateEditProjectModal } from './components/create-edit-project'
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'

export default function Projects() {
  const short_code = useShortCode()
  const {
    data: projects,
    isFetching,
    isError,
  } = useGetProjectsListQuery({
    venue_short_code: short_code,
  })

  const [open, setOpen] = useState(false)

  return (
    <Layout>
      <CreateEditProjectModal open={open} setOpen={setOpen} />

      <Layout.Header sticky>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Projects</h2>
            <p className='text-muted-foreground'>
              Manage and monitor your ongoing projects
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
            data={projects?.projects}
            columns={columns}
            rowsSelected
            {...{ isError }}
            isLoading={isFetching}
          />
        </div>
      </Layout.Body>
    </Layout>
  )
}
