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
// import {
//   useCreateProjectMutation
// } from '@/services/projectApi'

interface CreateEditProjectModalProps extends OpenModalProps {
  project?: any
}

const createTaskSchema = z
  .object({
    title: z.string().min(1, { message: 'Please enter title' }),
    status: z.string().min(1, { message: 'Please select status' }),
    priority: z.string().min(1, { message: 'Please select priority' }),
    start_date: z.string().min(1, { message: 'Please select start date' }),
    requested_by: z.string().min(1, { message: 'Please select requested by' }),
    invoice_id: z.string().min(1, { message: 'Please select invoice id' }),
  })

export function CreateEditOrderModal({
  open,
  setOpen,
  project,
}: CreateEditProjectModalProps) {
  // const { toast } = useToast()
  // const venue_short_code = useShortCode()
  // const [createProjrect] = useCreateProjectMutation()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isEditing = !!project

  const form = useForm({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
      status: '',
      priority: '',
      start_date: '',
      requested_by: '',
      invoice_id: '',
    },
  })

  useEffect(() => {
    form.reset()
    return () => { }
  }, [])

  // @ts-ignore
    const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    // await createProjrect({
    //   venue_short_code: venue_short_code,
    //   data: data,
    // }).unwrap()
    // setIsSubmitting(false)
    // toast({
    //   title: 'Success',
    //   description: 'Order created successfully',
    // })
    // setOpen(false)
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
                    name='title'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
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
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select status' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='open'>Open</SelectItem>
                            <SelectItem value='in_progress'>In Progress</SelectItem>
                            <SelectItem value='resolved'>Resolved</SelectItem>
                            <SelectItem value='closed'>Closed</SelectItem>
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
                    name='requested_by'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Requested by</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select requested by' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='medium'>Jhon Doe</SelectItem>
                            <SelectItem value='high'>Jane Doe</SelectItem>
                            <SelectItem value='low'>John Doe</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
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
                  />
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
