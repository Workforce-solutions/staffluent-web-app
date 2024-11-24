import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { Textarea } from '@/components/ui/textarea'
import {
  useCreateServiceMutation,
  useUpdateServiceMutation,
} from '@/services/servicesApi'
import { useShortCode } from '@/hooks/use-local-storage'
import type { ServiceModalProps } from '@/@types/services'
import { useEffect } from 'react'
import ServiceCategoriesDropdown from '@/components/staff/service-categories-dropdown'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category_id: z.number().min(1, 'Category is required'),
  price_type: z.string().min(1),
  base_price: z.string().min(0, 'Price must be 0 or greater'),
  duration: z.number().min(1, 'Duration is required'),
  description: z.string().min(1, 'Description is required'),
  status: z.string().min(1),
})

export function ServiceModal({ open, setOpen, service }: ServiceModalProps) {
  const { toast } = useToast()
  const shortCode = useShortCode()
  const [createService, { isLoading: createIsLoading }] =
    useCreateServiceMutation()
  const [updateService, { isLoading: updateIsLoading }] =
    useUpdateServiceMutation()
  const isEditing = !!service

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: service?.name || '',
      category_id: service?.category_id || 0,
      price_type: service?.price_type || 'Fixed',
      base_price: service?.base_price || '0',
      duration: service?.duration || 30,
      description: service?.description || '',
      status: service?.status || 'Active',
    },
  })

  useEffect(() => {
    if (isEditing && service) {
      form.reset({
        name: service.name,
        category_id: service.category_id,
        price_type: service.price_type,
        base_price: service.base_price,
        duration: service.duration,
        description: service.description,
        status: service.status,
      })
    } else {
      form.reset({
        name: '',
        category_id: 0,
        price_type: 'Fixed',
        base_price: '0',
        duration: 30,
        description: '',
        status: 'Active',
      })
    }
  }, [form, isEditing, service])

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (isEditing && service?.id) {
        await updateService({
          venue_short_code: shortCode,
          data,
          id: service.id,
        }).unwrap()
      } else {
        await createService({
          venue_short_code: shortCode,
          data,
        }).unwrap()
      }

      toast({
        title: 'Success',
        description: `Service ${isEditing ? 'updated' : 'created'} successfully`,
      })
      setOpen(false)
      form.reset()
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${isEditing ? 'update' : 'create'} service`,
        variant: 'destructive',
      })
    }
  }

  const isLoading = createIsLoading || updateIsLoading

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit' : 'Add'} Service</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Edit the' : 'Create a new'} service offering
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter service name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='category_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <ServiceCategoriesDropdown
                    className='w-full'
                    id={field.value}
                    onChange={(value) => field.onChange(parseInt(value))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='price_type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select price type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='Fixed'>Fixed</SelectItem>
                      <SelectItem value='Hourly'>Hourly</SelectItem>
                      <SelectItem value='Quote'>Quote</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='base_price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Price</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      step='0.01'
                      placeholder='Enter base price'
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='duration'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (minutes)</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Enter duration in minutes'
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
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
                    <Textarea
                      placeholder='Enter service description'
                      className='resize-none'
                      {...field}
                    />
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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select status' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='Active'>Active</SelectItem>
                      <SelectItem value='Inactive'>Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end space-x-2 pt-4'>
              <Button
                variant='outline'
                onClick={() => setOpen(false)}
                type='button'
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={isLoading}>
                {isLoading
                  ? 'Saving...'
                  : isEditing
                    ? 'Save changes'
                    : 'Create'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
