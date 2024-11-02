// src/pages/projects/components/time-entries-list.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface TimeEntry {
  id: string
  date: string
  duration: number
  description: string
}

interface TimeEntriesListProps {
  timeEntries: TimeEntry[]
}

export function TimeEntriesList({ timeEntries }: TimeEntriesListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Duration (hours)</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {timeEntries.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className='text-center'>
              No time entries logged for this task.
            </TableCell>
          </TableRow>
        ) : (
          timeEntries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.duration}</TableCell>
              <TableCell>{entry.description}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
