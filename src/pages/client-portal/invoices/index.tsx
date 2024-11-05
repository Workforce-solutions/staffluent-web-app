import { Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Download, DollarSign, AlertCircle, CheckCircle } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState } from "react"
import { format } from "date-fns"

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
  const [searchTerm, setSearchTerm] = useState('')

  // Dummy data
  const dummyInvoices: Invoice[] = [
    {
      id: 1,
      number: "INV-2024001",
      service_name: "Monthly Equipment Service",
      date: new Date('2024-01-15'),
      due_date: new Date('2024-02-15'),
      amount: 299.99,
      status: 'pending'
    },
    {
      id: 2,
      number: "INV-2024002",
      service_name: "Maintenance Package",
      date: new Date('2024-01-10'),
      due_date: new Date('2024-02-10'),
      amount: 499.99,
      status: 'paid'
    },
    {
      id: 3,
      number: "INV-2024003",
      service_name: "Service Contract - Jan",
      date: new Date('2024-01-05'),
      due_date: new Date('2024-01-20'),
      amount: 799.99,
      status: 'overdue'
    }
  ]

  const invoicesData = {
    invoices: dummyInvoices,
    total_count: dummyInvoices.length,
    pending_amount: dummyInvoices
        .filter(inv => inv.status === 'pending' || inv.status === 'overdue')
        .reduce((sum, inv) => sum + inv.amount, 0),
    paid_this_month: dummyInvoices
        .filter(inv => inv.status === 'paid')
        .reduce((sum, inv) => sum + inv.amount, 0)
  }

  // Filter invoices based on search term
  const filteredInvoices = dummyInvoices.filter(invoice =>
      invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.service_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
      <Layout>
        <Layout.Header className="min-h-fit border-b">
          <div className="flex w-full flex-col">
            <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
              <ThemeSwitch />
              <UserNav />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium">My Invoices</h2>
                <p className="text-sm text-muted-foreground">
                  View and pay your invoices
                </p>
              </div>
            </div>
          </div>
        </Layout.Header>

        <Layout.Body className='space-y-6 p-6'>
          {/* Summary Cards */}
          <div className='grid gap-4 md:grid-cols-3'>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Due Now</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${invoicesData.pending_amount.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">Outstanding balance</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Payment</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${invoicesData.paid_this_month.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">Last paid amount</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{invoicesData.total_count}</div>
                <p className="text-xs text-muted-foreground">Total invoices</p>
              </CardContent>
            </Card>
          </div>

          {/* Invoices Table */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div className="space-y-1">
                  <CardTitle>Invoice History</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    View all your invoices and payment history
                  </p>
                </div>
                <div className='flex space-x-2'>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder='Search invoices...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='w-[250px] pl-8'
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map(invoice => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">#{invoice.number}</TableCell>
                        <TableCell>{invoice.service_name}</TableCell>
                        <TableCell>{format(invoice.date, 'MMM dd, yyyy')}</TableCell>
                        <TableCell>{format(invoice.due_date, 'MMM dd, yyyy')}</TableCell>
                        <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={
                            invoice.status === 'paid' ? 'success' :
                                invoice.status === 'overdue' ? 'destructive' :
                                    'warning'
                          }>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            {(invoice.status === 'pending' || invoice.status === 'overdue') && (
                                <Button size="sm">Pay Now</Button>
                            )}
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
