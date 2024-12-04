/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserNav } from '@/components/user-nav'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import { useState } from 'react'
import { columns } from './components/columns'
import { Input } from '@/components/ui/input'

const attendanceRecords: any[] = [
  {
    id: 'E123',
    title: 'John smith',
    status: 'In Progress',
    start: '12:00 AM',
    duration: '30 Mins',
    type: 'Lunch',
    remaining: '12 Mins',
  },
  {
    id: 'E123',
    title: 'John smith',
    status: 'In Progress',
    start: '12:00 AM',
    duration: '30 Mins',
    type: 'Lunch',
    remaining: '12 Mins',
  },
  {
    id: 'E123',
    title: 'John smith',
    status: 'Active',
    start: '12:00 AM',
    duration: '30 Mins',
    type: 'Lunch',
    remaining: '12 Mins',
  },
  {
    id: 'E123',
    title: 'John smith',
    status: 'Open',
    start: '12:00 AM',
    duration: '30 Mins',
    type: 'Lunch',
    remaining: '12 Mins',
  },
]

export default function Breaks() {
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    search: '',
    page: 1,
    per_page: 10,
  })
  const [searchBreak, setSearchBreak] = useState('')

  const handleStatusChange = (status: string) => {
    setFilters((prev) => ({
      ...prev,
      status,
      page: 1,
    }))
  }

  return (
    <Layout>
      {/* <CreateEditProjectModal open={open} setOpen={setOpen} /> */}

      <Layout.Header sticky>
        <div className='ml-auto flex items-center space-x-2'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0 justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Breaks</h2>
            <p className='text-muted-foreground'>
              Manage and monitor your ongoing breaks
            </p>
          </div>
          <div className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0'>
            <Input
              placeholder='Search break...'
              value={searchBreak}
              onChange={(e) => setSearchBreak(e.target.value)}
              className='w-full sm:w-64'
            />
          </div>
        </div>
        <Card className='mt-5 p-5'>
          <Tabs value={filters.status} onValueChange={handleStatusChange}>
            <TabsList>
              <TabsTrigger value='active_breaks'>Active Breaks</TabsTrigger>
              <TabsTrigger value='overtime_requests'>
                Overtime Requests
              </TabsTrigger>
              <TabsTrigger value='employee_breaks'>Employee Breaks</TabsTrigger>
            </TabsList>

            <TabsContent value={filters.status}>
              <GenericTableWrapper
                data={attendanceRecords}
                columns={columns}
                rowsSelected
              />
            </TabsContent>
          </Tabs>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
