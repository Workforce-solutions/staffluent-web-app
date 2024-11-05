// pages/client-portal/invoices/index.tsx
import { Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Download, ArrowUpDown } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {useGetClientInvoicesQuery} from "../../../services/clientPortalApi";
import {useState} from "react";
import {formatDate} from "date-fns";

export default function Invoices() {
  const { data: invoicesData } = useGetClientInvoicesQuery()
  const [searchTerm, setSearchTerm] = useState('')

  // @ts-ignore
    return (
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-6'>
        {/* Header with Summary */}
        <div className='grid gap-4 md:grid-cols-3'>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{invoicesData?.total_count}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${invoicesData?.pending_amount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${invoicesData?.paid_this_month}</div>
            </CardContent>
          </Card>
        </div>

        {/* Invoices Table */}
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <CardTitle>Invoices</CardTitle>
              <div className='flex space-x-2'>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder='Search invoices...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-[200px] pl-8'
                  />
                </div>
                <Button variant="outline" size="icon">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
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
                {invoicesData?.invoices.map(invoice => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">#{invoice.number}</TableCell>
                    <TableCell>{invoice.service_name}</TableCell>
                      {/*// @ts-ignore*/}
                    <TableCell>{formatDate(invoice.date)}</TableCell>
                      {/*// @ts-ignore*/}
                    <TableCell>{formatDate(invoice.due_date)}</TableCell>
                    <TableCell>${invoice.amount}</TableCell>
                    <TableCell>
                        {/*// @ts-ignore*/}
                      <Badge variant={
                        invoice.status === 'paid' ? 'success' :
                        invoice.status === 'overdue' ? 'destructive' :
                        'warning'
                      }>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        {invoice.status === 'pending' && (
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