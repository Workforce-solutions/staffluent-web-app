/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import { useNavigate } from 'react-router-dom'
import { Eye, Edit, Users, Check, Archive, RotateCw, Trash2 } from 'lucide-react'
import { useShortCode } from '@/hooks/use-local-storage'
import { useDeleteProjectMutation, useUpdateProjectMutation } from '@/services/projectApi'
import { toast } from '@/components/ui/use-toast'

interface Project {
  id: number
  name: string
  status: string
  project_category: string
}

interface DataTableRowActionsProps {
  row: Row<Project>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const navigate = useNavigate()
  const short_code = useShortCode()
  const [updateProject] = useUpdateProjectMutation()
  const [deleteProject] = useDeleteProjectMutation()

  const project = row.original

  const handleStatusChange = async () => {
    try {
      await updateProject({
        id: project.id,
        venue_short_code: short_code,
        // @ts-ignore
        data: {
          status:
            project.status === 'in_progress' ? 'completed' : 'in_progress',
        },
      }).unwrap()

      toast({
        title: 'Success',
        description: `Project ${project.status === 'in_progress' ? 'marked as completed' : 'reactivated'} successfully`,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update project status',
        variant: 'destructive',
      })
    }
  }

  const handleArchiveProject = async () => {
    try {
      await updateProject({
        id: project.id,
        venue_short_code: short_code,
        // @ts-ignore
        data: {
          status: 'archived',
        },
      }).unwrap()

      toast({
        title: 'Success',
        description: 'Project archived successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to archive project',
        variant: 'destructive',
      })
    }
  }

  const handleDeleteProject = (e: any) => {
    deleteProject({ id: e.id, venue_short_code: short_code })
  }

  return (
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
          onClick={() => navigate(`/projects/details/${project.id}`)}
        >
          <Eye className='mr-2 h-4 w-4' />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => navigate(`/projects/${project.id}/edit`)}
        >
          <Edit className='mr-2 h-4 w-4' />
          Edit Project
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleDeleteProject(row.original)}
        >
          <Trash2 className='mr-2 h-4 w-4' />
          Delete Project
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            navigate(`/projects/details/${project.id}/manage-team`)
          }
        >
          <Users className='mr-2 h-4 w-4' />
          Manage Team
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {project.status !== 'archived' && (
          <>
            <DropdownMenuItem onClick={handleStatusChange}>
              {project.status === 'in_progress' ? (
                <>
                  <Check className='mr-2 h-4 w-4' />
                  Mark as Completed
                </>
              ) : (
                <>
                  <RotateCw className='mr-2 h-4 w-4' />
                  Reactivate
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleArchiveProject}
              className='text-red-600'
            >
              <Archive className='mr-2 h-4 w-4' />
              Archive Project
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
