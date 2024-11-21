import { Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import ThemeSwitch from '@/components/theme-switch'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { UserNav } from '@/components/user-nav'
import {
  ArrowLeft,
  Download,
  Send,
  Clock,
  Building,
  Phone,
  Mail as MailIcon,
  MapPin,
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useGetInvoiceByIdQuery } from '@/services/invoiceApi'
import { useShortCode } from '@/hooks/use-local-storage'
import { useMarkInvoiceAsPaidMutation, useLazyDownloadInvoicePdfQuery } from '@/services/invoiceApi';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import {useState} from "react";

export default function InvoiceDetails() {
  const navigate = useNavigate()
  const { id } = useParams()
  const short_code = useShortCode()
  const { data: invoiceData, isLoading, isError } = useGetInvoiceByIdQuery({ 
    id: Number(id), 
    venue_short_code: short_code 
  })

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [markAsPaid] = useMarkInvoiceAsPaidMutation();
  const [triggerDownload] = useLazyDownloadInvoicePdfQuery();

  const form = useForm({
    defaultValues: {
      payment_method: 'cash',
      payment_date: new Date().toISOString().split('T')[0]
    }
  });

  // @ts-ignore
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0)
  }

  const handleMarkAsPaid = async (formData: any) => {
    try {
      await markAsPaid({
        venue_short_code: short_code,
        id: Number(id),
        data: formData
      }).unwrap();

      toast({
        title: 'Success',
        description: 'Invoice marked as paid successfully',
      });
      setShowPaymentModal(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to mark invoice as paid',
        variant: 'destructive'
      });
    }
  };

  const handleDownload = async () => {
    try {
      const response = await triggerDownload({
        venue_short_code: short_code,
        id: Number(id)
      }).unwrap();

      // Convert base64 to blob
      // @ts-ignore
      const byteCharacters = atob(response.data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      // @ts-ignore
      a.download = response.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to download invoice',
        variant: 'destructive'
      });
    }
  };


  if (isLoading) {
    return (
      <Layout>
        <Layout.Body>
          <div className="flex justify-center py-8">Loading...</div>
        </Layout.Body>
      </Layout>
    )
  }

  if (isError) {
    return (
      <Layout>
        <Layout.Body>
          <div className="flex justify-center py-8">Error loading invoice details</div>
        </Layout.Body>
      </Layout>
    )
  }

  const invoice = invoiceData?.invoice

  return (
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-6'>
        {/* Header Section */}
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
                Invoice #{invoice?.number}
              </h2>
              <p className='text-sm text-muted-foreground'>
                View and manage invoice details
              </p>
            </div>
          </div>
          <div className='flex space-x-2'>
            <Button variant='outline' onClick={handleDownload}>
              <Download className='mr-2 h-4 w-4' />
              Download
            </Button>
            {invoice?.status !== 'paid' && (
                <Button onClick={() => setShowPaymentModal(true)}>
                  <Send className='mr-2 h-4 w-4'/>
                  Mark as Paid
                </Button>
            )}
          </div>
        </div>

        <div className='grid gap-6 md:grid-cols-2'>
          {/* Invoice Status Card */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Status</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Status</span>
                <Badge
                  variant={
                    invoice?.status === 'paid'
                      ? 'success'
                      : invoice?.status === 'pending'
                        ? 'warning'
                        : 'destructive'
                  }
                >
                  {/*// @ts-ignore*/}
                  {invoice?.status?.charAt(0).toUpperCase() + invoice?.status?.slice(1)}
                </Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Issue Date</span>
                <span className='flex items-center text-sm'>
                  <Clock className='mr-2 h-4 w-4 text-muted-foreground' />
                  {invoice?.dates?.issue_date}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Due Date</span>
                <span className='flex items-center text-sm'>
                  <Clock className='mr-2 h-4 w-4 text-muted-foreground' />
                  {invoice?.dates?.due_date}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Client Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {invoice?.client && (
                <div className='flex flex-col space-y-2'>
                  <div className='flex items-center space-x-2'>
                    <Building className='h-4 w-4 text-muted-foreground' />
                    <span className='font-medium'>{invoice.client.name}</span>
                  </div>
                  {invoice.client.email && (
                    <div className='flex items-center space-x-2'>
                      <MailIcon className='h-4 w-4 text-muted-foreground' />
                      <span>{invoice.client.email}</span>
                    </div>
                  )}
                  {invoice.client.phone && (
                    <div className='flex items-center space-x-2'>
                      <Phone className='h-4 w-4 text-muted-foreground' />
                      <span>{invoice.client.phone}</span>
                    </div>
                  )}
                  {invoice.client.address && (
                    <div className='flex items-center space-x-2'>
                      <MapPin className='h-4 w-4 text-muted-foreground' />
                      <span>{invoice.client.address}</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Invoice Items Card */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Rate</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice?.items?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.rate)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 space-y-2">
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(invoice?.amounts?.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Tax</span>
                <span>{formatCurrency(invoice?.amounts?.tax)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{formatCurrency(invoice?.amounts?.total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment History Card */}
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            {/*// @ts-ignore*/}
            {invoice?.payments?.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/*// @ts-ignore*/}
                  {invoice.payments.map((payment, index) => (
                    <TableRow key={index}>
                      {/*// @ts-ignore*/}
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>
                        {/*// @ts-ignore*/}
                        {payment.method?.charAt(0).toUpperCase() + payment.method?.slice(1)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            // @ts-ignore
                            payment.status === 'completed'
                              ? 'success'
                                // @ts-ignore
                              : payment.status === 'pending'
                                ? 'warning'
                                : 'destructive'
                          }
                        >
                          {/*//@ts-ignore*/}
                          {payment.status?.charAt(0).toUpperCase() + payment.status?.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {/*//@ts-ignore*/}
                        {formatCurrency(payment.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className='flex items-center justify-center py-8 text-sm text-muted-foreground'>
                No payment records found for this invoice
              </div>
            )}
          </CardContent>
        </Card>
        <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Mark Invoice as Paid</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleMarkAsPaid)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="payment_method"
                    render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Method</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select payment method" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="cash">Cash</SelectItem>
                              <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                              <SelectItem value="card">Card</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="payment_date"
                    render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                        </FormItem>
                    )}
                />
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setShowPaymentModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Confirm Payment</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </Layout.Body>
    </Layout>
  )
}
