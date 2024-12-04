import { OpenModalProps } from '@/@types/common'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
// import { useToast } from '@/components/ui/use-toast'
// import { useShortCode } from '@/hooks/use-local-storage'
import { IconUsers } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
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
import { useShortCode } from '@/hooks/use-local-storage'
import { useCreateWorkOrderMutation, useGetProjectsListQuery } from '@/services/operationMangerApi'
import { useToast } from '@/components/ui/use-toast'
import { Textarea } from '@/components/ui/textarea'
// import {
//   useCreateProjectMutation
// } from '@/services/projectApi'

interface CreateEditProjectModalProps extends OpenModalProps {
  project?: any
}

const createTaskSchema = z
  .object({
    name: z.string().min(1, { message: 'Please enter name' }),
    priority: z.string().min(1, { message: 'Please select priority' }),
    start_date: z.string().min(1, { message: 'Please select start date' }),
    end_date: z.string().min(1, { message: 'Please select end date' }),
    description: z.string().min(1, { message: 'Please enter description' }),
    project_id: z.string().min(1, { message: 'Please select project' }),
  })

export function CreateEditOrderModal({
  open,
  setOpen,
  project,
}: CreateEditProjectModalProps) {

  const { toast } = useToast()
  const venue_short_code = useShortCode()
  const [createWorkOrder] = useCreateWorkOrderMutation()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data: projectData } = useGetProjectsListQuery({ venue_short_code });

  const isEditing = !!project

  const form = useForm({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      name: '',
      priority: '',
      start_date: '',
      description: '',
      end_date: '',
      finance_order_id: '123123',
      project_id: '',
    },
  })

  useEffect(() => {
    form.reset()
    return () => { }
  }, [])

  // @ts-ignore
  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      await createWorkOrder({
        venue_short_code: venue_short_code,
        data: data,
        id: data.project_id,
      }).unwrap()
      setIsSubmitting(false)
      toast({
        title: 'Success',
        description: 'Order created successfully',
      })
      setOpen(false)
    } catch (error: any) {
      setIsSubmitting(false)
      toast({
        title: 'Error',
        description: error.data.error.end_date[0],
        variant: 'destructive',
      })
    }

  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='flex max-h-[90vh] flex-col overflow-auto sm:max-w-[425px] md:min-w-[900px]'>
        <DialogHeader>
          <DialogTitle>
            <div className='flex items-center space-x-2'>
              <IconUsers size={24} />
              <span>{isEditing ? 'Edit Order' : 'Create New Order'}</span>
            </div>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <Card>
              <CardContent>
                <div className='grid grid-cols-2 gap-4 pt-4'>
                  {/* <div className='col-span-4'>
                    <div className='mt-6 flex w-full items-center space-x-2'>
                      <h3 className='text-lg font-medium'>Details</h3>
                    </div>
                  </div> */}
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
                    name='end_date'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
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
                  <FormField
                    control={form.control}
                    name='project_id'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project</FormLabel>
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
                            {projectData?.projects.map((project: any) => (
                              <SelectItem key={project.id} value={project.id.toString()}>{project.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <FormField
                    control={form.control}
                    name='invoice_id'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invoice ID</FormLabel>
                        <FormControl>
                          <Input type='text' placeholder='Invoice ID' {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  /> */}
                  <div className='col-span-2'>
                    <FormField
                      control={form.control}
                      name='description'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea rows={5} cols={50} placeholder='Description' {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
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
              <Button type='button' variant='secondary' onClick={() => { }}>
                Save as Draft
              </Button>
              <Button
                type='submit'
                disabled={isSubmitting}
              // onClick={form.handleSubmit(onSubmit)}
              >
                Generate Work Order
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
