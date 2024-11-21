import { Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Search,
  // Filter,
  Download,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Plus,
  Eye,
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import ThemeSwitch from '../../components/theme-switch'
import { UserNav } from '../../components/user-nav'
import { useShortCode } from '@/hooks/use-local-storage'
import {useGetInvoiceListQuery, useLazyDownloadInvoicePdfQuery} from '@/services/invoiceApi'
import {toast} from "../../components/ui/use-toast";

export default function AdminInvoices() {
  const navigate = useNavigate()
  const short_code = useShortCode()
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    page: 1,
    per_page: 15
  })


  const { data: invoiceData, isLoading } = useGetInvoiceListQuery({
    venue_short_code: short_code,
    // @ts-ignore
    query: `&search=${filters.search}&status=${filters.status !== 'all' ? filters.status : ''}&page=${filters.page}&per_page=${filters.per_page}`
  });

  const [triggerDownload] = useLazyDownloadInvoicePdfQuery();

  const handleDownload = async (invoiceId: any) => {
    try {
      const response = await triggerDownload({
        venue_short_code: short_code,
        id: Number(invoiceId)
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



  //@ts-ignore
  const handleSearch = (value: string) => {
    setFilters(prev => ({
      ...prev,
      search: value,
      page: 1
    }))
  }

  const handleStatusChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      status: value,
      page: 1
    }))
  }

  //@ts-ignore
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
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
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Invoices</h2>
            <p className='text-sm text-muted-foreground'>
              Manage and track all invoices
            </p>
          </div>
          <div className='flex space-x-2'>
            <Button onClick={() => navigate('/admin/invoices/create')}>
              <Plus className='mr-2 h-4 w-4' />
              Generate Invoice
            </Button>
          </div>
        </div>

        {/* Invoice Stats */}
        <div className='grid gap-4 md:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
              <DollarSign className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {/*//@ts-ignore*/}
                {formatCurrency(invoiceData?.stats?.total_revenue || 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Outstanding</CardTitle>
              <AlertCircle className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {/*//@ts-ignore*/}
                {formatCurrency(invoiceData?.stats?.outstanding_amount || 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Paid This Month</CardTitle>
              <TrendingUp className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {/*//@ts-ignore*/}
                {formatCurrency(invoiceData?.stats?.paid_this_month || 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Overdue</CardTitle>
              <AlertCircle className='h-4 w-4 text-red-500' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-red-500'>
                {/*//@ts-ignore*/}
                {formatCurrency(invoiceData?.stats?.overdue_amount || 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invoices Table */}
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <CardTitle>All Invoices</CardTitle>
                <p className='text-sm text-muted-foreground'>
                  View and manage all invoices
                </p>
              </div>
              <div className='flex items-center space-x-2'>
                <div className='relative'>
                  <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    placeholder='Search invoices...'
                    value={filters.search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className='w-[250px] pl-8'
                  />
                </div>
                <Select 
                  value={filters.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Filter by status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Status</SelectItem>
                    <SelectItem value='paid'>Paid</SelectItem>
                    <SelectItem value='pending'>Pending</SelectItem>
                    <SelectItem value='overdue'>Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">Loading...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoiceData?.invoices?.data?.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className='font-medium'>
                        {invoice.number}
                      </TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell>{invoice.service}</TableCell>
                      <TableCell>
                        {formatCurrency(invoice.amount)}
                      </TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.due_date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            invoice.status === 'paid'
                              ? 'success'
                              : invoice.status === 'pending'
                                ? 'warning'
                                : invoice.status === 'overdue'
                                  ? 'destructive'
                                  : 'default'
                          }
                        >
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className='flex space-x-2'>
                          <Button variant='ghost' size='icon' onClick={() => handleDownload(invoice.id)}>
                            <Download className='h-4 w-4' />
                          </Button>
                          <Button
                            variant='ghost'
                            size='icon'
                            onClick={() => navigate(`/admin/invoices/${invoice.id}`)}
                          >
                            <Eye className='h-4 w-4' />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
