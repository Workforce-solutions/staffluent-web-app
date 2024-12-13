
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    Package,
    Edit,
    History,
    ArrowUpDown,
    PenTool,
    AlertTriangle,
    MapPin,
    Calendar,
    Download
} from 'lucide-react'
import {useState} from "react";
import {InventoryItemModal} from "./inventory-item-modal";
import {useNavigate} from "react-router-dom";

// Dummy data for inventory item details
const itemDetails = {
    id: "INV-001",
    name: "Safety Barrier Type A",
    category: "Barriers",
    description: "Heavy-duty safety barrier for construction sites",
    specifications: {
        height: "1.2m",
        length: "2.4m",
        weight: "45kg",
        material: "High-grade Steel",
        certifications: ["ISO 9001", "Safety Standard XYZ"]
    },
    quantity: {
        total: 50,
        allocated: 30,
        available: 20,
        minStock: 25
    },
    location: {
        warehouse: "Warehouse A",
        section: "B4",
        shelf: "12"
    },
    status: "low_stock",
    purchaseInfo: {
        cost: "$850",
        supplier: "SafetyEquip Ltd",
        warranty: "2 years",
        purchaseDate: "2023-08-15"
    },
    maintenanceHistory: [
        {
            date: "2024-02-15",
            type: "Inspection",
            notes: "Regular maintenance check",
            technician: "John Smith"
        },
        {
            date: "2024-01-10",
            type: "Repair",
            notes: "Minor repairs completed",
            technician: "Mike Wilson"
        }
    ],
    allocationHistory: [
        {
            date: "2024-03-01",
            site: "Downtown Project",
            quantity: 10,
            status: "active"
        },
        {
            date: "2024-02-15",
            site: "Midtown Complex",
            quantity: 5,
            status: "returned"
        }
    ]
}

export default function InventoryItemDetails() {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add')
    const [selectedItem, setSelectedItem] = useState(null)

    // For Edit (can be added to row actions or details)
    const handleEdit = (item: any) => {
        setModalMode('edit')
        setSelectedItem(item)
        setIsModalOpen(true)
    }

    const navigate = useNavigate()
    return (
        <Layout>
            <Layout.Header className="border-b">
                <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body className="space-y-8 pb-8">
                {/* Header with Actions */}
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div>
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold tracking-tight">{itemDetails.name}</h2>
                            <Badge variant="outline">{itemDetails.id}</Badge>
                        </div>
                        <p className="text-muted-foreground mt-1">
                            {itemDetails.description}
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                        <Button variant="outline" onClick={() => {
                            setModalMode('edit')
                            handleEdit(itemDetails)
                            setIsModalOpen(true)
                        }}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Item
                        </Button>
                        <Button onClick={() => navigate(`/supply-management/inventory/activity/${itemDetails}`)}>
                            <History className="h-4 w-4 mr-2" />
                            View History
                        </Button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Package className="h-5 w-5 text-blue-500" />
                                <span className="text-2xl font-bold">{itemDetails.quantity.total}</span>
                                <span className="text-sm text-muted-foreground">Total Units</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <ArrowUpDown className="h-5 w-5 text-green-500" />
                                <span className="text-2xl font-bold">{itemDetails.quantity.allocated}</span>
                                <span className="text-sm text-muted-foreground">Allocated</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                <span className="text-2xl font-bold">{itemDetails.quantity.available}</span>
                                <span className="text-sm text-muted-foreground">Available</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <PenTool className="h-5 w-5 text-purple-500" />
                                <span className="text-2xl font-bold">{itemDetails.maintenanceHistory.length}</span>
                                <span className="text-sm text-muted-foreground">Maintenance Records</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Detailed Information Tabs */}
                <Tabs defaultValue="details" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="allocations">Allocations</TabsTrigger>
                        <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="space-y-4">
                        {/* Specifications */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Specifications</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
                                {Object.entries(itemDetails.specifications).map(([key, value]) => (
                                    <div key={key}>
                                        <p className="text-sm text-muted-foreground capitalize">{key}</p>
                                        <p className="font-medium">
                                            {Array.isArray(value) ? value.join(", ") : value}
                                        </p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Purchase & Location Info */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Purchase Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {Object.entries(itemDetails.purchaseInfo).map(([key, value]) => (
                                        <div key={key} className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground capitalize">{key}</span>
                                            <span className="font-medium">{value}</span>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Storage Location</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {Object.entries(itemDetails.location).map(([key, value]) => (
                                        <div key={key} className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground capitalize">{key}</span>
                                            <span className="font-medium">{value}</span>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="allocations">
                        <Card>
                            <CardHeader>
                                <CardTitle>Allocation History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {itemDetails.allocationHistory.map((allocation, index) => (
                                        <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                                    <span className="font-medium">{allocation.site}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{allocation.date}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">
                          {allocation.quantity} units
                        </span>
                                                <Badge
                                                    variant={allocation.status === 'active' ? 'success' : 'secondary'}
                                                >
                                                    {allocation.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="maintenance">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle>Maintenance Records</CardTitle>
                                    <Button variant="outline" size="sm">
                                        <Download className="h-4 w-4 mr-2" />
                                        Export Records
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {itemDetails.maintenanceHistory.map((record, index) => (
                                        <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <PenTool className="h-4 w-4 text-muted-foreground" />
                                                    <span className="font-medium">{record.type}</span>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{record.notes}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm">{record.date}</p>
                                                <p className="text-sm text-muted-foreground">{record.technician}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </Layout.Body>
            {isModalOpen && (
                <InventoryItemModal
                    open={isModalOpen}
                    setOpen={setIsModalOpen}
                    mode={modalMode}
                    itemData={selectedItem}
                />
            )}
        </Layout>
    )
}