import { CreateTimeEntryProps, EntryFormData } from '@/@types/time-entry'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useShortCode } from '@/hooks/use-local-storage'
import { useCreateTimeEntryMutation } from '@/services/time-entryApi'
import { format } from 'date-fns'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {toast} from "../../../components/ui/use-toast";

const CreateTimeEntry = ({
  open,
  setOpen,
  project_id,
  employees,
  tasks,
  onSuccess
}: CreateTimeEntryProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const short_code = useShortCode()
  const [createTimeEntry] = useCreateTimeEntryMutation()

  const form = useForm({
    defaultValues: {
      employee_id: '',
      task_id: '',
      start_time: '',
      end_time: '',
      description: '',
    },
  })

  const onSubmit = async (data: EntryFormData) => {
    try {
      setIsSubmitting(true)

      const startDate = new Date(data.start_time)
      const endDate = new Date(data.end_time)
      const durationInMilliseconds = endDate.getTime() - startDate.getTime()

      const durationInMinutes = durationInMilliseconds / (1000 * 60)

      await createTimeEntry({
        venue_short_code: short_code,
        projectId: project_id,
        data: {
          ...data,
          is_manually_entered: true,
          project_id: Number(project_id),
          employee_id: Number(data.employee_id),
          task_id: data.task_id ? Number(data.task_id) : undefined,
          start_time: format(startDate, "yyyy-MM-dd'T'HH:mm:ss"),
          end_time: format(endDate, "yyyy-MM-dd'T'HH:mm:ss"),
          duration: durationInMinutes,
        },
      }).unwrap()

      onSuccess?.() // Call the onSuccess callback if provided
      setOpen(false)
      form.reset()
    } catch (error) {
        toast({
            title: 'Error',
            description: 'Failed to create time entry',
            variant: 'destructive',
        })
      console.error('Failed to create time entry:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Add Time Entry</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form  onSubmit={(e) => {
              e.preventDefault() // Add this
              form.handleSubmit(onSubmit)(e)
          }}  className='space-y-4'>
            <FormField
              control={form.control}
              name='employee_id'
              rules={{ required: 'Employee is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select employee' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employees?.map((employee) => (
                        <SelectItem
                          key={employee.id}
                          value={employee.id.toString()}
                        >
                          {employee.name}
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
              name='task_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task (Optional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select task' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tasks?.map((task) => (
                        <SelectItem key={task.id} value={task.id.toString()}>
                          {task.name}
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
              name='start_time'
              rules={{ required: 'Start time is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input type='datetime-local' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='end_time'
              rules={{ required: 'End time is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <Input type='datetime-local' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder='Enter description' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end space-x-2'>
              <Button
                variant='outline'
                onClick={() => setOpen(false)}
                type='button'
              >
                Cancel
              </Button>
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Time Entry'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTimeEntry
