import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { TabsContent } from '@/components/ui/tabs'
import OperationsManagers from './operations-managers'
import { ProjectDetails } from '@/@types/project'

interface TeamMembersTabProps {
  project: ProjectDetails
}

export function TeamMembersTab({ project }: TeamMembersTabProps) {
  return (
    <TabsContent value='team'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle>Team Members</CardTitle>
          <Link to={`/projects/details/${project.id}/manage-team`}>
            <Button variant='outline'>Manage Team</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            {project.project_manager && (
              <div>
                <h4 className='mb-4 text-sm font-medium'>Project Manager</h4>
                <div className='flex items-center gap-2'>
                  <Avatar>
                    <AvatarImage src={project.project_manager.avatar} />
                    <AvatarFallback>
                      {project.project_manager.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='text-sm font-medium'>
                      {project.project_manager.name}
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      Project Manager
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Team Leaders */}
            {project.team_leaders?.length > 0 && (
              <div>
                <h4 className='mb-4 text-sm font-medium'>Team Leaders</h4>
                <div className='grid gap-4 md:grid-cols-2'>
                  {project.team_leaders.map((leader) => (
                    <div key={leader.id} className='flex items-center gap-2'>
                      <Avatar>
                        <AvatarImage src={leader.avatar} />
                        <AvatarFallback>
                          {leader.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className='text-sm font-medium'>{leader.name}</p>
                        <p className='text-sm text-muted-foreground'>
                          Team Leader
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Operations Managers */}
            {project.operations_managers?.length > 0 && (
              <OperationsManagers
                operations_managers={project.operations_managers}
              />
            )}

            {/* Team Members */}
            {project.assigned_employees.length > 0 && (
              <div>
                <h4 className='mb-4 text-sm font-medium'>Team Members</h4>
                <div className='grid gap-4 md:grid-cols-2'>
                  {project.assigned_employees.map((employee) => (
                    <div key={employee.id} className='flex items-center gap-2'>
                      <Avatar>
                        <AvatarImage src={employee.avatar} />
                        <AvatarFallback>
                          {employee.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className='text-sm font-medium'>{employee.name}</p>
                        <p className='text-sm text-muted-foreground'>
                          Team Member
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
