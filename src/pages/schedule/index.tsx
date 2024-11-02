import { useState } from 'react'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/custom/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment)

// Create a DnD version of the Calendar
const DnDCalendar = withDragAndDrop(Calendar)

// Mock data for staff and shifts
const staffMembers = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Bob Johnson' },
]

const initialEvents = [
    {
        id: 1,
        title: 'John Doe - Morning Shift',
        start: new Date(2024, 9, 14, 8, 0),
        end: new Date(2024, 9, 14, 16, 0),
        staffId: 1,
    },
    {
        id: 2,
        title: 'Jane Smith - Afternoon Shift',
        start: new Date(2024, 9, 14, 12, 0),
        end: new Date(2024, 9, 14, 20, 0),
        staffId: 2,
    },
]

export default function Schedule() {
    const [events, setEvents] = useState(initialEvents)
    const [selectedStaff, setSelectedStaff] = useState('all')

    // @ts-ignore
    const handleEventDrop = ({ event, start, end }) => {
        const updatedEvents = events.map(ev =>
            ev.id === event.id ? { ...ev, start, end } : ev
        )
        setEvents(updatedEvents)
    }

    // @ts-ignore
    const handleSelectSlot = ({ start, end }) => {
        const title = window.prompt('New shift title')
        if (title) {
            setEvents([
                ...events,
                {
                    start,
                    end,
                    title,
                    id: events.length + 1,
                    staffId: 0
                },
            ])
        }
    }

    const filteredEvents = selectedStaff === 'all'
        ? events
        : events.filter(event => event.staffId === parseInt(selectedStaff))

    return (
        <Layout>
            <Layout.Header>
                <div className='ml-auto flex items-center space-x-4'>
                    <Search />
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body className='space-y-4'>
                <div className='flex items-center justify-between space-y-2'>
                    <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
                        Schedule Management
                    </h1>
                    <Button>Publish Schedule</Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Staff Schedule</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex justify-between items-center">
                            <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Filter by staff" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Staff</SelectItem>
                                    {staffMembers.map(staff => (
                                        <SelectItem key={staff.id} value={staff.id.toString()}>{staff.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button variant="outline">Add New Shift</Button>
                        </div>
                        <div style={{ height: '600px' }}>
                            <DnDCalendar
                                localizer={localizer}
                                events={filteredEvents}
                                onEventDrop={handleEventDrop}
                                onSelectSlot={handleSelectSlot}
                                selectable
                                resizable
                                defaultView="week"
                                views={['day', 'week', 'month']}
                            />
                        </div>
                    </CardContent>
                </Card>
            </Layout.Body>
        </Layout>
    )
}