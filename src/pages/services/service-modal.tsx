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
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'

interface ServiceModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    service?: any; // Replace with your type
}

export function ServiceModal({ open, setOpen, service }: ServiceModalProps) {
    const { toast } = useToast()
    const isEditing = !!service

    const form = useForm({
        defaultValues: {
            name: service?.name || '',
            category: service?.category || '',
            priceType: service?.priceType || '',
            basePrice: service?.basePrice?.replace('$', '') || '',
            duration: service?.duration?.replace(' mins', '') || '',
            status: service?.status || 'Active'
        },
    })

    // @ts-ignore
    const onSubmit = async (data: any) => {
        try {
            // Your API call here
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

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit' : 'Add'} Service</DialogTitle>
                    <DialogDescription>
                        {isEditing ? 'Edit the' : 'Create a new'} service offering
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter service name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="regular">Regular Service</SelectItem>
                                            <SelectItem value="maintenance">Maintenance</SelectItem>
                                            <SelectItem value="repair">Repair</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="priceType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select price type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="fixed">Fixed</SelectItem>
                                            <SelectItem value="hourly">Hourly</SelectItem>
                                            <SelectItem value="quote">Quote</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="basePrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Base Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter base price"
                                            {...field}
                                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Duration (minutes)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter duration in minutes"
                                            {...field}
                                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end space-x-2 pt-4">
                            <Button
                                variant="outline"
                                onClick={() => setOpen(false)}
                                type="button"
                            >
                                Cancel
                            </Button>
                            <Button type="submit">
                                {isEditing ? 'Save changes' : 'Create'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}