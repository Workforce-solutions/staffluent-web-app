import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Eye, Users, Check, RotateCw, Trash2 } from 'lucide-react'
import { useShortCode } from '@/hooks/use-local-storage'
import { useDeleteProjectMutation, useUpdateProjectMutation } from '@/services/projectApi'
import { toast } from '@/components/ui/use-toast'
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
import { useState } from 'react'

interface QualityInspection {
  id: number
  name: string
  status: string
  project_category: string
}

interface DataTableRowActionsProps {
  row: Row<QualityInspection>
}

type ConfirmationType = 'delete' | 'archive' | 'status' | null;

interface ConfirmationConfig {
  title: string;
  description: string;
  actionText: string;
  actionClass?: string;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const short_code = useShortCode()
  const [updateProject] = useUpdateProjectMutation()
  const [deleteProject] = useDeleteProjectMutation()
  const [showConfirmation, setShowConfirmation] = useState<ConfirmationType>(null)

  const qualityInspection = row.original
  const canDelete = qualityInspection.status !== 'in_progress'

  const getConfirmationConfig = (type: ConfirmationType): ConfirmationConfig => {
    switch (type) {
      case 'delete':
        return {
          title: 'Delete Project',
          description: `Are you sure you want to delete "${qualityInspection.name}"? This action cannot be undone.`,
          actionText: 'Delete',
          actionClass: 'bg-red-600 hover:bg-red-700'
        }
      case 'archive':
        return {
          title: 'Archive Project',
          description: `Are you sure you want to archive "${qualityInspection.name}"? The project will be moved to archives.`,
          actionText: 'Archive',
          actionClass: 'bg-orange-600 hover:bg-orange-700'
        }
      case 'status':
        return {
          title: qualityInspection.status === 'in_progress' ? 'Complete Project' : 'Reactivate Project',
          description: qualityInspection.status === 'in_progress'
            ? `Are you sure you want to mark "${qualityInspection.name}" as completed?`
            : `Are you sure you want to reactivate "${qualityInspection.name}"?`,
          actionText: qualityInspection.status === 'in_progress' ? 'Complete' : 'Reactivate',
          actionClass: 'bg-primary hover:bg-primary/90'
        }
      default:
        return {
          title: '',
          description: '',
          actionText: '',
        }
    }
  }

  const handleStatusChange = async () => {
    try {
      const newStatus = qualityInspection.status === 'in_progress' ? 'completed' : 'in_progress'

      await updateProject({
        id: qualityInspection.id,
        venue_short_code: short_code,
        // @ts-ignore
        data: { status: newStatus }
      }).unwrap()

      toast({
        title: 'Success',
        description: qualityInspection.status === 'in_progress'
          ? 'Inspection marked as completed'
          : 'Inspection reactivated',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update inspection status',
        variant: 'destructive',
      })
    } finally {
      setShowConfirmation(null)
    }
  }

  const handleDeleteProject = async () => {
    try {
      await deleteProject({
        id: qualityInspection.id,
        venue_short_code: short_code
      }).unwrap()

      toast({
        title: 'Success',
        description: 'Inspection deleted successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete inspection',
        variant: 'destructive',
      })
    } finally {
      setShowConfirmation(null)
    }
  }

  const handleConfirmedAction = () => {
    switch (showConfirmation) {
      case 'delete':
        handleDeleteProject()
        break
      case 'status':
        handleStatusChange()
        break
    }
  }

  const showStatusActions = !['archived', 'cancelled'].includes(qualityInspection.status)
  const canComplete = qualityInspection.status === 'in_progress'
  const canReactivate = qualityInspection.status === 'completed'

  const confirmationConfig = getConfirmationConfig(showConfirmation)

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
        <DropdownMenuContent align='end' className='w-[200px]'>
          <DropdownMenuItem
          // onClick={() => navigate(`/quality-inspections/details/${qualityInspection.id}`)}
          >
            <Eye className='mr-2 h-4 w-4' />
            View Details
          </DropdownMenuItem>

          <DropdownMenuItem
          // onClick={() => navigate(`/quality-inspections/details/${qualityInspection.id}/manage-team`)}
          >
            <Users className='mr-2 h-4 w-4' />
            Manage Team
          </DropdownMenuItem>

          {canDelete && (
            <DropdownMenuItem onClick={() => setShowConfirmation('delete')}>
              <Trash2 className='mr-2 h-4 w-4' />
              Delete Inspection
            </DropdownMenuItem>
          )}

          {showStatusActions && (
            <>
              <DropdownMenuSeparator />

              {canComplete && (
                <DropdownMenuItem onClick={() => setShowConfirmation('status')}>
                  <Check className='mr-2 h-4 w-4' />
                  Mark as Completed
                </DropdownMenuItem>
              )}

              {canReactivate && (
                <DropdownMenuItem onClick={() => setShowConfirmation('status')}>
                  <RotateCw className='mr-2 h-4 w-4' />
                  Reactivate
                </DropdownMenuItem>
              )}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={!!showConfirmation} onOpenChange={() => setShowConfirmation(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmationConfig.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmationConfig.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmedAction}
              className={confirmationConfig.actionClass}
            >
              {confirmationConfig.actionText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}