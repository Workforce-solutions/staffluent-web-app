import {useEffect, useMemo, useState} from "react";
import { Layout } from '@/components/custom/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, PlusCircle, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCreateInvoiceMutation } from '@/services/invoiceApi';
import { useGetServiceRequestsQuery } from '@/services/servicesApi';
import { useShortCode } from '@/hooks/use-local-storage';
import { toast } from '@/components/ui/use-toast';
import ThemeSwitch from "../../components/theme-switch";
import {UserNav} from "../../components/user-nav";
import { initialPage } from '@/components/table/data'

// Updated schema with better validation
const invoiceItemSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  quantity: z.string().transform(val => {
    const num = Number(val);
    if (isNaN(num) || num <= 0) return 0;
    return num;
  }),
  rate: z.string().transform(val => {
    const num = Number(val);
    if (isNaN(num) || num < 0) return 0;
    return num;
  }),
  amount: z.string().optional(),
});

const createInvoiceSchema = z.object({
  service_request_id: z.string().min(1, 'Please select a service request'),
  due_date: z.string().min(1, 'Due date is required'),
  payment_terms: z.string().min(1, 'Please select payment terms'),
  notes: z.string().min(1, 'Notes are required'),
  currency: z.string().min(1, 'Please select currency'),
  items: z.array(invoiceItemSchema).min(1, 'At least one item is required'),
});

