// components/client-portal/request-service-modal.tsx
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"
import { DatePicker } from "@/components/ui/date-picker"
import {useState} from "react";
import {useRequestServiceMutation} from "../../services/clientPortalApi";

const requestServiceSchema = z.object({
    service_type: z.string().min(1, "Please select a service type"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    preferred_date: z.date().min(new Date(), "Date must be in the future"),
    notes: z.string().optional()
})

type RequestServiceForm = z.infer<typeof requestServiceSchema>

// @ts-ignore
export function RequestServiceModal({ open, setOpen }) {
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [requestService] = useRequestServiceMutation()

    const form = useForm<RequestServiceForm>({
        resolver: zodResolver(requestServiceSchema),
        defaultValues: {
            service_type: '',
            description: '',
            preferred_date: undefined,
            notes: ''
        }
    })

    const onSubmit = async (data: RequestServiceForm) => {
        try {
            setIsSubmitting(true)
            // @ts-ignore
            await requestService(data).unwrap()
            toast({
                title: "Service Requested",
                description: "Your service request has been submitted successfully"
            })
            setOpen(false)
            form.reset()
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit service request",
                variant: "destructive"
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Request New Service</DialogTitle>
                    <DialogDescription>
                        Fill out the form below to request a new service
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="service_type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Service Type</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select service type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="maintenance">Maintenance</SelectItem>
                                            <SelectItem value="repair">Repair</SelectItem>
                                            <SelectItem value="installation">Installation</SelectItem>
                                            <SelectItem value="consultation">Consultation</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                        placeholder="Describe what you need..."
                                        className="min-h-[100px]"
                                        {...field}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="preferred_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Preferred Date</FormLabel>
                                    <DatePicker
                                        {...field}
                                        minDate={new Date()}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Additional Notes (Optional)</FormLabel>
                                    <Textarea
                                        placeholder="Any additional details..."
                                        {...field}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Submit Request"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
