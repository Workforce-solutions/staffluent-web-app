'use client'

import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UserNav } from '@/components/user-nav'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Download, FilterIcon } from 'lucide-react'

interface OvertimeRecord {
  id: string
  employee: string
  department: string
  date: Date
  hours: number
  rate: number
  total: number
  status: 'Pending' | 'Approved' | 'Rejected'
}

const columns: ColumnDef<OvertimeRecord>[] = [
  {
    accessorKey: 'employee',
    header: 'Employee',
    cell: ({ row }) => (
      <div className='font-medium'>{row.getValue('employee')}</div>
    ),
  },
  {
    accessorKey: 'department',
    header: 'Department',
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => format(row.getValue('date'), 'MMM dd, yyyy'),
  },
  {
    accessorKey: 'hours',
    header: 'Hours',
  },
  {
    accessorKey: 'rate',
    header: 'Rate',
    cell: ({ row: { original } }) => `$${original.rate.toFixed(2)}`,
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row: { original } }) => `$${original.total.toFixed(2)}`,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return <Badge variant='outline'>{status}</Badge>
    },
  },
  {
    id: 'actions',
    cell: () => (
      <div className='text-right'>
        <Button variant='ghost' size='sm'>
          View
        </Button>
        <Button variant='ghost' size='sm'>
          Approve
        </Button>
      </div>
    ),
  },
]

const OvertimeList = () => {
  const data: OvertimeRecord[] = [
    {
      id: '1',
      employee: 'John Doe',
      department: 'IT',
      date: new Date(),
      hours: 2.5,
      rate: 25.0,
      total: 62.5,
      status: 'Pending',
    },
  ]

  return (
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>
      <div className='space-y-6 px-5'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-3xl font-bold tracking-tight'>
              Overtime Records
            </h2>
            <p className='text-muted-foreground'>
              View and manage overtime entries
            </p>
          </div>
          <div className='space-x-2'>
            <Button variant='outline'>
              <FilterIcon className='mr-2 h-4 w-4' />
              Filters
            </Button>
            <Button variant='outline'>
              <Download className='mr-2 h-4 w-4' />
              Export
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className='py-4'>
            <div className='flex space-x-2'>
              <Select defaultValue='all'>
                <SelectTrigger className='w-[150px]'>
                  <SelectValue placeholder='Department' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Departments</SelectItem>
                  <SelectItem value='it'>IT</SelectItem>
                  <SelectItem value='sales'>Sales</SelectItem>
                  <SelectItem value='support'>Support</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue='thisMonth'>
                <SelectTrigger className='w-[150px]'>
                  <SelectValue placeholder='Period' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='thisMonth'>This Month</SelectItem>
                  <SelectItem value='lastMonth'>Last Month</SelectItem>
                  <SelectItem value='thisQuarter'>This Quarter</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue='all'>
                <SelectTrigger className='w-[150px]'>
                  <SelectValue placeholder='Status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Status</SelectItem>
                  <SelectItem value='pending'>Pending</SelectItem>
                  <SelectItem value='approved'>Approved</SelectItem>
                  <SelectItem value='rejected'>Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <GenericTableWrapper columns={columns} data={data} />
      </div>
    </Layout>
  )
}

export default OvertimeList
