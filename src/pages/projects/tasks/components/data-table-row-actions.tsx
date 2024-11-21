import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDeleteTaskMutation } from '@/services/tasksApi'
import { useShortCode } from '@/hooks/use-local-storage'
import { useState } from 'react'
import CreateEditTask from './createTask'
import { TasksResponse } from '@/@types/tasks'
interface DataTableRowActionsProps {
  row: Row<TasksResponse>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const venue_short_code = useShortCode()
  const [deleteTasks] = useDeleteTaskMutation()
  const [openEditModal, setOpenEditModal] = useState(false)

  const handleDeleteTask = (e: any) => {
    deleteTasks({ id: e.id, venue_short_code })
  }

  const handleEditTask = () => {
    setOpenEditModal(true)
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
        <DropdownMenuContent align='center' className='w-[160px]'>
          <DropdownMenuItem onClick={handleEditTask}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDeleteTask(row.original)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreateEditTask
        open={openEditModal}
        setOpen={setOpenEditModal}
        task={row.original}
      />
    </>
  )
}
