import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useDeleteTaskMutation } from '@/services/tasksApi'
import { useShortCode } from '@/hooks/use-local-storage'
import { useState } from 'react'
import CreateEditTask from './createTask'
import { TasksResponse } from '@/@types/tasks'
import { toast } from '@/components/ui/use-toast'

interface DataTableRowActionsProps {
  row: Row<TasksResponse>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const venue_short_code = useShortCode()
  const [deleteTasks] = useDeleteTaskMutation()
  const [openEditModal, setOpenEditModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDeleteTask = async () => {
    try {
      await deleteTasks({
        id: row.original.id,
        venue_short_code
      }).unwrap()

      toast({
        title: "Success",
        description: "Task deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      })
    } finally {
      setShowDeleteConfirm(false)
    }
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
            <DropdownMenuItem
                onClick={() => setShowDeleteConfirm(true)}
                className="text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This action will delete the task.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                  onClick={handleDeleteTask}
                  className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <CreateEditTask
            open={openEditModal}
            setOpen={setOpenEditModal}
            task={row.original}
        />
      </>
  )
}