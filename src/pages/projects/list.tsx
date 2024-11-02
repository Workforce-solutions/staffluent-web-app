// src/pages/projects/index.tsx
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import { columns } from './components/columns'
import { projects } from './data/projects'
import { Button } from '@/components/custom/button'
import { PlusIcon } from 'lucide-react'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'

export default function Projects() {
  return (
    <Layout>
      <Layout.Header sticky>
        <Search />
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
            <Button>
              <PlusIcon className='mr-2 h-4 w-4' /> Add Project
            </Button>
          </div>
        </div>
        <div className='mt-4 flex-1 space-y-4'>
          <GenericTableWrapper data={projects} columns={columns} rowsSelected />
        </div>
      </Layout.Body>
    </Layout>
  )
}
