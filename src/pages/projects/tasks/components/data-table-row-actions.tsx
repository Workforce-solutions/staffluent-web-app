// src/pages/projects/components/data-table-row-actions.tsx
import { useState } from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { labels, assignees } from '../data/data'
import { taskSchema } from '../data/schema'
import { TimeEntriesList } from './time-entries-list'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original)
  const [isAssigneeModalOpen, setIsAssigneeModalOpen] = useState(false)
  const [isTimeEntriesModalOpen, setIsTimeEntriesModalOpen] = useState(false)

  const handleAssigneeChange = (value: string) => {
    // Here you would update the task's assignee
    console.log(`Assigning task to ${value}`)
    setIsAssigneeModalOpen(false)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <DropdownMenuItem onSelect={() => setIsAssigneeModalOpen(true)}>
            Change Assignee
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsTimeEntriesModalOpen(true)}>
            View Time Entries
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={task.label}>
                {labels.map((label) => (
                  <DropdownMenuRadioItem key={label.value} value={label.value}>
                    {label.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isAssigneeModalOpen} onOpenChange={setIsAssigneeModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Assignee</DialogTitle>
          </DialogHeader>
          <Select
            onValueChange={handleAssigneeChange}
            defaultValue={task.assignee || 'unassigned'}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select an assignee' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='unassigned'>Unassigned</SelectItem>
              {assignees.map((assignee) => (
                <SelectItem key={assignee.value} value={assignee.value}>
                  {assignee.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isTimeEntriesModalOpen}
        onOpenChange={setIsTimeEntriesModalOpen}
      >
        <DialogContent className='max-w-3xl'>
          <DialogHeader>
            <DialogTitle>Time Entries for {task.id}</DialogTitle>
          </DialogHeader>
          <TimeEntriesList timeEntries={task.timeEntries || []} />
        </DialogContent>
      </Dialog>
    </>
  )
}
