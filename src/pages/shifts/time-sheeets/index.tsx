/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import { columns } from './components/columns'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import { Input } from '@/components/ui/input'

const attendanceRecords = [
  {
    id: 1,
    title: 'Break',
    start: '2024-10-10 08:00 AM',
    end: '2024-10-15 6:00 PM',
    type: 'Lunch',
    paid: 'Yes',
  },
  {
    id: 2,
    title: 'Break',
    start: '2023-01-01 08:00 AM',
    end: '2023-01-01 6:00 PM',
    type: 'Lunch',
    paid: 'No',
  },
  {
    id: 3,
    title: 'Break',
    start: '2023-01-01 08:00 AM',
    end: '2023-01-01 6:00 PM',
    type: 'Lunch',
    paid: 'No',
  },
  {
    id: 4,
    title: 'Break',
    start: '2023-01-01 08:00 AM',
    end: '2023-01-01 6:00 PM',
    type: 'Lunch',
    paid: 'Yes',
  },
]

export default function TimeSheets() {

  const [searchTimeSheet, setSearchTimeSheet] = useState('')
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
        <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Time Sheets</h2>
            <p className='text-muted-foreground'>
              Manage and monitor your ongoing time sheets
            </p>
          </div>
          <div className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0'>
            <Input
              placeholder='Search time sheet...'
              value={searchTimeSheet}
              onChange={(e) => setSearchTimeSheet(e.target.value)}
              className='w-full sm:w-64'
            />
          </div>
        </div>
        <Card className='mt-5 pb-5'>
          <CardContent className='pt-6'>
            <GenericTableWrapper
              data={attendanceRecords as any}
              columns={columns}
              rowsSelected
            // {...{ isError }}
            // isLoading={isFetching}
            />
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
