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
import { Textarea } from '@/components/ui/textarea'

interface CreateEditProjectModalProps extends OpenModalProps {
  project?: any
}

const createTaskSchema = z
  .object({
    title: z.string().min(1, { message: 'Please enter title' }),
    status: z.string().min(1, { message: 'Please select status' }),
    inspected_in: z.string().min(1, { message: 'Please select inspected in' }),
    team_leader: z.string().min(1, { message: 'Please select team leader' }),
    rating: z.string().min(1, { message: 'Please enter rating' }),
    description: z.string().min(1, { message: 'Please enter description' }),
    suggestion: z.string().min(1, { message: 'Please enter suggestion' }),
    suggestion_description: z.string().min(1, { message: 'Please enter suggestion description' }),
  })

export function CreateEditInspectionModal({
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
      inspected_in: '',
      description: '',
      team_leader: '',
      rating: '',
      suggestion: '',
      suggestion_description: '',
    },
  })

  useEffect(() => {
    form.reset()
    return () => { }
  }, [])

  const onSubmit = async () => {
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
              <span>{isEditing ? 'Edit Quality Inspection' : 'Create New Quality Inspection'}</span>
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
                  <div className='col-span-2'>
                    <FormField
                      control={form.control}
                      name='description'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea rows={4} cols={4} placeholder='description' {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name='inspected_in'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inspected In</FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='team_leader'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Team Leader</FormLabel>
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
                    name='rating'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating</FormLabel>
                        <FormControl>
                          <Input type='number' placeholder='Rating' {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='suggestion'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Suggestion</FormLabel>
                        <FormControl>
                          <Input type='text' placeholder='Suggestion' {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className='col-span-2'>
                    <FormField
                      control={form.control}
                      name='suggestion_description'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Suggestion Description</FormLabel>
                          <FormControl>
                            <Textarea rows={4} cols={4} placeholder='Suggestiondescription' {...field} />
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
                Generate Quality Inspection
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
