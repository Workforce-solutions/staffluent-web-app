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
  Filter,
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

export default function AdminInvoices() {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

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
              <CardTitle className='text-sm font-medium'>
                Total Revenue
              </CardTitle>
              <DollarSign className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>$24,856</div>
              <p className='text-xs text-muted-foreground'>
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Outstanding</CardTitle>
              <AlertCircle className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>$5,432</div>
              <p className='text-xs text-muted-foreground'>
                8 invoices pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Paid This Month
              </CardTitle>
              <TrendingUp className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>$18,245</div>
              <p className='text-xs text-muted-foreground'>25 invoices</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Overdue</CardTitle>
              <AlertCircle className='h-4 w-4 text-red-500' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-red-500'>$2,850</div>
              <p className='text-xs text-muted-foreground'>
                3 invoices overdue
              </p>
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-[250px] pl-8'
                  />
                </div>
                <Select defaultValue='all'>
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
                <Button variant='outline' size='icon'>
                  <Filter className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
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
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className='font-medium'>
                      #INV-{2024001 + i}
                    </TableCell>
                    <TableCell>Restaurant ABC</TableCell>
                    <TableCell>Equipment Maintenance</TableCell>
                    <TableCell>$299.99</TableCell>
                    <TableCell>Jan 15, 2024</TableCell>
                    <TableCell>Feb 15, 2024</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          i === 0
                            ? 'success'
                            : i === 1
                              ? 'warning'
                              : i === 2
                                ? 'destructive'
                                : 'default'
                        }
                      >
                        {i === 0
                          ? 'Paid'
                          : i === 1
                            ? 'Pending'
                            : i === 2
                              ? 'Overdue'
                              : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className='flex space-x-2'>
                        <Button variant='ghost' size='icon'>
                          <Download className='h-4 w-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() =>
                            navigate(`/admin/invoices/${2024001 + i}`)
                          }
                        >
                          <Eye className='h-4 w-4' />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
