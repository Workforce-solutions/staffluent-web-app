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
import { useUpdateTicketPriorityMutation } from '@/services/adminTicketApi'

interface CreateEditStatusModalProps extends OpenModalProps {
    ticket?: any
}

const createTaskSchema = z
    .object({
        priority: z.string().min(1, { message: 'Please select status' }),
    })

export function UpdatePriorityModal({
    open,
    setOpen,
    ticket,
}: CreateEditStatusModalProps) {
    const { toast } = useToast()
    const venue_short_code = useShortCode()
    const [updatePriority] = useUpdateTicketPriorityMutation()

    const form = useForm({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            priority: ticket?.priority || '',
        },
    })

    useEffect(() => {
        form.reset({ priority: ticket?.priority || '' })
        return () => { }
    }, [ticket])

    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (data: any) => {
        setIsSubmitting(true)
        await updatePriority({
            venue_short_code: venue_short_code,
            ticket_id: ticket.id,
            priority: data.priority
        }).unwrap()
        setIsSubmitting(false)
        toast({
            title: 'Success',
            description: 'Priority updated successfully',
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
                            <span>Update Priority</span>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <FormField
                            control={form.control}
                            name='priority'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Priority</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Select priority' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                            <SelectItem value="urgent">Urgent</SelectItem>
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
                                Update Priority
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

