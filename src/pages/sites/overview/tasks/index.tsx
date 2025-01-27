import { useShortCode } from '@/hooks/use-local-storage'
import { useGetTasksListQuery } from '@/services/tasksApi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import { columns } from './columns'
import { useState } from 'react'
import CreateEditTask from '@/pages/projects/tasks/components/createTask'

interface TasksViewProps {
  siteId: number
  project_id: number
}


export default function Tasks({ siteId, project_id }: TasksViewProps) {
  const short_code = useShortCode()
  const [openAddEditTaskModal, setOpenAddEditTaskModal] = useState(false)
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksListQuery({
    venue_short_code: short_code,
    construction_site_id: siteId.toString(),
  })

  return (
    <>
      <Card>
        <CardHeader className='flex justify-between'>
          <div className='flex items-center justify-between'>
            <CardTitle>Tasks</CardTitle>
            <Button onClick={() => {
                setOpenAddEditTaskModal(true)
            }}>Add Task</Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error loading tasks</div>
          ) : tasks?.tasks?.length === 0 ? (
            <div>No tasks found</div>
          ) : (
            <div className='w-full'>
              <GenericTableWrapper
                data={tasks?.tasks ?? []}
                columns={columns}
                showToolbar={false}
                isLoading={isLoading}
                isError={error}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <CreateEditTask
        open={openAddEditTaskModal}
        setOpen={setOpenAddEditTaskModal}
        project_id={project_id.toString()}
        construction_site_id={siteId.toString()}
      />
    </>
  )
}
