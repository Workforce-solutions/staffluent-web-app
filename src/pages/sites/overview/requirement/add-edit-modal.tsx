import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import * as z from 'zod'
import { Requirement } from '@/@types/site-management'
import { useShortCode } from '@/hooks/use-local-storage'
import {
  useAddRequirementMutation,
  useUpdateRequirementMutation,
} from '@/services/siteManagmentApi'
import { useGetEmployeesQuery } from '@/services/staffApi'
import { EmployeeResponse } from '@/@types/staff'
import { useEffect } from 'react'
import { toast } from '@/components/ui/use-toast'

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  type: z.string().min(1, 'Type is required'),
  status: z.string().min(1, 'Status is required'),
  assigned_to: z.string().min(1, 'Assignee is required'),
  last_check_date: z.string().min(1, 'Last check date is required'),
})

interface RequirementModalProps {
  requirement?: Requirement | null
  isOpen: boolean
  onClose: () => void
  refreshRequirements: () => void
  siteId: number
}

export function RequirementAddEditModal({
  requirement,
  isOpen,
  onClose,
  refreshRequirements,
  siteId,
}: RequirementModalProps) {
  const shortCode = useShortCode()

  const [addRequirement, { isLoading: isAddLoading }] =
    useAddRequirementMutation()
  const [updateRequirement, { isLoading: isUpdateLoading }] =
    useUpdateRequirementMutation()

  const { data: employees } = useGetEmployeesQuery(shortCode)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: requirement?.title || '',
      description: requirement?.description || '',
      type: requirement?.type || '',
      status: requirement?.status || '',
      assigned_to: requirement?.assigned_to || '',
      last_check_date: requirement?.last_check_date
        ? new Date(requirement.last_check_date).toISOString().split('T')[0]
        : '',
    },
  })

  useEffect(() => {
    if (requirement) {
      form.reset(requirement)
    } else {
      form.reset({
        title: '',
        description: '',
        type: '',
        status: '',
        assigned_to: '',
        last_check_date: '',
      })
    }
  }, [requirement])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let response: any
      if (requirement) {
        response = await updateRequirement({
          shortCode,
          id: requirement.id,
          requirementData: values,
        }).unwrap()
      } else {
        response = await addRequirement({
          shortCode,
          siteId,
          requirementData: values,
        }).unwrap()
      }
      if (response.data) {
        refreshRequirements()
        onClose()
        form.reset()
        toast({
          title: requirement ? 'Requirement updated successfully' : 'Requirement added successfully',
          variant: 'default',
        })
      } else {
        toast({
          title: 'Failed to save requirement',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Error saving requirement:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{requirement ? 'Edit' : 'Add'} Requirement</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='site_specific'>
                        Site Specific
                      </SelectItem>
                      <SelectItem value='general'>General</SelectItem>
                    </SelectContent>
                  </Select>
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
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select status' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='pending'>Pending</SelectItem>
                      <SelectItem value='in_progress'>In Progress</SelectItem>
                      <SelectItem value='completed'>Completed</SelectItem>
                      <SelectItem value='complaint'>Complaint</SelectItem>
                      <SelectItem value='action_required'>
                        Action Required
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='assigned_to'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned To</FormLabel>
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
                      {employees?.map((employee: EmployeeResponse) => (
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
              name='last_check_date'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Check Date</FormLabel>
                  <FormControl>
                    <Input type='date' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={onClose}
                disabled={isAddLoading || isUpdateLoading}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={isAddLoading || isUpdateLoading}>
                {isAddLoading || isUpdateLoading ? (requirement ? 'Updating...' : 'Saving...') : (requirement ? 'Update' : 'Save')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
