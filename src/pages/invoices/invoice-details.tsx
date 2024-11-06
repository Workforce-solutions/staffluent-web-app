import { Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import {
  ArrowLeft,
  Download,
  Mail,
  Send,
  Clock,
  Building,
  Phone,
  Mail as MailIcon,
  MapPin,
  Receipt,
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

export default function InvoiceDetails() {
  const navigate = useNavigate()
  const { id } = useParams()

  // Mock data - replace with actual API call
  const invoice = {
    id: id,
    number: `INV-${id}`,
    date: '2024-01-15',
    dueDate: '2024-02-15',
    status: 'pending',
    amount: 299.99,
    client: {
      name: 'Restaurant ABC',
      address: '123 Business St, City, ST 12345',
      phone: '(555) 123-4567',
      email: 'contact@restaurantabc.com',
    },
    items: [
      {
        description: 'Equipment Maintenance',
        quantity: 1,
        rate: 299.99,
        amount: 299.99,
      },
    ],
    subtotal: 299.99,
    tax: 29.99,
    total: 329.98,
    notes: 'Payment is due within 30 days',
    paymentTerms: 'Net 30',
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
                Invoice #{invoice.number}
              </h2>
              <p className='text-sm text-muted-foreground'>
                View and manage invoice details
              </p>
            </div>
          </div>
          <div className='flex space-x-2'>
            <Button variant='outline'>
              <Mail className='mr-2 h-4 w-4' />
              Send Email
            </Button>
            <Button variant='outline'>
              <Download className='mr-2 h-4 w-4' />
              Download
            </Button>
            <Button>
              <Send className='mr-2 h-4 w-4' />
              Mark as Paid
            </Button>
          </div>
        </div>
        <div className='grid gap-6 md:grid-cols-2'>
          {/* Invoice Status */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Status</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Status</span>
                <Badge
                  variant={invoice.status === 'paid' ? 'success' : 'warning'}
                >
                  {invoice.status.charAt(0).toUpperCase() +
                    invoice.status.slice(1)}
                </Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>
                  Issue Date
                </span>
                <span className='flex items-center text-sm'>
                  <Clock className='mr-2 h-4 w-4 text-muted-foreground' />
                  {new Date(invoice.date).toLocaleDateString()}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Due Date</span>
                <span className='flex items-center text-sm'>
                  <Clock className='mr-2 h-4 w-4 text-muted-foreground' />
                  {new Date(invoice.dueDate).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center space-x-2'>
                <Building className='h-4 w-4 text-muted-foreground' />
                <span className='font-medium'>{invoice.client.name}</span>
              </div>
              <div className='flex items-center space-x-2'>
                <Phone className='h-4 w-4 text-muted-foreground' />
                <span>{invoice.client.phone}</span>
              </div>
              <div className='flex items-center space-x-2'>
                <MailIcon className='h-4 w-4 text-muted-foreground' />
                <span>{invoice.client.email}</span>
              </div>
              <div className='flex items-center space-x-2'>
                <MapPin className='h-4 w-4 text-muted-foreground' />
                <span>{invoice.client.address}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invoice Items */}
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <CardTitle>Invoice Items</CardTitle>
              <Receipt className='h-4 w-4 text-muted-foreground' />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className='text-right'>Quantity</TableHead>
                  <TableHead className='text-right'>Rate</TableHead>
                  <TableHead className='text-right'>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.items.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className='text-right'>
                      {item.quantity}
                    </TableCell>
                    <TableCell className='text-right'>
                      ${item.rate.toFixed(2)}
                    </TableCell>
                    <TableCell className='text-right'>
                      ${item.amount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className='mt-4 space-y-2'>
              <Separator />
              <div className='flex justify-between'>
                <span className='text-sm text-muted-foreground'>Subtotal</span>
                <span>${invoice.subtotal.toFixed(2)}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-sm text-muted-foreground'>Tax (10%)</span>
                <span>${invoice.tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className='flex justify-between font-medium'>
                <span>Total</span>
                <span>${invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <h4 className='mb-2 font-medium'>Notes</h4>
              <p className='text-sm text-muted-foreground'>{invoice.notes}</p>
            </div>
            <div>
              <h4 className='mb-2 font-medium'>Payment Terms</h4>
              <p className='text-sm text-muted-foreground'>
                {invoice.paymentTerms}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Payment History - If needed */}
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-center py-8 text-sm text-muted-foreground'>
              No payment records found for this invoice
            </div>
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