export default function GenerateInvoice() {
  const navigate = useNavigate();
  const venue_short_code = useShortCode();
  const [paginationProps] = useState(initialPage);
  const [createInvoice, { isLoading }] = useCreateInvoiceMutation();

  const { data: serviceRequestResponse } = useGetServiceRequestsQuery({
    venue_short_code,
    ...paginationProps,
    status: 'scheduled',
  });

  const form = useForm({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues: {
      service_request_id: '',
      due_date: '',
      notes: '',
      items: [{
        description: '',
        quantity: '1',
        rate: '0',
        amount: '0'
      }],
      payment_terms: '',
      currency: 'usd',
    },
    mode: 'onChange', // Enable real-time validation
  });

  // Calculate totals based on items with better precision

// Calculate totals based on items with better precision
  const totals = useMemo(() => {
    const items = form.getValues('items') || [];
    const subtotal = items.reduce((sum, item) => {
      const quantity = parseFloat(item.quantity) || 0;
      const rate = parseFloat(item.rate) || 0;
      return sum + (quantity * rate);
    }, 0);

    const taxRate = 0.10;
    const taxAmount = subtotal * taxRate;
    const total = subtotal + taxAmount;

    return {
      subtotal: subtotal.toFixed(2),
      tax: taxAmount.toFixed(2),
      total: total.toFixed(2),
    };
  }, [form.watch('items')]);

  // Update item amounts and totals when quantity or rate change
  useEffect(() => {
    const items = form.getValues('items');
    items.forEach((item, index) => {
      const quantity = parseFloat(item.quantity) || 0;
      const rate = parseFloat(item.rate) || 0;
      const amount = (quantity * rate).toFixed(2);

      form.setValue(`items.${index}.amount`, amount, {
        shouldValidate: false, // Avoid re-rendering
      });
    });
  }, [form.watch('items')]); // Re-run when any field in 'items' changes

  // Improved service request selection handler
  const onServiceRequestChange = (serviceRequestId: string) => {
    if (!serviceRequestId) return;

    form.setValue('service_request_id', serviceRequestId, {
      shouldValidate: true,
    });

    const selectedRequest = serviceRequestResponse?.requests?.data?.find(
        req => req?.id?.toString() === serviceRequestId
    );

    if (selectedRequest?.service) {
      // @ts-ignore
      const amount = selectedRequest.service.base_price || 0;
      form.setValue('items', [{
        // @ts-ignore
        description: selectedRequest.service.name || '',
        quantity: '1',
        rate: amount.toString(),
        amount: amount.toString()
      }], {
        shouldValidate: true,
        shouldDirty: true,
      });

      form.clearErrors('items');
    }
  };

  const onSubmit = async (data: z.infer<typeof createInvoiceSchema>) => {
    try {
      await createInvoice({
        venue_short_code,
        data: {
          ...data,
          // @ts-ignore
          items: data.items.map(item => ({
            ...item,
            amount: (Number(item.quantity) * Number(item.rate)).toFixed(2),
          })),
          amount: totals.subtotal,
          tax_amount: totals.tax,
          total_amount: totals.total,
        },
      }).unwrap();

      toast({
        title: 'Success',
        description: 'Invoice created successfully',
      });
      navigate('/admin/invoices');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create invoice',
        variant: 'destructive',
      });
    }
  };

  // Handler for adding new items
  const handleAddItem = () => {
    const items = form.getValues('items');
    form.setValue('items', [
      ...items,
      {
        description: '',
        quantity: '1',
        rate: '0',
        amount: '0'
      }
    ], {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  // Handler for removing items
  const handleRemoveItem = (index: number) => {
    const items = form.getValues('items');
    if (items.length > 1) {
      form.setValue(
          'items',
          items.filter((_, i) => i !== index),
          {
            shouldValidate: true,
            shouldDirty: true
          }
      );
    }
  };

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
              <Button variant='outline' onClick={() => navigate('/admin/invoices')}>
                Cancel
              </Button>
              <Button
                  // @ts-ignore
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={isLoading || !form.formState.isValid}
              >
                {isLoading ? 'Generating...' : 'Generate Invoice'}
              </Button>
            </div>
          </div>

          <Form {...form}>
            {/*// @ts-ignore*/}
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              {/* Invoice Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Invoice Details</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <FormField
                      control={form.control}
                      name='service_request_id'
                      render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Request</FormLabel>
                            <Select
                                onValueChange={onServiceRequestChange}
                                defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Select service request' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {serviceRequestResponse?.requests?.data
                                    ?.filter(request => request?.service !== '-')
                                    .map(request => (
                                        <SelectItem
                                            key={request?.id || ''}
                                            value={(request?.id || '').toString()}
                                        >
                                          {/*// @ts-ignore*/}
                                          {request?.reference || ''} - {request?.service?.name || ''}
                                        </SelectItem>
                                    )) || []}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                      )}
                  />

                  <div className='grid grid-cols-2 gap-4'>
                    <FormField
                        control={form.control}
                        name='due_date'
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>Due Date</FormLabel>
                              <FormControl>
                                <Input
                                    type='date'
                                    {...field}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='payment_terms'
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>Payment Terms</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder='Select payment terms' />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value='net30'>Net 30</SelectItem>
                                  <SelectItem value='net15'>Net 15</SelectItem>
                                  <SelectItem value='due-receipt'>Due on Receipt</SelectItem>
                                </SelectContent>
                              </Select>
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
                        onClick={handleAddItem}
                    >
                      <PlusCircle className='mr-2 h-4 w-4' />
                      Add Item
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {/*// @ts-ignore*/}
                  {form.watch('items').map((item, index) => (
                      <div key={index} className='flex items-start space-x-4'>
                        <FormField
                            control={form.control}
                            name={`items.${index}.description`}
                            render={({ field }) => (
                                <FormItem className='flex-1'>
                                  <FormControl>
                                    <Input placeholder='Description' {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`items.${index}.quantity`}
                            render={({ field }) => (
                                <FormItem className='w-24'>
                                  <FormControl>
                                    <Input
                                        type='number'
                                        min='1'
                                        step='1'
                                        placeholder='Qty'
                                        {...field}
                                        onChange={(e) => {
                                          field.onChange(e);
                                          const quantity = parseFloat(e.target.value) || 0;
                                          const rate = parseFloat(form.getValues(`items.${index}.rate`)) || 0;
                                          form.setValue(`items.${index}.amount`, (quantity * rate).toFixed(2), {
                                            shouldValidate: false,
                                          });
                                        }}
                                    />
                                  </FormControl>
                                  <FormMessage />
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
                                        min='0'
                                        step='0.01'
                                        placeholder='Rate'
                                        {...field}
                                        onChange={(e) => {
                                          field.onChange(e);
                                          const rate = parseFloat(e.target.value) || 0;
                                          const quantity = parseFloat(form.getValues(`items.${index}.quantity`)) || 0;
                                          form.setValue(`items.${index}.amount`, (quantity * rate).toFixed(2), {
                                            shouldValidate: false,
                                          });
                                        }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`items.${index}.amount`}
                            render={({ field }) => (
                                <FormItem className='w-32'>
                                  <FormControl>
                                    <Input
                                        disabled
                                        placeholder='Amount'
                                        value={field.value}
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
                            onClick={() => handleRemoveItem(index)}
                            disabled={form.watch('items').length === 1}
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

                  <FormField
                      control={form.control}
                      name='currency'
                      render={({ field }) => (
                          <FormItem>
                            <FormLabel>Currency</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
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
                      <span className='font-medium'>
                      ${totals.subtotal}
                    </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Tax (10%)</span>
                      <span className='font-medium'>
                      ${totals.tax}
                    </span>
                    </div>
                    <div className='mt-2 border-t pt-2'>
                      <div className='flex justify-between'>
                        <span className='font-medium'>Total</span>
                        <span className='font-bold'>
                        ${totals.total}
                      </span>
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
                    type='submit'
                    disabled={isLoading || !form.formState.isValid}
                >
                  {isLoading ? 'Generating...' : 'Generate Invoice'}
                </Button>
              </div>
            </form>
          </Form>
        </Layout.Body>
      </Layout>
  );
}