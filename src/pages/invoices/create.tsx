import { Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    ArrowLeft,
    PlusCircle,
    Trash2
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import ThemeSwitch from "../../components/theme-switch";
import {UserNav} from "../../components/user-nav";

export default function GenerateInvoice() {
    const navigate = useNavigate()
    const form = useForm({
        defaultValues: {
            client: "",
            service: "",
            amount: "",
            dueDate: "",
            notes: "",
            items: [{ description: "", quantity: "1", rate: "", amount: "" }],
            paymentTerms: "",
            currency: "usd"
        }
    })

    const onSubmit = (data: any) => {
        console.log(data)
        // Handle invoice creation
    }

    return (
        <Layout>
            <Layout.Header className="min-h-fit border-b">
                <div className="flex w-full flex-col">
                    <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
                        <ThemeSwitch />
                        <UserNav />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate('/admin/invoices')}
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                            <div>
                                <h2 className="text-lg font-medium">Generate New Invoice</h2>
                                <p className="text-sm text-muted-foreground">
                                    Create a new invoice for a client
                                </p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <Button variant="outline">Save as Draft</Button>
                            <Button onClick={form.handleSubmit(onSubmit)}>Generate Invoice</Button>
                        </div>
                    </div>
                </div>
            </Layout.Header>
            <Layout.Body className="space-y-6 p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* Invoice Details Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Invoice Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="client"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Client</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select client" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="1">Restaurant ABC</SelectItem>
                                                        <SelectItem value="2">Cafe XYZ</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="service"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Service</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select service" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="1">Equipment Maintenance</SelectItem>
                                                        <SelectItem value="2">Repair Service</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="dueDate"
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
                                </div>
                            </CardContent>
                        </Card>

                        {/* Invoice Items Card */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Invoice Items</CardTitle>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            const items = form.getValues('items')
                                            form.setValue('items', [
                                                ...items,
                                                { description: "", quantity: "1", rate: "", amount: "" }
                                            ])
                                        }}
                                    >
                                        <PlusCircle className="h-4 w-4 mr-2" />
                                        Add Item
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {form.watch('items').map((_item, index) => (
                                    <div key={index} className="flex space-x-4 items-start">
                                        <FormField
                                            control={form.control}
                                            name={`items.${index}.description`}
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormControl>
                                                        <Input placeholder="Description" {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`items.${index}.quantity`}
                                            render={({ field }) => (
                                                <FormItem className="w-24">
                                                    <FormControl>
                                                        <Input type="number" placeholder="Qty" {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`items.${index}.rate`}
                                            render={({ field }) => (
                                                <FormItem className="w-32">
                                                    <FormControl>
                                                        <Input type="number" placeholder="Rate" {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="mt-2"
                                            onClick={() => {
                                                const items = form.getValues('items')
                                                form.setValue('items', items.filter((_, i) => i !== index))
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Additional Information Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Additional Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="notes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Notes</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Add any additional notes or payment instructions..."
                                                    className="h-24"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                These notes will appear on the invoice
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="paymentTerms"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Payment Terms</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select payment terms" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="net30">Net 30</SelectItem>
                                                        <SelectItem value="net15">Net 15</SelectItem>
                                                        <SelectItem value="due-receipt">Due on Receipt</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="currency"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Currency</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue="usd">
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select currency" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="usd">USD ($)</SelectItem>
                                                        <SelectItem value="eur">EUR (€)</SelectItem>
                                                        <SelectItem value="gbp">GBP (£)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Invoice Summary Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Invoice Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="font-medium">$0.00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Tax (10%)</span>
                                        <span className="font-medium">$0.00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Discount</span>
                                        <span className="font-medium">-$0.00</span>
                                    </div>
                                    <div className="border-t pt-2 mt-2">
                                        <div className="flex justify-between">
                                            <span className="font-medium">Total</span>
                                            <span className="font-bold">$0.00</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end space-x-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/admin/invoices')}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => {
                                    // Save as draft logic
                                }}
                            >
                                Save as Draft
                            </Button>
                            <Button type="submit">Generate Invoice</Button>
                        </div>
                    </form>
                </Form>
            </Layout.Body>
        </Layout>
    )
}