import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Input } from '@/components/ui/input'
import { Search, Plus, Package, Truck, AlertTriangle, ArrowUpDown, Box, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {useState} from "react";
import {OrderMaterialsModal} from "./order-material";

const sampleMaterials = [
    {
        id: 1,
        name: "Steel Beams",
        category: "Structural",
        status: "in_transit",
        quantity: {
            ordered: 100,
            received: 75,
            allocated: 50
        },
        supplier: "Steel Corp Inc.",
        deliveryDate: "2024-03-15",
        sites: [
            { name: "Downtown Project", allocated: 30 },
            { name: "Midtown Complex", allocated: 20 }
        ]
    },
    {
        id: 2,
        name: "Concrete Mix",
        category: "Foundation",
        status: "low_stock",
        quantity: {
            ordered: 500,
            received: 100,
            allocated: 90
        },
        supplier: "BuildMix Ltd.",
        deliveryDate: "2024-03-20",
        sites: [
            { name: "Downtown Project", allocated: 50 },
            { name: "Uptown Site", allocated: 40 }
        ]
    }
]

const MaterialTracking = () => {
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

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
                        <h2 className="text-2xl font-bold tracking-tight">Material Tracking</h2>
                        <p className="text-muted-foreground">
                            Track and manage construction materials across sites
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search materials..."
                                className="w-full pl-8 sm:w-64"
                                type="search"
                            />
                        </div>
                        <Button onClick={() => setIsOrderModalOpen(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Order Materials
                        </Button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Package className="h-5 w-5 text-muted-foreground" />
                                <span className="text-2xl font-bold">1,245</span>
                                <span className="text-sm text-muted-foreground">Total Materials</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Truck className="h-5 w-5 text-muted-foreground" />
                                <span className="text-2xl font-bold">8</span>
                                <span className="text-sm text-muted-foreground">Pending Deliveries</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                <span className="text-2xl font-bold">5</span>
                                <span className="text-sm text-muted-foreground">Low Stock Items</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <ArrowUpDown className="h-5 w-5 text-muted-foreground" />
                                <span className="text-2xl font-bold">85%</span>
                                <span className="text-sm text-muted-foreground">Allocation Rate</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Materials List */}
                <Tabs defaultValue="all" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="all">All Materials</TabsTrigger>
                        <TabsTrigger value="in_transit">In Transit</TabsTrigger>
                        <TabsTrigger value="low_stock">Low Stock</TabsTrigger>
                        <TabsTrigger value="allocated">Allocated</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-4">
                        {sampleMaterials.map((material) => (
                            <Card key={material.id}>
                                <CardContent className="p-6">
                                    <div className="flex flex-col space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium text-lg">{material.name}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Category: {material.category}
                                                </p>
                                            </div>
                                            <Badge
                                                variant={
                                                    material.status === 'in_transit' ? 'default' :
                                                        material.status === 'low_stock' ? 'destructive' :
                                                            'secondary'
                                                }
                                            >
                                                {material.status.replace('_', ' ')}
                                            </Badge>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span>Ordered</span>
                                                    <span className="font-medium">{material.quantity.ordered}</span>
                                                </div>
                                                <Progress
                                                    value={(material.quantity.received / material.quantity.ordered) * 100}
                                                    className="h-2"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span>Received</span>
                                                    <span className="font-medium">{material.quantity.received}</span>
                                                </div>
                                                <Progress
                                                    value={(material.quantity.received / material.quantity.ordered) * 100}
                                                    className="h-2"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span>Allocated</span>
                                                    <span className="font-medium">{material.quantity.allocated}</span>
                                                </div>
                                                <Progress
                                                    value={(material.quantity.allocated / material.quantity.received) * 100}
                                                    className="h-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div className="flex items-center space-x-2">
                                                <Box className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">Supplier:</span>
                                                <span className="font-medium">{material.supplier}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">Expected Delivery:</span>
                                                <span className="font-medium">{material.deliveryDate}</span>
                                            </div>
                                        </div>

                                        <div className="border-t pt-4">
                                            <h4 className="text-sm font-medium mb-2">Site Allocation</h4>
                                            <div className="space-y-2">
                                                {material.sites.map((site, idx) => (
                                                    <div key={idx} className="flex justify-between items-center">
                                                        <span className="text-sm">{site.name}</span>
                                                        <Badge variant="outline">
                                                            {site.allocated} units
                                                        </Badge>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex justify-end space-x-2">
                                            <Button variant="outline" size="sm">
                                                Update Stock
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                View History
                                            </Button>
                                            <Button size="sm">
                                                Allocate Materials
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </TabsContent>
                </Tabs>
            </Layout.Body>

            {isOrderModalOpen && (
                <OrderMaterialsModal
                    open={isOrderModalOpen}
                    setOpen={setIsOrderModalOpen}
                />
            )}

        </Layout>
    )
}

export default MaterialTracking