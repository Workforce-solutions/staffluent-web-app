import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
    Building2, Mail, Phone, MapPin, Star, Package, Clock, FileText,
    AlertTriangle, CheckCircle2, TrendingUp, Edit, Trash2, Download
} from 'lucide-react'
import {DeleteSupplierDetailModal, EditSupplierDetailModal} from "./edit-delete";

// Demo data
const supplierDetails = {
    id: "SUP-001",
    name: "SafetyEquip Ltd",
    category: "Safety Equipment",
    status: "active",
    rating: 4.8,
    website: "www.safetyequip.com",
    established: "2010",
    contact: {
        person: "John Wilson",
        role: "Account Manager",
        email: "john@safetyequip.com",
        phone: "(555) 123-4567",
        alternatePhone: "(555) 123-4568"
    },
    address: {
        street: "123 Industrial Way",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "United States"
    },
    performance: {
        totalOrders: 156,
        onTimeDelivery: 98,
        qualityScore: 4.7,
        responseTime: "24h",
        returnsRate: 0.5,
        averageLeadTime: "5 days"
    },
    financials: {
        totalSpent: 450000,
        outstandingPayments: 15000,
        averageOrderValue: 2885,
        paymentTerms: "Net 30"
    },
    recentOrders: [
        {
            id: "ORD-001",
            date: "2024-03-10",
            items: "Safety Helmets, High-Vis Vests",
            amount: 12500,
            status: "delivered"
        },
        {
            id: "ORD-002",
            date: "2024-03-05",
            items: "Safety Boots, Work Gloves",
            amount: 8750,
            status: "in_transit"
        },
        {
            id: "ORD-003",
            date: "2024-02-28",
            items: "First Aid Kits, Safety Goggles",
            amount: 5250,
            status: "completed"
        }
    ],
    qualityIssues: [
        {
            id: "QI-001",
            date: "2024-02-15",
            issue: "Minor packaging damage",
            status: "resolved",
            resolution: "Supplier provided replacement packaging"
        },
        {
            id: "QI-002",
            date: "2024-01-20",
            issue: "Product size variation",
            status: "resolved",
            resolution: "Quality control process updated"
        }
    ]
}

