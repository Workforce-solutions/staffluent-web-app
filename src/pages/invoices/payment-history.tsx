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
    Calendar,
    DollarSign,
    CreditCard,
    TrendingDown,
    TrendingUp,
} from 'lucide-react'
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from 'react'
import ThemeSwitch from "../../components/theme-switch";
import {UserNav} from "../../components/user-nav";

export default function PaymentHistory() {
    const [searchTerm, setSearchTerm] = useState('')
    const [dateRange, setDateRange] = useState({ from: undefined, to: undefined })

    return (
        <Layout>
            <Layout.Header className="min-h-fit border-b">
                <div className="flex w-full flex-col">
                    <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
                        <ThemeSwitch />
                        <UserNav />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-medium">Payment History</h2>
                            <p className="text-sm text-muted-foreground">
                                Track and analyze payment transactions
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Export Report
                            </Button>
                            <DateRangePicker
                                value={dateRange}
                                // @ts-ignore
                                onValueChange={setDateRange}
                            />
                        </div>
                    </div>
                </div>
            </Layout.Header>

            <Layout.Body className="space-y-6 p-6">
                {/* Payment Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$24,856</div>
                            <div className="flex items-center text-xs text-green-500">
                                <TrendingUp className="mr-1 h-4 w-4" />
                                +12% from last month
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">156</div>
                            <div className="flex items-center text-xs text-green-500">
                                <TrendingUp className="mr-1 h-4 w-4" />
                                +8% from last month
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Failed Payments</CardTitle>
                            <TrendingDown className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <div className="flex items-center text-xs text-red-500">
                                <TrendingDown className="mr-1 h-4 w-4" />
                                2.1% failure rate
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Processing</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">5</div>
                            <p className="text-xs text-muted-foreground">Pending transactions</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Payment Methods Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Methods Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { method: 'Credit Card', percentage: 65, amount: 16156.40 },
                                { method: 'Bank Transfer', percentage: 25, amount: 6214.00 },
                                { method: 'Digital Wallet', percentage: 10, amount: 2485.60 }
                            ].map((item) => (
                                <div key={item.method} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium">{item.method}</p>
                                            <p className="text-sm text-muted-foreground">
                                                ${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                            </p>
                                        </div>
                                        <span className="text-sm font-medium">{item.percentage}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-muted rounded-full">
                                        <div
                                            className="h-2 bg-primary rounded-full"
                                            style={{ width: `${item.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Transactions Table */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Recent Transactions</CardTitle>
                            <div className="flex items-center space-x-2">
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search transactions..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-8 w-[250px]"
                                    />
                                </div>
                                <Select defaultValue="all">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Payment method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Methods</SelectItem>
                                        <SelectItem value="credit">Credit Card</SelectItem>
                                        <SelectItem value="bank">Bank Transfer</SelectItem>
                                        <SelectItem value="wallet">Digital Wallet</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline" size="icon">
                                    <Filter className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Transaction ID</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Invoice #</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Payment Method</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Array.from({length: 5}).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="font-medium">TRX-{2024001 + i}</TableCell>
                                        <TableCell>{new Date().toLocaleDateString()}</TableCell>
                                        <TableCell>Client {i + 1}</TableCell>
                                        <TableCell>INV-{2024001 + i}</TableCell>
                                        <TableCell>${(1000 + i * 500).toLocaleString()}</TableCell>
                                        <TableCell>{i % 2 === 0 ? 'Credit Card' : 'Bank Transfer'}</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                i === 0 ? "success" :
                                                    i === 1 ? "warning" :
                                                        i === 2 ? "destructive" :
                                                            "success"
                                            }>
                                                {i === 0 ? "Completed" :
                                                    i === 1 ? "Processing" :
                                                        i === 2 ? "Failed" :
                                                            "Completed"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="sm">
                                                <Download className="h-4 w-4 mr-2" />
                                                Receipt
                                            </Button>
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