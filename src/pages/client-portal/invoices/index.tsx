import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { UserNav } from '@/components/user-nav'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import {
  AlertCircle,
  CheckCircle,
  DollarSign,
  Download,
  Search,
} from 'lucide-react'
import { useState } from 'react'
import { PaymentModal } from '../../../components/client-portal/invoice-payment-modal'
import {
  useGetClientInvoicesQuery,
  useLazyDownloadClientInvoicePdfQuery,
} from '@/services/clientInvoicesApi'
import { useShortCode } from '../../../hooks/use-local-storage'
import { useDebounce } from '@/pages/clients/client-projects'
import { toast } from '@/components/ui/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { initialPage } from '@/components/table/data'

interface Invoice {
  id: number
  number: string
  service_name: string
  date: Date
  due_date: Date
  amount: number
  status: 'paid' | 'pending' | 'overdue'
}

export default function Invoices() {
  const [paginationValues, setPaginationValues] = useState(initialPage)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const short_code = useShortCode()
  const debouncedSearch = useDebounce(searchTerm, 500)

  const {
    data: invoicesData,
    isLoading,
    isError,
  } = useGetClientInvoicesQuery({
    venue_short_code: short_code,
    ...paginationValues,
    search: debouncedSearch,
    status: statusFilter,
  })

  const [triggerDownload] = useLazyDownloadClientInvoicePdfQuery()

  const columns: ColumnDef<Invoice>[] = [
    {
      accessorKey: 'number',
      header: 'Invoice #',
      cell: ({ row }) => (
        <span className='font-medium'>#{row.original.number}</span>
      ),
    },
    {
      accessorKey: 'service_name',
      header: 'Service',
      cell: ({ row }) => <span>{row.original.service_name}</span>,
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => (
        <span>{format(new Date(row.original.date), 'MMM dd, yyyy')}</span>
      ),
    },
    {
      accessorKey: 'due_date',
      header: 'Due Date',
      cell: ({ row }) => (
        <span>{format(new Date(row.original.due_date), 'MMM dd, yyyy')}</span>
      ),
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => <span> ${row.original.amount}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge
          variant={
            row.original.status === 'paid'
              ? 'success'
              : row.original.status === 'overdue'
                ? 'destructive'
                : 'warning'
          }
        >
          {row.original.status.charAt(0).toUpperCase() +
            row.original.status.slice(1)}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className='flex justify-end space-x-2'>
          {(row.original.status === 'pending' ||
            row.original.status === 'overdue') && (
            <Button size='sm' onClick={() => setSelectedInvoice(row.original)}>
              Pay Now
            </Button>
          )}
          <Button
            variant='ghost'
            size='sm'
            onClick={() => {
              handleDownload(row.original.id)
            }}
          >
            <Download className='h-4 w-4' />
          </Button>
        </div>
      ),
    },
  ]

  const handleDownload = async (invoiceId: any) => {
    try {
      const response = await triggerDownload({
        venue_short_code: short_code,
        id: Number(invoiceId),
      }).unwrap()

      // Convert base64 to blob
      // @ts-ignore
      const byteCharacters = atob(response.data)
      const byteNumbers = new Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      const blob = new Blob([byteArray], { type: 'application/pdf' })

      // Create download link
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      // @ts-ignore
      a.download = response.filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to download invoice',
        variant: 'destructive',
      })
    }
  }

  const handleStatusChange = (value: string) => {
    setStatusFilter(value)
    setPaginationValues((prev) => ({
      ...prev,
      page: 1,
    }))
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setPaginationValues((prev) => ({
      ...prev,
      page: 1,
    }))
  }

  if (isLoading) {
    return <div>Loading...</div> // Simple loading state
  }

  if (isError) {
    return <div>Error loading invoices</div> // Error state
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
            <h2 className='text-2xl font-bold tracking-tight'>My Invoices</h2>
            <p className='text-sm text-muted-foreground'>
              View and pay your invoices
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className='grid gap-4 md:grid-cols-3'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Due Now</CardTitle>
              <AlertCircle className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                ${invoicesData?.stats.due_now}
              </div>
              <p className='text-xs text-muted-foreground'>
                Outstanding balance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Recent Payment
              </CardTitle>
              <DollarSign className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                ${invoicesData?.stats?.last_payment}
              </div>
              <p className='text-xs text-muted-foreground'>Last paid amount</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Payment Status
              </CardTitle>
              <CheckCircle className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {invoicesData?.stats.total_count}
              </div>
              <p className='text-xs text-muted-foreground'>Total invoices</p>
            </CardContent>
          </Card>
        </div>

        {/* Invoices Table */}
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <CardTitle>Invoice History</CardTitle>
                <p className='text-sm text-muted-foreground'>
                  View all your invoices and payment history
                </p>
              </div>
              <div className='flex space-x-2'>
                <div className='relative'>
                  <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    placeholder='Search invoices...'
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className='w-[250px] pl-8'
                  />
                </div>
                <Select value={statusFilter} onValueChange={handleStatusChange}>
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
            <GenericTableWrapper
              columns={columns}
              // @ts-ignore
              data={invoicesData?.invoices.data || []}
              isLoading={isLoading}
              isError={isError}
              showToolbar={false}
              {...{ paginationValues, setPaginationValues }}
            />
          </CardContent>
        </Card>
      </Layout.Body>

      {selectedInvoice && (
        <PaymentModal
          open={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          invoice={selectedInvoice}
          onPaymentComplete={() => {
            // Handle any necessary actions after payment is complete
          }}
        />
      )}
    </Layout>
  )
}
