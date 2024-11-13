/* eslint-disable @typescript-eslint/no-explicit-any */
// components/client-portal/request-service-modal.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
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
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/components/ui/use-toast'
// import { DatePicker } from "@/components/ui/date-picker"
import { Calendar as CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { useState } from 'react'
import {
  useRequestServiceMutation,
  useGetAvailableServicesQuery,
} from '@/services/clientPortalApi'
import { OpenModalProps } from '@/@types/common'

const requestServiceSchema = z.object({
  service_id: z.number().min(1, 'Please select a service'),
  priority: z.enum(['Low', 'Normal', 'High', 'Urgent'], {
    required_error: 'Please select a priority level',
  }),
  // Change this to handle undefined better
  preferred_date: z
    .date({
      required_error: 'Please select a date',
      invalid_type_error: 'Please select a valid date',
    })
    .min(new Date(), 'Date must be in the future'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
})

type RequestServiceForm = z.infer<typeof requestServiceSchema>

export function RequestServiceModal({ open, setOpen }: OpenModalProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [requestService] = useRequestServiceMutation()
  const { data: availableServices, isLoading: isLoadingServices } =
    useGetAvailableServicesQuery()

  const form = useForm<RequestServiceForm>({
    resolver: zodResolver(requestServiceSchema),
    defaultValues: {
      service_id: undefined,
      priority: 'Normal',
      preferred_date: undefined,
      description: '',
    },
  })

  const onSubmit = async (data: RequestServiceForm) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const payload: any = {
      ...data,
      preferred_date: data.preferred_date.toISOString(),
    }
    try {
      setIsSubmitting(true)
      await requestService(payload).unwrap()

      toast({
        title: 'Service Requested',
        description: 'Your service request has been submitted successfully',
      })
      setOpen(false)
      form.reset()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit service request',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Request New Service</DialogTitle>
          <DialogDescription>
            Fill out the form below to request a new service
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='service_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    value={field.value?.toString()}
                    disabled={isLoadingServices}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          isLoadingServices
                            ? 'Loading services...'
                            : 'Select a service'
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {availableServices?.map((service) => (
                        <SelectItem
                          key={service.id}
                          value={service.id.toString()}
                        >
                          <div className='flex flex-col'>
                            <span>{service.name}</span>
                            <span className='text-xs text-muted-foreground'>
                              {service.price_type === 'Fixed'
                                ? `$${service.base_price}`
                                : 'Variable pricing'}
                            </span>
                          </div>
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
              name='priority'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select priority' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Low'>Low</SelectItem>
                      <SelectItem value='Normal'>Normal</SelectItem>
                      <SelectItem value='High'>High</SelectItem>
                      <SelectItem value='Urgent'>Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='preferred_date'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Preferred Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
                  <Textarea
                    placeholder='Describe what you need...'
                    className='min-h-[100px]'
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
