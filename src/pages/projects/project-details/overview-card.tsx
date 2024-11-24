import {ProjectDetails, ProjectTask} from '@/@types/project'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import { statusColorMap } from '@/hooks/common/common-functions'
import { format } from 'date-fns'
import {
  Building2,
  Calendar,
  Clock,
  DollarSign,
  Mail,
  MapPin,
  Phone,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { columnsProjectDetail } from '../tasks/components/columns-project-detail'
import CreateEditTask from '../tasks/components/createTask'
import CreateTimeEntry from './create-time-entry'
import { TeamMembersTab } from './manage-team-tab'
import EmptyBlock from "../../../components/cards/empty-block";

interface OverviewProps {
  project: ProjectDetails
  tasks?: ProjectTask[]
  isFetching?: boolean,
  onSuccess?: () => void
}

const OverviewCard = ({ project, tasks = [], isFetching, onSuccess }: OverviewProps) => {
  const [openAddEditTaskModal, setOpenAddEditTaskModal] = useState(false)
  const { id } = useParams<{ id: string }>()
  const [openTimeEntry, setOpenTimeEntry] = useState(false)

  return (
    <div className='space-y-6 md:col-span-5'>
      {/* Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium'>Progress</p>
                <div className='flex items-center gap-2'>
                  <Progress value={project.progress} className='w-60' />
                  <span className='text-sm text-muted-foreground'>
                    {project.progress}%
                  </span>
                </div>
              </div>
              <Badge className={statusColorMap[project.status]}>
                {project.status}
              </Badge>
            </div>

            <div className='grid gap-4 md:grid-cols-3'>
              <div className='flex items-center gap-2'>
                <Calendar className='h-4 w-4 text-muted-foreground' />
                <div>
                  <p className='text-sm font-medium'>Duration</p>
                  <p className='text-sm text-muted-foreground'>
                    {format(new Date(project.start_date), 'MMM d, yyyy')} -
                    {format(new Date(project.end_date), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Clock className='h-4 w-4 text-muted-foreground' />
                <div>
                  <p className='text-sm font-medium'>Hours</p>
                  <p className='text-sm text-muted-foreground'>
                    {project.worked_hours} / {project.estimated_hours}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <DollarSign className='h-4 w-4 text-muted-foreground' />
                <div>
                  <p className='text-sm font-medium'>Budget</p>
                  <p className='text-sm text-muted-foreground'>
                    ${project.estimated_budget?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Client Details */}
            {project.client && (
              <div>
                <h3 className='mb-4 font-medium'>Client Information</h3>
                <div className='grid gap-4 md:grid-cols-2'>
                  <div className='flex items-center gap-2'>
                    <Building2 className='h-4 w-4 text-muted-foreground' />
                    <div>
                      <p className='text-sm font-medium'>
                        {project.client.name}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        {project.client.type}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Users className='h-4 w-4 text-muted-foreground' />
                    <div>
                      <p className='text-sm font-medium'>Contact Person</p>
                      <p className='text-sm text-muted-foreground'>
                        {project.client.contact_person}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Phone className='h-4 w-4 text-muted-foreground' />
                    <div>
                      <p className='text-sm font-medium'>Phone</p>
                      <p className='text-sm text-muted-foreground'>
                        {project.client.phone}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Mail className='h-4 w-4 text-muted-foreground' />
                    <div>
                      <p className='text-sm font-medium'>Email</p>
                      <p className='text-sm text-muted-foreground'>
                        {project.client.email}
                      </p>
                    </div>
                  </div>
                  {project.address && (
                    <div className='col-span-2 flex items-center gap-2'>
                      <MapPin className='h-4 w-4 text-muted-foreground' />
                      <div>
                        <p className='text-sm font-medium'>Address</p>
                        <p className='text-sm text-muted-foreground'>
                          {[
                            project.address.address_line1,
                            project.address.city,
                            project.address.state,
                            project.address.country,
                            project.address.postcode,
                          ]
                            .filter(Boolean)
                            .join(', ')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue='tasks' className='w-full'>
        <TabsList>
          <TabsTrigger value='tasks'>Tasks</TabsTrigger>
          <TabsTrigger value='team'>Team</TabsTrigger>
          <TabsTrigger value='time'>Time Entries</TabsTrigger>
          {project.service && (
            <TabsTrigger value='service'>Service Details</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value='tasks'>
          {!tasks?.length ? (
              // @ts-ignore
              <EmptyBlock
                  onClick={() => setOpenAddEditTaskModal(true)}
                  title='Add Task'
                  description='No tasks have been created for this project yet.'
                  topDescription='No tasks available'
              />
          ) : (
              <Card>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <CardTitle>Tasks</CardTitle>
                    <Button onClick={() => setOpenAddEditTaskModal(true)}>
                      Add Task
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <GenericTableWrapper
                      // @ts-ignore
                      data={tasks}
                      columns={columnsProjectDetail}
                      isLoading={isFetching}
                  />
                </CardContent>
              </Card>
          )}
        </TabsContent>

        <TeamMembersTab project={project} />

        <TabsContent value='time'>
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle>Time Entries</CardTitle>
                <Button onClick={() => setOpenTimeEntry(true)}>
                  Add Time Entry
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {project.time_entries.map((entry) => (
                  <div
                    key={entry.id}
                    className='flex items-center justify-between rounded-lg border p-4'
                  >
                    <div>
                      <div className='flex items-center gap-2'>
                        <p className='font-medium'>{entry.employee.name}</p>
                        {entry.task && (
                          <Badge variant='outline'>{entry.task.name}</Badge>
                        )}
                      </div>
                      <p className='text-sm text-muted-foreground'>
                        {format(
                          new Date(entry.start_time),
                          'MMM d, yyyy HH:mm'
                        )}{' '}
                        -{format(new Date(entry.end_time), 'HH:mm')}
                      </p>
                      {entry.description && (
                        <p className='mt-1 text-sm text-muted-foreground'>
                          {entry.description}
                        </p>
                      )}
                    </div>
                    <div className='text-right'>
                      <p className='font-medium'>
                        {Math.round((entry.duration / 3600) * 100) / 100}h
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {project.service && (
          <TabsContent value='service'>
            <Card>
              <CardHeader>
                <CardTitle>Service Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div>
                    <p className='text-sm font-medium'>Service Name</p>
                    <p className='text-sm text-muted-foreground'>
                      {project.service.name}
                    </p>
                  </div>
                  <div className='grid gap-4 md:grid-cols-2'>
                    <div>
                      <p className='text-sm font-medium'>Quoted Price</p>
                      <p className='text-sm text-muted-foreground'>
                        ${project.service.quoted_price?.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm font-medium'>Final Price</p>
                      <p className='text-sm text-muted-foreground'>
                        ${project.service.final_price?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {project.service.service_details && (
                    <div>
                      <p className='text-sm font-medium'>Service Details</p>
                      <pre className='whitespace-pre-wrap text-sm text-muted-foreground'>
                        {JSON.stringify(
                          project.service.service_details,
                          null,
                          2
                        )}
                      </pre>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      <CreateTimeEntry
        setOpen={setOpenTimeEntry}
        open={openTimeEntry}
        tasks={project?.tasks ?? []}
        employees={project.assigned_employees}
        project_id={Number(id)}
        onSuccess={onSuccess}
      />

      <CreateEditTask
        open={openAddEditTaskModal}
        setOpen={setOpenAddEditTaskModal}
        project_id={id}
      />
    </div>
  )
}

export default OverviewCard
