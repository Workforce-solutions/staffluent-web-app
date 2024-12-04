/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Card, CardContent } from '@/components/ui/card'
import { UserNav } from '@/components/user-nav'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import { Pointer, QrCode, SquareMenu } from 'lucide-react'
import { useState } from 'react'
import { columns } from './components/columns'
import { Input } from '@/components/ui/input'

const attendanceRecords = [
  {
    id: 1,
    total_hours: 8,
    date: '2024-10-10',
    start_time: '08:00 AM',
    end_time: '6:00 PM',
    status: 'On-time',
    punching: 'NFC',
    icon: <SquareMenu />,
  },
  {
    id: 2,
    total_hours: 8,
    date: '2023-01-01',
    start_time: '08:00 AM',
    end_time: '6:00 PM',
    status: 'Late',
    punching: 'Scan',
    icon: <QrCode />,
  },
  {
    id: 3,
    total_hours: 8,
    date: '2023-01-01',
    start_time: '08:00 AM',
    end_time: '6:00 PM',
    status: 'Early',
    punching: 'Self',
    icon: <Pointer />,
  },
  {
    id: 4,
    total_hours: 8,
    date: '2024-10-10',
    start_time: '08:00 AM',
    end_time: '6:00 PM',
    status: 'On-time',
    punching: 'NFC',
    icon: <SquareMenu />,
  },
]

export default function AttendanceReport() {

  const [searchAttendance, setSearchAttendance] = useState('')
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
        {/* <div className='flex-1 space-y-4'>
          <SearchWithStatus
            {...{ filters, handleSearch, handleStatusChange }}
            description='Manage and monitor your ongoing records'
            title=' Attendence Records'
          />
        </div> */}
        <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Attendence Records</h2>
            <p className='text-muted-foreground'>
              Manage and monitor your ongoing records
            </p>
          </div>
          <div className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0'>
            <Input
              placeholder='Search attendance...'
              value={searchAttendance}
              onChange={(e) => setSearchAttendance(e.target.value)}
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
