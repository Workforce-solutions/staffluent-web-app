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
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, PlusCircle, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import ThemeSwitch from '../../components/theme-switch'
import { UserNav } from '../../components/user-nav'
import { useGetServiceRequestsQuery } from '@/services/servicesApi'
import { useShortCode } from '@/hooks/use-local-storage'
import { useState } from 'react'
import { initialPage } from '@/components/table/data'
import { ServiceRequestsProps } from '@/@types/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCreateInvoiceMutation } from '@/services/invoiceApi'
import { toast } from '@/components/ui/use-toast'

const createInvoiceSchema = z.object({
  service_request_id: z.string().min(1, { message: 'Please select service request' }),
  due_date: z.string().min(1, { message: 'Please select due date' }),
  payment_terms: z.string().min(1, { message: 'Please select payment terms' }),
  notes: z.string().min(1, { message: 'Please enter note' }),
})

export default function GenerateInvoice() {

  const navigate = useNavigate()
  const venue_short_code = useShortCode()
  const [paginationProps] = useState(initialPage)
  const [createInvoice] = useCreateInvoiceMutation();

  const { data: serviceRequestResponse } = useGetServiceRequestsQuery({
    venue_short_code,
    ...paginationProps,
    status: undefined,
  })

  const form = useForm({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues: {
      client: '',
      service_request_id: '',
      amount: '',
      due_date: '',
      notes: '',
      items: [{ description: '', quantity: '1', rate: '', amount: '' }],
      payment_terms: '',
      currency: 'usd',
    },
  })

  const onSubmit = async (data: any) => {
    await createInvoice({
      venue_short_code: venue_short_code,
      data: data,
    }).unwrap()
    toast({
      title: 'Success',
      description: 'Invoice created successfully',
    })
    navigate('/admin/invoices')
  }

  return (
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>
      <Layout.Body className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => navigate('/admin/invoices')}
            >
              <ArrowLeft className='h-4 w-4' />
            </Button>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>
                Generate New Invoice
              </h2>
              <p className='text-sm text-muted-foreground'>
                Create a new invoice for a client
              </p>
            </div>
          </div>
          <div className='flex space-x-2'>
            <Button variant='outline'>Save as Draft</Button>
            <Button onClick={form.handleSubmit(onSubmit)}>
              Generate Invoice
            </Button>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            {/* Invoice Details Card */}
            <Card>
              <CardHeader>
                <CardTitle>Invoice Details</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='client'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select client' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='1'>Restaurant ABC</SelectItem>
                            <SelectItem value='2'>Cafe XYZ</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='service_request_id'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Request</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select service request' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {
                              serviceRequestResponse?.requests.data.filter((request: ServiceRequestsProps) => request.service != '-').map((request: ServiceRequestsProps) => (
                                <SelectItem value={request.id + ''}>{request.reference}</SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='due_date'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Due Date</FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
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
                <div className='flex items-center justify-between'>
                  <CardTitle>Invoice Items</CardTitle>
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={() => {
                      const items = form.getValues('items')
                      form.setValue('items', [
                        ...items,
                        {
                          description: '',
                          quantity: '1',
                          rate: '',
                          amount: '',
                        },
                      ])
                    }}
                  >
                    <PlusCircle className='mr-2 h-4 w-4' />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                {form.watch('items').map((_item, index) => (
                  <div key={index} className='flex items-start space-x-4'>
                    <FormField
                      control={form.control}
                      name={`items.${index}.description`}
                      render={({ field }) => (
                        <FormItem className='flex-1'>
                          <FormControl>
                            <Input placeholder='Description' {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`items.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem className='w-24'>
                          <FormControl>
                            <Input type='number' placeholder='Qty' {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`items.${index}.rate`}
                      render={({ field }) => (
                        <FormItem className='w-32'>
                          <FormControl>
                            <Input
                              type='number'
                              placeholder='Rate'
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      className='mt-2'
                      onClick={() => {
                        const items = form.getValues('items')
                        form.setValue(
                          'items',
                          items.filter((_, i) => i !== index)
                        )
                      }}
                    >
                      <Trash2 className='h-4 w-4' />
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
              <CardContent className='space-y-4'>
                <FormField
                  control={form.control}
                  name='notes'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Add any additional notes or payment instructions...'
                          className='h-24'
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

                <div className='grid grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='payment_terms'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Terms</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select payment terms' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='net30'>Net 30</SelectItem>
                            <SelectItem value='net15'>Net 15</SelectItem>
                            <SelectItem value='due-receipt'>
                              Due on Receipt
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='currency'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue='usd'
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select currency' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='usd'>USD ($)</SelectItem>
                            <SelectItem value='eur'>EUR (€)</SelectItem>
                            <SelectItem value='gbp'>GBP (£)</SelectItem>
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
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Subtotal</span>
                    <span className='font-medium'>$0.00</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Tax (10%)</span>
                    <span className='font-medium'>$0.00</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Discount</span>
                    <span className='font-medium'>-$0.00</span>
                  </div>
                  <div className='mt-2 border-t pt-2'>
                    <div className='flex justify-between'>
                      <span className='font-medium'>Total</span>
                      <span className='font-bold'>$0.00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className='flex justify-end space-x-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() => navigate('/admin/invoices')}
              >
                Cancel
              </Button>
              <Button
                type='button'
                variant='secondary'
                onClick={() => {
                  // Save as draft logic
                }}
              >
                Save as Draft
              </Button>
              <Button type='submit'>Generate Invoice</Button>
            </div>
          </form>
        </Form>
      </Layout.Body>
    </Layout>
  )
}
