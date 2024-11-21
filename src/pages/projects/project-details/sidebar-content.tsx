import { ProjectDetails } from '@/@types/project'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDistance } from 'date-fns'

interface SidebarContentProps {
  project: ProjectDetails
}

const SidebarContent = ({ project }: SidebarContentProps) => {
  return (
    <div className='space-y-6 md:col-span-2'>
      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div>
              <p className='text-sm text-muted-foreground'>Tasks Completed</p>
              <p className='text-2xl font-bold'>
                {project.tasks.filter((t) => t.status === 'completed')?.length}{' '}
                / {project.tasks?.length}
              </p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Total Hours</p>
              <p className='text-2xl font-bold'>{project.worked_hours}h</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Team Members</p>
              <p className='text-2xl font-bold'>
                {project.assigned_employees?.length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity (could be implemented with a separate API endpoint) */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {project.time_entries.slice(0, 5).map((entry) => (
              <div key={entry.id} className='flex items-center gap-2'>
                <Avatar className='h-8 w-8'>
                  <AvatarFallback>
                    {entry.employee.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className='text-sm font-medium'>{entry.employee.name}</p>
                  <p className='text-xs text-muted-foreground'>
                    Logged {Math.round((entry.duration / 3600) * 100) / 100}h
                    {' • '}
                    {formatDistance(new Date(entry.start_time), new Date(), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SidebarContent
