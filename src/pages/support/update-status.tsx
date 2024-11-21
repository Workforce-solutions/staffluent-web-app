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
import { useUpdateTicketStatusMutation } from '@/services/adminTicketApi'

interface CreateEditStatusModalProps extends OpenModalProps {
    ticket?: any
}

const createTaskSchema = z
    .object({
        status: z.string().min(1, { message: 'Please select status' }),
    })

export function UpdateStatusModal({
    open,
    setOpen,
    ticket,
}: CreateEditStatusModalProps) {
    const { toast } = useToast()
    const venue_short_code = useShortCode()
    const [updateStatus] = useUpdateTicketStatusMutation()

    const form = useForm({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            status: ticket?.status || '',
        },
    })

    useEffect(() => {
        form.reset({ status: ticket?.status || '' })
        return () => { }
    }, [ticket])

    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (data: any) => {
        setIsSubmitting(true)
        await updateStatus({
            venue_short_code: venue_short_code,
            ticket_id: ticket.id,
            status: data.status
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
                            <span>Update Status</span>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <FormField
                            control={form.control}
                            name='status'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Select status' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="open">Open</SelectItem>
                                            <SelectItem value="in_progress">In Progress</SelectItem>
                                            <SelectItem value="resolved">Resolved</SelectItem>
                                            <SelectItem value="closed">Closed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                Update Status
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

