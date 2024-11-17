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

interface CreateEditTaskModalProps extends OpenModalProps {
  task?: TasksResponse
  project_id?: string
}

const createTaskSchema = z.object({
  name: z.string().min(1, { message: 'Please enter name' }),
  status: z.string().min(1, { message: 'Please select status' }),
  priority: z.string().min(1, { message: 'Please select priority' }),
  assigned_employee_ids: z.array(z.string()),
})

const CreateEditTask = ({ open, setOpen, task, project_id }: CreateEditTaskModalProps) => {
  const venue_short_code = useShortCode()
  const [createTask] = useCreateTaskMutation()
  const [updateTask] = useUpdateTaskMutation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data: employees = [] } = useGetEmployeesQuery(venue_short_code)
  const { data: tasksStatus } = useGetTasksStatusListQuery({ venue_short_code })
  const taskStatusList = Object.keys(tasksStatus ?? {}).map((key) => ({
    value: key,
    label: tasksStatus[key],
  }))

  const employeeOptions: OptionsType[] = employees.map((employee) => ({
    value: { label: employee.name, value: employee.id.toString() },
    label: employee.name,
  }))

  const [selectedEmployees, setSelectedEmployees] = useState<FieldValueProps[]>(
    task ? [{ label: task.assignee.name, value: task.assignee.id }] : []
  )

  const form = useForm({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      name: task?.name ?? '',
      status: task?.status ?? '',
      priority: task?.priority ?? '',
      due_date: task?.due_date ?? '',
      notes: task?.notes ?? '',
      assigned_employee_ids: task?.assignee ? [task.assignee.id] : [],
    },
  })

  const isEditing = !!task?.id

  const onSubmit = async (data: any) => {
    let payload = data;
    if (project_id) {
      payload = {
        ...data,
        project_id
      }
    }
    if (isEditing) {
      setIsSubmitting(true)
      await updateTask({
        id: task.id,
        venue_short_code: venue_short_code,
        data: payload,
      }).unwrap()
      setIsSubmitting(false)
      toast({
        title: 'Success',
        description: 'Task updated successfully',
      })
    } else {
      setIsSubmitting(true)
      await createTask({
        venue_short_code: venue_short_code,
        data: payload,
      }).unwrap()
      setIsSubmitting(false)
      toast({
        title: 'Success',
        description: 'Task created successfully',
      })
    }
    setOpen(false)
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
                <div className='col-span-4'>
                  <FormField
                    control={form.control}
                    name='notes'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Add any additional notes or payment instructions...'
                            className='h-24'
                            {...field}
                          />
                        </FormControl>
                        {/* <FormDescription>
                                                These notes will appear on the invoice
                                            </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Additional Information Card */}
            <Card>
              <CardHeader>
                <CardTitle>Select employees</CardTitle>
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
                          const uniqueValues: any = values.filter(
                            (value, index, self) => {
                              return (
                                self.findIndex(
                                  (v) => v.value === value.value
                                ) === index
                              )
                            }
                          )
                          setSelectedEmployees(uniqueValues)
                          form.setValue(
                            'assigned_employee_ids',
                            uniqueValues.map((v: any) => v.value)
                          )
                        }}
                        value={selectedEmployees}
                        multiSelectorPlaceholder='Select employees'
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
              {!isEditing && (
                <Button
                  type='button'
                  variant='secondary'
                  disabled={isSubmitting}
                  onClick={() => {
                    // Save as draft logic
                  }}
                >
                  Save as Draft
                </Button>
              )}

              <Button type='submit' disabled={isSubmitting} onClick={form.handleSubmit(onSubmit)}>
                {isEditing ? 'Update Task' : 'Generate Task'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateEditTask
