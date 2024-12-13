import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useNavigate } from 'react-router-dom'
import {
    Building2,
    Search,
    Plus,
    Star,
    Phone,
    Mail,
    MapPin,
    Package,
    AlertTriangle,
    ArrowUpDown,
    Clock
} from 'lucide-react'
import {AddSupplierModal} from "./add-supplier";
import {useState} from "react";

const suppliersData = [
    {
        id: "SUP-001",
        name: "SafetyEquip Ltd",
        category: "Safety Equipment",
        rating: 4.8,
        status: "active",
        contactPerson: "John Wilson",
        email: "john@safetyequip.com",
        phone: "(555) 123-4567",
        location: "New York, NY",
        lastOrder: "2024-03-01",
        totalOrders: 156,
        onTimeDelivery: 98,
        qualityScore: 4.7
    },
    {
        id: "SUP-002",
        name: "BuildTech Supplies",
        category: "Construction Materials",
        rating: 4.2,
        status: "active",
        contactPerson: "Sarah Brown",
        email: "sarah@buildtech.com",
        phone: "(555) 234-5678",
        location: "Chicago, IL",
        lastOrder: "2024-03-05",
        totalOrders: 89,
        onTimeDelivery: 92,
        qualityScore: 4.3
    },
    {
        id: "SUP-003",
        name: "Industrial Tools Co",
        category: "Tools & Equipment",
        rating: 3.9,
        status: "under_review",
        contactPerson: "Mike Davis",
        email: "mike@industrialtools.com",
        phone: "(555) 345-6789",
        location: "Houston, TX",
        lastOrder: "2024-02-28",
        totalOrders: 67,
        onTimeDelivery: 85,
        qualityScore: 3.8
    }
]

export default function SuppliersList() {
    const navigate = useNavigate()
    const [isAddSupplierModalOpen, setIsAddSupplierModalOpen] = useState(false)

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
                        <h2 className="text-2xl font-bold tracking-tight">Suppliers</h2>
                        <p className="text-muted-foreground">
                            Manage and track supplier relationships
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search suppliers..."
                                className="w-full pl-8 sm:w-64"
                                type="search"
                            />
                        </div>
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Filter by category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="safety">Safety Equipment</SelectItem>
                                <SelectItem value="construction">Construction Materials</SelectItem>
                                <SelectItem value="tools">Tools & Equipment</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button onClick={() => setIsAddSupplierModalOpen(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Supplier
                        </Button>
                    </div>
                </div>

                {/* Overview Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Building2 className="h-5 w-5 text-blue-500" />
                                <span className="text-2xl font-bold">24</span>
                                <span className="text-sm text-muted-foreground">Active Suppliers</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Star className="h-5 w-5 text-yellow-500" />
                                <span className="text-2xl font-bold">4.5</span>
                                <span className="text-sm text-muted-foreground">Average Rating</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Package className="h-5 w-5 text-green-500" />
                                <span className="text-2xl font-bold">312</span>
                                <span className="text-sm text-muted-foreground">Orders This Month</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                                <span className="text-2xl font-bold">2</span>
                                <span className="text-sm text-muted-foreground">Under Review</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Suppliers List */}
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Supplier Directory</CardTitle>
                            <Button variant="outline" size="sm">
                                <ArrowUpDown className="h-4 w-4 mr-2" />
                                Sort
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {suppliersData.map((supplier) => (
                                <div
                                    key={supplier.id}
                                    className="flex flex-col space-y-4 p-4 border cursor-pointer rounded-lg hover:bg-muted/50"
                                    onClick={() => navigate(`/supply-management/suppliers/${supplier.id}`)}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <h3 className="font-medium">{supplier.name}</h3>
                                                <Badge variant="outline">{supplier.id}</Badge>
                                                <Badge
                                                    variant={
                                                        supplier.status === 'active' ? 'success' :
                                                            'warning'
                                                    }
                                                >
                                                    {supplier.status.replace('_', ' ')}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1">{supplier.category}</p>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                            <span className="font-medium">{supplier.rating}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        <div className="space-y-1">
                                            <div className="flex items-center text-muted-foreground">
                                                <Phone className="h-4 w-4 mr-2" />
                                                Phone
                                            </div>
                                            <p>{supplier.phone}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center text-muted-foreground">
                                                <Mail className="h-4 w-4 mr-2" />
                                                Email
                                            </div>
                                            <p>{supplier.email}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center text-muted-foreground">
                                                <MapPin className="h-4 w-4 mr-2" />
                                                Location
                                            </div>
                                            <p>{supplier.location}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center text-muted-foreground">
                                                <Clock className="h-4 w-4 mr-2" />
                                                Last Order
                                            </div>
                                            <p>{supplier.lastOrder}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold">{supplier.totalOrders}</div>
                                            <div className="text-xs text-muted-foreground">Total Orders</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold">{supplier.onTimeDelivery}%</div>
                                            <div className="text-xs text-muted-foreground">On-Time Delivery</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold">{supplier.qualityScore}</div>
                                            <div className="text-xs text-muted-foreground">Quality Score</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </Layout.Body>
            <AddSupplierModal
                open={isAddSupplierModalOpen}
                setOpen={setIsAddSupplierModalOpen}
            />
        </Layout>
    )
}