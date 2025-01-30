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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useShortCode } from '@/hooks/use-local-storage'
import { toast } from '@/components/ui/use-toast'
import { Checklist } from '@/@types/site-management'
import { useAddChecklistMutation, useUpdateChecklistMutation } from '@/services/siteManagmentApi'
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EmployeeResponse } from '@/@types/staff'
import { useGetEmployeesQuery } from '@/services/staffApi'
import { useEffect } from 'react'

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  assigned_to: z.string().min(1, 'Assigned to is required'),
  due_date: z.string().min(1, 'Due date is required'),
  items: z.array(z.object({
    id: z.number().optional().nullable(),
    title: z.string().min(1, 'Item title is required'),
    is_completed: z.boolean().default(false)
  }))
})

interface ChecklistAddEditModalProps {
  checklist: Checklist | null
  isOpen: boolean
  onClose: () => void
  refreshChecklists: () => void
  siteId: number
}

export const ChecklistAddEditModal = ({
  checklist,
  isOpen,
  onClose,
  refreshChecklists,
  siteId,
}: ChecklistAddEditModalProps) => {
  const shortCode = useShortCode()
  const [createChecklist] = useAddChecklistMutation()
  const [updateChecklist] = useUpdateChecklistMutation()
  const { data: employees } = useGetEmployeesQuery(shortCode)   
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      assigned_to: '',
      due_date: '',
      items: []
    },
  })

  useEffect(() => {
    if (checklist) {
      // Reset form with checklist data
      form.reset({
        title: checklist.title,
        assigned_to: checklist.assigned_to,
        due_date: checklist.due_date,
        items: checklist.items.map((item) => ({
          id: item.id,
          title: item.title,
          is_completed: item.is_completed == 0 ? false : true
        }))
      })
    } else {
      // Reset to empty defaults
      form.reset({
        title: '',
        assigned_to: '',
        due_date: '',
        items: []
      })
    }
  }, [checklist, form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log('Form submitted with values:', values) // Debug log
      
      if (checklist) {
        const result = await updateChecklist({
          shortCode,
          id: checklist.id,
          checklistData: {
            ...values,
            site_id: siteId
          }
        }).unwrap()
        console.log('Update result:', result) // Debug log
        
        toast({
          title: 'Checklist updated successfully',
          variant: 'default',
        })
      } else {
        const result = await createChecklist({
          shortCode,
          siteId,
          checklistData: values
        }).unwrap()
        console.log('Create result:', result) // Debug log
        
        toast({
          title: 'Checklist created successfully',
          variant: 'default',
        })
      }
      refreshChecklists()
      onClose()
      form.reset()
    } catch (error) {
      console.error('Submit error:', error) // Debug log
      toast({
        title: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  const addItem = () => {
    const currentItems = form.getValues('items')
    form.setValue('items', [...currentItems, { id: null, title: '', is_completed: false }])
  }

  const removeItem = (index: number) => {
    const currentItems = form.getValues('items')
    form.setValue('items', currentItems.filter((_, i) => i !== index))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {checklist ? 'Edit Checklist' : 'Create Checklist'}
          </DialogTitle>
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
              name='assigned_to'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned To</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
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
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <FormLabel>Items</FormLabel>
                <Button type="button" variant="outline" size="sm" onClick={addItem}>
                  Add Item
                </Button>
              </div>
              
              {form.watch('items')?.map((_: any, index: number) => (
                <div key={index} className="flex gap-2">
                  <FormField
                    control={form.control}
                    name={`items.${index}.title`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="Item title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>

            <div className='flex justify-end space-x-2'>
              <Button type="button" variant='outline' onClick={onClose}>
                Cancel
              </Button>
              <Button type='submit'>
                {checklist ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
