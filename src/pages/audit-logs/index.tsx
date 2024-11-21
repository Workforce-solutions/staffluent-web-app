// src/pages/audit-logs/index.tsx

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Layout } from '@/components/custom/layout'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { format } from 'date-fns'
import { CalendarIcon, DownloadIcon, RefreshCwIcon } from 'lucide-react'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { useShortCode } from '@/hooks/use-local-storage'
import { useExportAuditLogsMutation, useGetAuditLogsQuery } from '@/services/auditLogsApi'

export default function AuditLogs() {
  const shortCode = useShortCode()
  const [date, setDate] = useState<Date>()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAction, setSelectedAction] = useState('all')
  const [page, setPage] = useState(1)

  const { data, isLoading, refetch } = useGetAuditLogsQuery({
    venue_short_code: shortCode,
    page,
    search: searchTerm,
    action: selectedAction === 'all' ? undefined : selectedAction,
    date: date ? format(date, 'yyyy-MM-dd') : undefined
  })

  const [exportLogs] = useExportAuditLogsMutation()

  const handleExport = async (format: 'csv' | 'pdf' | 'json') => {
    try {
      const blob = await exportLogs({
        venue_short_code: shortCode,
        format: 'csv',
        search: searchTerm,
        action: selectedAction === 'all' ? undefined : selectedAction,
        // @ts-ignore
        date: date ? format(date, 'yyyy-MM-dd') : undefined
      }).unwrap()

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `audit_logs.${format}`
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Failed to export logs:', error)
    }
  }

  const severityColorMap: Record<string, string> = {
    'High': 'bg-red-100 text-red-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'Low': 'bg-green-100 text-green-800'
  }

  const handleApplyFilters = () => {
    setPage(1)
    refetch()
  }

  return (
      <Layout>
        <Layout.Header>
          <div className='ml-auto flex items-center space-x-2'>
            <ThemeSwitch />
            <UserNav />
          </div>
        </Layout.Header>

        <Layout.Body className='space-y-4'>
          <div className='flex items-center justify-between space-y-2'>
            <div>
              <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
                Audit Logs
              </h1>
              <p className='text-sm text-muted-foreground'>
                All your audit logs
              </p>
            </div>
            <div className='flex space-x-2'>
              <Button variant='outline' size='sm' onClick={() => refetch()}>
                <RefreshCwIcon className='mr-2 h-4 w-4' />
                Refresh
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' size='sm'>
                    <DownloadIcon className='mr-2 h-4 w-4' />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Choose format</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => handleExport('csv')}>
                    Export as CSV
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className='space-y-4 md:flex md:items-center md:justify-between md:space-y-0'>
            <div className='space-y-2 md:flex md:flex-1 md:items-center md:space-x-2 md:space-y-0'>
              <Input
                  placeholder='Filter logs...'
                  className='w-full md:w-[250px]'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select value={selectedAction} onValueChange={setSelectedAction}>
                <SelectTrigger className='w-full md:w-[180px]'>
                  <SelectValue placeholder='Select action' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Actions</SelectItem>
                  {data?.filters.actions.map((action) => (
                      <SelectItem key={action} value={action}>
                        {action}
                      </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                      variant='outline'
                      className='w-full justify-start text-left font-normal md:w-[180px]'
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                      mode='single'
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Button className='w-full md:w-auto' onClick={handleApplyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>

          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <div className='rounded-lg border p-3'>
              <div className='text-sm font-medium'>Total Logs</div>
              <div className='text-2xl font-bold'>{data?.summary.total_logs || 0}</div>
            </div>
            <div className='rounded-lg border p-3'>
              <div className='text-sm font-medium'>Unique Users</div>
              <div className='text-2xl font-bold'>{data?.summary.unique_users || 0}</div>
            </div>
            <div className='rounded-lg border p-3'>
              <div className='text-sm font-medium'>Actions Today</div>
              <div className='text-2xl font-bold'>{data?.summary.actions_today || 0}</div>
            </div>
            <div className='rounded-lg border p-3'>
              <div className='text-sm font-medium'>Critical Events</div>
              <div className='text-2xl font-bold'>{data?.summary.critical_events || 0}</div>
            </div>
          </div>

          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                ) : !data?.logs?.length ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No logs found
                      </TableCell>
                    </TableRow>
                ) : (
                    data.logs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className='font-medium'>{log.action}</TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell>{format(new Date(log.timestamp), 'PPp')}</TableCell>
                          <TableCell>{log.details}</TableCell>
                          <TableCell>
                            <Badge variant='outline' className={severityColorMap[log.severity]}>
                              {log.severity}
                            </Badge>
                          </TableCell>
                        </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </div>

          {data?.pagination && (
              <div className='flex items-center justify-between py-4'>
                <div className='flex-1 text-sm text-muted-foreground'>
                  Showing{' '}
                  <span className='font-medium'>
               {((data.pagination.current_page - 1) * data.pagination.per_page) + 1}
             </span>{' '}
                  to{' '}
                  <span className='font-medium'>
               {Math.min(
                   data.pagination.current_page * data.pagination.per_page,
                   data.pagination.total
               )}
             </span>{' '}
                  of <span className='font-medium'>{data.pagination.total}</span> results
                </div>
                <div className='flex items-center space-x-2'>
                  <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1 || isLoading}
                  >
                    Previous
                  </Button>
                  <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setPage(page + 1)}
                      disabled={page === data?.pagination.total_pages || isLoading}
                  >
                    Next
                  </Button>
                </div>
              </div>
          )}
        </Layout.Body>
      </Layout>
  )
}