export default function SupplierDetails() {

    const navigate = useNavigate()
    const [supplierData, setSupplierData] = useState(supplierDetails)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    // @ts-ignore
    const handleSaveEdit = (updatedSupplier) => {
        setSupplierData(updatedSupplier)
        // Here you would typically make an API call to update the supplier
        console.log('Supplier updated:', updatedSupplier)
    }

    const handleDelete = () => {
        // Here you would typically make an API call to delete the supplier
        console.log('Supplier deleted:', supplierData.id)
        navigate('/supply-management/suppliers') // Navigate back to suppliers list
    }

    return (
        <Layout>
            <Layout.Header className="border-b">
                <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body className="space-y-8 pb-8">
                {/* Header */}
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div>
                        <div className="flex items-center space-x-2">
                            <h2 className="text-2xl font-bold tracking-tight">{supplierDetails.name}</h2>
                            <Badge variant="outline">{supplierDetails.id}</Badge>
                            <Badge variant={supplierDetails.status === 'active' ? 'success' : 'warning'}>
                                {supplierDetails.status}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground mt-1">
                            {supplierDetails.category} • Established {supplierDetails.established}
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline" onClick={() => setIsEditModalOpen(true)}>
                            <Edit className="h-4 w-4 mr-2"/>
                            Edit
                        </Button>
                        <Button variant="destructive" onClick={() => setIsDeleteModalOpen(true)}>
                            <Trash2 className="h-4 w-4 mr-2"/>
                            Delete
                        </Button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Star className="h-5 w-5 text-yellow-500"/>
                                <span className="text-2xl font-bold">{supplierDetails.performance.qualityScore}</span>
                                <span className="text-sm text-muted-foreground">Quality Score</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Package className="h-5 w-5 text-blue-500" />
                                <span className="text-2xl font-bold">{supplierDetails.performance.totalOrders}</span>
                                <span className="text-sm text-muted-foreground">Total Orders</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <span className="text-2xl font-bold">{supplierDetails.performance.onTimeDelivery}%</span>
                                <span className="text-sm text-muted-foreground">On-Time Delivery</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Clock className="h-5 w-5 text-purple-500" />
                                <span className="text-2xl font-bold">{supplierDetails.performance.responseTime}</span>
                                <span className="text-sm text-muted-foreground">Avg. Response Time</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="orders">Orders</TabsTrigger>
                        <TabsTrigger value="quality">Quality</TabsTrigger>
                        <TabsTrigger value="financials">Financials</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            {/* Contact Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Contact Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <p className="font-medium">{supplierDetails.contact.person}</p>
                                        <p className="text-sm text-muted-foreground">{supplierDetails.contact.role}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            <span>{supplierDetails.contact.email}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                            <span>{supplierDetails.contact.phone}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Building2 className="h-4 w-4 text-muted-foreground" />
                                            <span>{supplierDetails.website}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Address */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Address</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-start space-x-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                                        <div>
                                            <p>{supplierDetails.address.street}</p>
                                            <p>{supplierDetails.address.city}, {supplierDetails.address.state} {supplierDetails.address.zip}</p>
                                            <p>{supplierDetails.address.country}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Performance Metrics */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Performance Metrics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">Returns Rate</p>
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">{supplierDetails.performance.returnsRate}%</span>
                                            <Badge variant="outline">Low</Badge>
                                        </div>
                                        <Progress value={supplierDetails.performance.returnsRate} className="h-2" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">Average Lead Time</p>
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">{supplierDetails.performance.averageLeadTime}</span>
                                            <Badge variant="outline">Good</Badge>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">Response Time</p>
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">{supplierDetails.performance.responseTime}</span>
                                            <Badge variant="outline">Excellent</Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="orders">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle>Recent Orders</CardTitle>
                                    <Button variant="outline" size="sm">
                                        <Download className="h-4 w-4 mr-2" />
                                        Export
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {supplierDetails.recentOrders.map((order) => (
                                        <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                                            <div className="space-y-1">
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-medium">{order.id}</span>
                                                    <Badge variant="outline">{order.date}</Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{order.items}</p>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <span className="font-medium">${order.amount.toLocaleString()}</span>
                                                <Badge
                                                    variant={
                                                        order.status === 'delivered' ? 'success' :
                                                            order.status === 'in_transit' ? 'warning' :
                                                                'secondary'
                                                    }
                                                >
                                                    {order.status.replace('_', ' ')}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="quality">
                        <Card>
                            <CardHeader>
                                <CardTitle>Quality Issues & Resolution</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {supplierDetails.qualityIssues.map((issue) => (
                                        <div key={issue.id} className="flex items-start justify-between border-b pb-4 last:border-0">
                                            <div className="space-y-1">
                                                <div className="flex items-center space-x-2">
                                                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                                    <span className="font-medium">{issue.issue}</span>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{issue.resolution}</p>
                                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                    <Clock className="h-4 w-4" />
                                                    <span>{issue.date}</span>
                                                </div>
                                            </div>
                                            <Badge
                                                variant={issue.status === 'resolved' ? 'success' : 'warning'}
                                            >
                                                {issue.status}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="financials">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle>Financial Overview</CardTitle>
                                    <Button variant="outline" size="sm">
                                        <Download className="h-4 w-4 mr-2" />
                                        Export
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Total Spent</p>
                                            <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold">
                                ${supplierDetails.financials.totalSpent.toLocaleString()}
                            </span>
                                                <Badge variant="outline">Lifetime</Badge>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Outstanding Payments</p>
                                            <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold">
                                ${supplierDetails.financials.outstandingPayments.toLocaleString()}
                            </span>
                                                <Badge variant={supplierDetails.financials.outstandingPayments > 0 ? 'warning' : 'success'}>
                                                    {supplierDetails.financials.outstandingPayments > 0 ? 'Pending' : 'Clear'}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Average Order Value</p>
                                            <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold">
                                ${supplierDetails.financials.averageOrderValue.toLocaleString()}
                            </span>
                                                <TrendingUp className="h-4 w-4 text-green-500" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Payment Terms</p>
                                            <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold">
                                {supplierDetails.financials.paymentTerms}
                            </span>
                                            </div>
                                        </div>
                                    </div>

                                    <Card className="border-2">
                                        <CardHeader>
                                            <CardTitle className="text-sm">Payment History</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="font-medium">Last Payment</p>
                                                        <p className="text-sm text-muted-foreground">March 1, 2024</p>
                                                    </div>
                                                    <span className="font-medium">$12,500</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="font-medium">Next Due</p>
                                                        <p className="text-sm text-muted-foreground">March 30, 2024</p>
                                                    </div>
                                                    <span className="font-medium">$15,000</span>
                                                </div>
                                                <div className="pt-4 border-t">
                                                    <div className="space-y-2">
                                                        <p className="text-sm text-muted-foreground">Payment Compliance</p>
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-medium">98%</span>
                                                            <Badge variant="outline">Excellent</Badge>
                                                        </div>
                                                        <Progress value={98} className="h-2" />
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="md:col-span-2">
                                        <CardHeader>
                                            <CardTitle className="text-sm">Recent Transactions</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-4 text-sm text-muted-foreground">
                                                    <div>Invoice</div>
                                                    <div>Date</div>
                                                    <div className="text-right">Amount</div>
                                                    <div className="text-right">Status</div>
                                                </div>
                                                <div className="divide-y">
                                                    {[
                                                        {
                                                            id: "INV-2024-001",
                                                            date: "Mar 10, 2024",
                                                            amount: 12500,
                                                            status: "paid"
                                                        },
                                                        {
                                                            id: "INV-2024-002",
                                                            date: "Mar 05, 2024",
                                                            amount: 8750,
                                                            status: "pending"
                                                        },
                                                        {
                                                            id: "INV-2024-003",
                                                            date: "Feb 28, 2024",
                                                            amount: 15000,
                                                            status: "paid"
                                                        }
                                                    ].map((transaction) => (
                                                        <div key={transaction.id} className="grid grid-cols-4 py-3">
                                                            <div className="font-medium">{transaction.id}</div>
                                                            <div>{transaction.date}</div>
                                                            <div className="text-right font-medium">
                                                                ${transaction.amount.toLocaleString()}
                                                            </div>
                                                            <div className="text-right">
                                                                <Badge variant={transaction.status === 'paid' ? 'success' : 'warning'}>
                                                                    {transaction.status}
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Footer Actions Section */}
                <div className="flex justify-between items-center pt-6 border-t">
                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            Download Report
                        </Button>
                        <Button variant="outline" size="sm">
                            <Mail className="h-4 w-4 mr-2" />
                            Contact Supplier
                        </Button>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="destructive" size="sm">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Report Issue
                        </Button>
                    </div>
                </div>
            </Layout.Body>
            <EditSupplierDetailModal
                open={isEditModalOpen}
                setOpen={setIsEditModalOpen}
                supplier={supplierData}
                onSave={handleSaveEdit}
            />
            <DeleteSupplierDetailModal
                open={isDeleteModalOpen}
                setOpen={setIsDeleteModalOpen}
                supplier={supplierData}
                onConfirm={handleDelete}
            />
        </Layout>
    )
}