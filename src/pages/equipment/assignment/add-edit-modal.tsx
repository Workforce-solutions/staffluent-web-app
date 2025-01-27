import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useShortCode } from '@/hooks/use-local-storage'
import { useAddEquipmentAssignmentMutation, useUpdateEquipmentAssignmentMutation, useGetEquipmentQuery, useGetSitesQuery } from '@/services/siteManagmentApi'
import { useGetEmployeesQuery } from '@/services/staffApi'
import { EquipmentAssignment } from '@/@types/site-management'
import { useEffect } from 'react'

const formSchema = z.object({
  construction_site_id: z.string({
    required_error: "Please select a construction site",
  }),
  equipment_id: z.string({
    required_error: "Please select equipment",
  }),
  assigned_to: z.string({
    required_error: "Please select an operator",
  }),
  assigned_at: z.date({
    required_error: "Please select assignment date",
  }),
  return_expected_at: z.date({
    required_error: "Please select expected return date",
  }),
  status: z.string({
    required_error: "Please select a status",
  }),
  notes: z.string().optional(),
})

interface AddEditModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: EquipmentAssignment
  refetchEquipmentAssignments: () => void
}

export function AddEditAssignmentModal({
  open,
  onOpenChange,
  initialData,
  refetchEquipmentAssignments,
}: AddEditModalProps) {
  const defaultValues = {
    construction_site_id: '',
    equipment_id: '',
    assigned_to: '',
    assigned_at: new Date(),
    return_expected_at: new Date(),
    status: 'active',
    notes: '',
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  })

  useEffect(() => {
    if (initialData) {
      form.reset({
        construction_site_id: String(initialData.assignable.id),
        equipment_id: String(initialData.equipment_id),
        assigned_to: initialData.assigned_to ? String(initialData.assigned_to) : '',
        assigned_at: new Date(initialData.assigned_at),
        return_expected_at: initialData.return_expected_at ? new Date(initialData.return_expected_at) : new Date(),
        status: initialData.status,
        notes: initialData.notes || '',
      })
    } else {
      form.reset(defaultValues)
    }
  }, [initialData, form])

  const short_code = useShortCode()
  const { data: equipmentData } = useGetEquipmentQuery({
    shortCode: short_code,
    search: '',
    page: 1,
    perPage: 100
  })
  const { data: sites } = useGetSitesQuery({ shortCode: short_code })
  const { data: employees } = useGetEmployeesQuery(short_code)
  const [addEquipmentAssignment, { isLoading: isAddLoading }] = useAddEquipmentAssignmentMutation()
  const [updateEquipmentAssignment, { isLoading: isUpdateLoading }] = useUpdateEquipmentAssignmentMutation()

  const isLoading = isAddLoading || isUpdateLoading

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const submissionData = {
        ...values,
        assignable_id: values.construction_site_id,
      }

      if (initialData) {
        await updateEquipmentAssignment({
          shortCode: short_code,
          equipmentAssignmentData: submissionData,
          id: initialData.id
        }).unwrap()
      } else {
        await addEquipmentAssignment({
          shortCode: short_code,
          equipmentAssignmentData: submissionData
        }).unwrap()
      }
      form.reset(defaultValues)
      onOpenChange(false)
      refetchEquipmentAssignments()
    } catch (error) {
      console.error(`Failed to ${initialData ? 'update' : 'add'} equipment assignment:`, error)
    }
  }

  const handleClose = () => {
    form.reset(defaultValues)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit' : 'Add'} Equipment Assignment</DialogTitle>
          <DialogDescription>
            {initialData ? 'Edit the' : 'Create a new'} equipment assignment here
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <FormField
              control={form.control}
              name="construction_site_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Construction Site <span className="text-red-500">*</span></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select construction site" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sites?.data.map((site: any) => (
                        <SelectItem key={site.id} value={String(site.id)}>
                          {site.name}
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
              name="equipment_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Equipment <span className="text-red-500">*</span></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select equipment" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        equipmentData?.data.map((equipment: any) => (
                          <SelectItem key={equipment.id} value={String(equipment.id)}>
                            {equipment.name}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assigned_to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operator <span className="text-red-500">*</span></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select operator" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employees ? (
                        employees.map((employee: any) => (
                          <SelectItem key={employee.id} value={String(employee.id)}>
                            {employee.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="" disabled>
                          No operators available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assigned_at"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Assignment Date <span className="text-red-500">*</span></FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date()
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="return_expected_at"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Expected Return Date <span className="text-red-500">*</span></FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date()
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status <span className="text-red-500">*</span></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional notes..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {initialData ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
