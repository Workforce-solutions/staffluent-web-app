import { useState, useCallback, useEffect } from 'react'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/custom/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
// @ts-ignore
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetEmployeesQuery } from '@/services/staffApi'
import { useGetCalendarEventsQuery, useCreateScheduleMutation } from '@/services/scheduleApi'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop(Calendar)

interface CreateShiftDialog {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedSlot?: { start: Date; end: Date }
  onSuccess: () => void
}

function CreateShiftDialog({ open, onOpenChange, selectedSlot, onSuccess }: CreateShiftDialog) {
  const { toast } = useToast()
  const venue_short_code = useShortCode()
  const { data: employees = [] } = useGetEmployeesQuery(venue_short_code)
  const [createSchedule] = useCreateScheduleMutation()
  const [employeeId, setEmployeeId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setEmployeeId('')
    }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSlot || !employeeId) return

    setIsSubmitting(true)
    try {
      await createSchedule({
        venue_short_code,
        data: {
          employee_id: Number(employeeId),
          date: moment(selectedSlot.start).format('YYYY-MM-DD'),
          start_time: moment(selectedSlot.start).format('HH:mm:ss'),
          end_time: moment(selectedSlot.end).format('HH:mm:ss'),
          schedule_type: 'shift'
        }
      }).unwrap()

      toast({
        title: 'Success',
        description: 'Shift created successfully'
      })
      onSuccess()
      onOpenChange(false)
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.data?.message || 'Failed to create shift',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Shift</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Employee</label>
              <Select value={employeeId} onValueChange={setEmployeeId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees?.map(emp => (
                      <SelectItem key={emp.id} value={emp.id.toString()}>
                        {emp.name}
                      </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time</label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-muted-foreground">Start</label>
                  <Input
                      type="text"
                      value={selectedSlot ? moment(selectedSlot.start).format('HH:mm') : ''}
                      disabled
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">End</label>
                  <Input
                      type="text"
                      value={selectedSlot ? moment(selectedSlot.end).format('HH:mm') : ''}
                      disabled
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || !employeeId}>
                {isSubmitting ? 'Creating...' : 'Create Shift'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
  )
}

export default function Schedule() {
  const venue_short_code = useShortCode()
  const [selectedStaff, setSelectedStaff] = useState('all')
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date }>()
  const [dateRange, setDateRange] = useState({
    start: moment().startOf('week').format('YYYY-MM-DD'),
    end: moment().endOf('week').format('YYYY-MM-DD')
  })

  const { data: employees = [] } = useGetEmployeesQuery(venue_short_code)
  // @ts-ignore
  const { data: events = [], refetch: refetchEvents } = useGetCalendarEventsQuery({
    venue_short_code,
    ...dateRange
  })

  const handleRangeChange = useCallback((range: Date[] | { start: Date; end: Date }) => {
    if (Array.isArray(range)) {
      setDateRange({
        start: moment(range[0]).format('YYYY-MM-DD'),
        end: moment(range[range.length - 1]).format('YYYY-MM-DD')
      })
    } else {
      setDateRange({
        start: moment(range.start).format('YYYY-MM-DD'),
        end: moment(range.end).format('YYYY-MM-DD')
      })
    }
  }, [])

  const handleSelectSlot = useCallback(({ start, end }: { start: Date; end: Date }) => {
    // Don't allow creating shifts in the past
    if (moment(start).isBefore(moment(), 'day')) {
      return
    }
    setSelectedSlot({ start, end })
    setCreateDialogOpen(true)
  }, [])

  const filteredEvents = selectedStaff === 'all'
      ? events
      : events?.filter(event => event.employee.id === Number(selectedStaff))

  const formattedEvents = filteredEvents?.map(event => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end)
  })) ?? []

  return (
      <Layout>
        <Layout.Header>
          <Search />
          <div className='ml-auto flex items-center space-x-2'>
            <ThemeSwitch />
            <UserNav />
          </div>
        </Layout.Header>

        <Layout.Body className='space-y-4'>
          <div className='flex items-center justify-between space-y-2'>
            <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
              Schedule Management
            </h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Staff Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='mb-4 flex items-center justify-between'>
                <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                  <SelectTrigger className='w-[200px]'>
                    <SelectValue placeholder='Filter by staff' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Staff</SelectItem>
                    {employees?.map((emp) => (
                        <SelectItem key={emp.id} value={emp.id.toString()}>
                          {emp.name}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='h-[600px] bg-background'>
                <DnDCalendar
                    localizer={localizer}
                    events={formattedEvents}
                    onSelectSlot={handleSelectSlot}
                    onRangeChange={handleRangeChange}
                    selectable
                    resizable
                    defaultView={Views.WEEK}
                    views={[Views.DAY, Views.WEEK, Views.MONTH]}
                    min={moment().set('hours', 6).toDate()} // Start at 6 AM
                    max={moment().set('hours', 23).set('minutes', 59).toDate()} // End at midnight
                    step={30} // 30 minute intervals
                    timeslots={2} // Show 2 slots per step (15 minutes each)
                    // @ts-ignore
                    eventPropGetter={(event) => ({
                      style: {
                        backgroundColor: event.backgroundColor
                      }
                    })}
                />
              </div>
            </CardContent>
          </Card>

          <CreateShiftDialog
              open={createDialogOpen}
              onOpenChange={setCreateDialogOpen}
              selectedSlot={selectedSlot}
              onSuccess={refetchEvents}
          />
        </Layout.Body>
      </Layout>
  )
}