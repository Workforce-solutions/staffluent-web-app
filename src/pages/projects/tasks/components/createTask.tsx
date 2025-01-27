import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  useCreateTaskMutation,
  useGetTasksStatusListQuery,
  useUpdateTaskMutation,
} from '@/services/tasksApi'
import { useShortCode } from '@/hooks/use-local-storage'
import { toast } from '@/components/ui/use-toast'
import { useGetEmployeesQuery } from '@/services/staffApi'
import MultiselectDropdown from '@/components/wrappers/multiselect-dropdown'
import { FieldValueProps, OptionsType, OpenModalProps } from '@/@types/common'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { TasksResponse } from '@/@types/tasks'
import { useGetProjectQuery, useGetProjectsListQuery } from "../../../../services/projectApi";

interface CreateEditTaskModalProps extends OpenModalProps {
  task?: TasksResponse
  project_id?: string
  construction_site_id?: string
}

const createTaskSchema = z.object({
  name: z.string().min(1, { message: 'Please enter name' }),
  status: z.string().min(1, { message: 'Please select status' }),
  priority: z.string().min(1, { message: 'Please select priority' }),
  assigned_employee_ids: z.array(z.string()).max(1),  // Limit to max 1 item
  description: z.string().optional(),
  start_date: z.string().optional(),
  due_date: z.string().optional(),
  project_id: z.string().min(1, { message: 'Please select project' }),
  construction_site_id: z.string().optional(),
})

const CreateEditTask = ({ open, setOpen, task, project_id, construction_site_id }: CreateEditTaskModalProps) => {
  const venue_short_code = useShortCode()
  const [createTask] = useCreateTaskMutation()
  const [updateTask] = useUpdateTaskMutation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data: tasksStatus } = useGetTasksStatusListQuery({ venue_short_code })

  const taskStatusList = Object.keys(tasksStatus ?? {}).map((key) => ({
    value: key,
    label: tasksStatus[key],
  }))

  // Fetch all employees only if we're not in project context
  const { data: allEmployees = [] } = useGetEmployeesQuery(venue_short_code, {
    skip: !!project_id
  })

  // Fetch project details only if we're in project context
  const { data: projectDetails } = useGetProjectQuery({
    id: Number(project_id),
    venue_short_code,
  }, {
    skip: !project_id
  })


  const employeeOptions: OptionsType[] = project_id
    ? (projectDetails?.assigned_employees ?? []).map((employee) => ({
      value: {
        label: employee.name,
        value: employee.id.toString()
      },
      label: employee.name,
    }))
    : allEmployees.map((employee) => ({
      value: {
        label: employee.name,
        value: employee.id.toString()
      },
      label: employee.name,
    }))

  const [selectedEmployees, setSelectedEmployees] = useState<FieldValueProps[]>(
    task?.assignee ? [{
      label: task.assignee.name,
      value: task.assignee.id.toString() // Ensure id is string
    }] : []
  )

  const { data: projectsData } = useGetProjectsListQuery({ venue_short_code }, { skip: !!project_id })

  const form = useForm({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      name: task?.name ?? '',
      status: task?.status ?? '',
      priority: task?.priority ?? '',
      start_date: task?.start_date ?? '',
      due_date: task?.due_date ?? '',
      description: task?.description ?? '',
      assigned_employee_ids: task?.assignee ? [task.assignee.id.toString()] : [], // Convert to string
      project_id: project_id ?? '',
      construction_site_id: construction_site_id ?? '',
    },
  })

  const isEditing = !!task?.id

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true)
      let payload = data;
      payload = {
        ...data,
        project_id: project_id || data.project_id
      }

      if (isEditing) {
        await updateTask({
          id: task.id,
          venue_short_code: venue_short_code,
          data: payload,
        }).unwrap()
        toast({
          title: 'Success',
          description: 'Task updated successfully',
        })
      } else {
        await createTask({
          venue_short_code: venue_short_code,
          data: payload,
        }).unwrap()
        toast({
          title: 'Success',
          description: 'Task created successfully',
        })
      }
      setOpen(false)
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.data?.message || 'Something went wrong',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px] md:min-w-[900px]'>
        <DialogHeader>
          <DialogTitle>
            <div className='flex items-center space-x-2'>
              <span>{isEditing ? 'Edit Task' : 'Create New Task'}</span>
            </div>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <Card>
              <CardHeader>
                <CardTitle>Tasks Details</CardTitle>
              </CardHeader>
              <CardContent className='grid grid-cols-4 gap-10'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type='text' placeholder='Name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select status' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {taskStatusList.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='start_date'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type='date' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='due_date'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <Input type='date' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='priority'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select priority' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='medium'>Medium</SelectItem>
                          <SelectItem value='high'>High</SelectItem>
                          <SelectItem value='low'>Low</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {
                  !project_id && (
                    <FormField
                      control={form.control}
                      name='project_id'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Projects</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select project' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {projectsData?.projects.map((project) => (
                                <SelectItem key={project.id} value={project.id.toString()}>
                                  {project.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                <div className='col-span-4'>
                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Add any additional notes...'
                            className='h-24'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assign employee</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>

                <FormField
                  control={form.control}
                  name='assigned_employee_ids'
                  render={({ field }) => (
                    <FormItem>
                      <MultiselectDropdown
                        {...field}
                        itemValue={employeeOptions}
                        setValue={(values) => {
                          const uniqueValues = values.filter(
                            (value, index, self) => {
                              return (
                                self.findIndex(
                                  (v) => v.value === value.value
                                ) === index
                              )
                            }
                          )
                          setSelectedEmployees(uniqueValues)
                          // Ensure we're sending the correct value structure

                          form.setValue(
                            'assigned_employee_ids',
                            // @ts-ignore
                            uniqueValues.map((v) => v.value.toString())
                          )
                        }}
                        value={selectedEmployees}
                        multiSelectorPlaceholder='Select employee'
                        isSingleSelect={true}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <div className='flex justify-end space-x-4'>
              <Button
                type='button'
                variant='outline'
                disabled={isSubmitting}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={isSubmitting}
                onClick={form.handleSubmit(onSubmit)}
              >
                {isEditing ? 'Update Task' : 'Create Task'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateEditTask