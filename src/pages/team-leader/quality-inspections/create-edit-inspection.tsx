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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
// import {
//   useCreateProjectMutation
// } from '@/services/projectApi'
import { Textarea } from '@/components/ui/textarea'
import { useShortCode } from '@/hooks/use-local-storage'
import { useToast } from '@/components/ui/use-toast'
import { useCreateQualityInspectionMutation, useGetProjectsListQuery } from '@/services/teamLeaderApi'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface CreateEditProjectModalProps extends OpenModalProps {
  project?: any
}

const createTaskSchema = z
  .object({
    name: z.string().min(1, { message: 'Please enter name' }),
    inspection_date: z.string().min(1, { message: 'Please select inspection date' }),
    remarks: z.string().min(1, { message: 'Please enter remarks' }),
    rating: z.string().min(1, { message: 'Please enter rating' }),
    improvement_suggestions: z.string().min(1, { message: 'Please enter improvement suggestions' }),
    project_id: z.string().min(1, { message: 'Please select project' }),
  })

export function CreateEditInspectionModal({
  open,
  setOpen,
  project,
}: CreateEditProjectModalProps) {
  const { toast } = useToast()
  const venue_short_code = useShortCode()
  const [createInspection] = useCreateQualityInspectionMutation()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data: projectData } = useGetProjectsListQuery({ venue_short_code });

  const isEditing = !!project

  const form = useForm({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      name: '',
      inspection_date: '',
      remarks: '',
      rating: '',
      improvement_suggestions: '',
      project_id: '',
    },
  })

  useEffect(() => {
    form.reset()
    return () => { }
  }, [])

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      await createInspection({
        venue_short_code,
        data: data,
        id: data.project_id,
      }).unwrap()
      setIsSubmitting(false)
      toast({
        title: 'Success',
        description: 'Quality inspection created successfully',
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
                    name='remarks'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Remarks</FormLabel>
                        <FormControl>
                          <Input type='text' placeholder='Remarks' {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='inspection_date'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inspection Date</FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
                        </FormControl>
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
                          <Input type='number' {...field} />
                        </FormControl>
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
                  <div className='col-span-2'>
                    <FormField
                      control={form.control}
                      name='improvement_suggestions'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Improvement Suggestions</FormLabel>
                          <FormControl>
                            <Textarea rows={4} cols={4} placeholder='Improvement Suggestions' {...field} />
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
    </Dialog >
  )
}
