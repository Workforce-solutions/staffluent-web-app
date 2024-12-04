import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Card, CardContent } from '@/components/ui/card'
import { UserNav } from '@/components/user-nav'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import { useState } from 'react'
import { columns } from './components/columns'
import { ShiftResponse } from '@/@types/shifts'
import { Input } from '@/components/ui/input'

const ShiftsData: ShiftResponse[] = [
  {
    id: 1,
    date: '2023-01-01',
    start_time: '08:00',
    end_time: '16:00',
    status: 'Upcoming',
    avatar: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    date: '2023-01-02',
    start_time: '08:00',
    end_time: '16:00',
    status: 'In Progress',
    avatar: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    date: '2023-01-03',
    start_time: '08:00',
    end_time: '16:00',
    status: 'Completed',
    avatar: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    date: '2023-01-04',
    start_time: '08:00',
    end_time: '16:00',
    status: 'Time Off',
    avatar: 'https://via.placeholder.com/150',
  },
  {
    id: 5,
    date: '2023-01-05',
    start_time: '08:00',
    end_time: '16:00',
    status: 'Time Off',
    avatar: 'https://via.placeholder.com/150',
  },
]

export default function Shifts() {
  const [searchShift, setSearchShift] = useState('')


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
            <h2 className='text-2xl font-bold tracking-tight'>Shifts</h2>
            <p className='text-muted-foreground'>
              Manage and monitor your ongoing shifts
            </p>
          </div>
          <div className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0'>
            <Input
              placeholder='Search shift...'
              value={searchShift}
              onChange={(e) => setSearchShift(e.target.value)}
              className='w-full sm:w-64'
            />
          </div>
        </div>
        <Card className='mt-5 pb-5'>
          <CardContent className='pt-6'>
            <GenericTableWrapper
              data={ShiftsData}
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
