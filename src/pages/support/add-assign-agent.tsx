import { OpenModalProps } from '@/@types/common'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { useShortCode } from '@/hooks/use-local-storage'
import { IconUsers } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
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
import { useAssignTicketMutation } from '@/services/adminTicketApi'
import { useGetEmployeesQuery } from '@/services/staffApi'
import { CardContent } from '@/components/ui/card'

interface CreateEditStatusModalProps extends OpenModalProps {
    assigned_to?: any,
    ticket?: any,
}

const createTaskSchema = z
    .object({
        assigned_to: z.string().min(1, { message: 'Please select status' }),
    })

export function AddAsigneModal({
    open,
    setOpen,
    ticket,
}: CreateEditStatusModalProps) {
    const { toast } = useToast()
    const short_code = useShortCode()

    const { data: employees = [] } = useGetEmployeesQuery(short_code)
    const [addAgent] = useAssignTicketMutation()

    const form = useForm({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            assigned_to: '',
        },
    })

    useEffect(() => {
        form.reset()
        return () => { }
    }, [])

    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (data: any) => {
        setIsSubmitting(true)
        await addAgent({
            venue_short_code: short_code,
            ticket_id: ticket.id,
            employee_id: data.assigned_to
        }).unwrap()
        setIsSubmitting(false)
        toast({
            title: 'Success',
            description: 'Status updated successfully',
        })
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='flex max-h-[90vh] flex-col overflow-auto sm:max-w-[425px] md:min-w-[900px]'>
                <DialogHeader>
                    <DialogTitle>
                        <div className='flex items-center space-x-2'>
                            <IconUsers size={24} />
                            <span>Add Agent</span>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <CardContent className='space-y-4'>
                            <FormField
                                control={form.control}
                                name='assigned_to'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Agent</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Select agent' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {employees.map((employee: any) => {
                                                    return (
                                                        <SelectItem key={employee.id} value={employee.id.toString()}>
                                                            {employee.name}
                                                        </SelectItem>
                                                    )
                                                })}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <div className='flex justify-end space-x-4'>
                            <Button
                                type='button'
                                variant='outline'
                                disabled={isSubmitting}
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type='submit'
                                disabled={isSubmitting}
                                onClick={form.handleSubmit(onSubmit)}
                            >
                                Update Agent
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
