import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
    Package,
    Search,
    Plus,
    Filter,
    AlertTriangle,
    ArrowUpDown,
} from 'lucide-react'
import {useState} from "react";
import {InventoryItemModal} from "./inventory-item-modal";

const inventoryData = [
    {
        id: "INV-001",
        name: "Safety Barrier Type A",
        category: "Barriers",
        quantity: 50,
        allocated: 30,
        available: 20,
        minStock: 25,
        location: "Warehouse A",
        lastUpdated: "2024-03-10",
        status: "low_stock"
    },
    {
        id: "INV-002",
        name: "Warning Signs",
        category: "Signage",
        quantity: 200,
        allocated: 150,
        available: 50,
        minStock: 40,
        location: "Warehouse B",
        lastUpdated: "2024-03-09",
        status: "in_stock"
    },
    {
        id: "INV-003",
        name: "Traffic Cones",
        category: "Equipment",
        quantity: 150,
        allocated: 100,
        available: 50,
        minStock: 30,
        location: "Warehouse A",
        lastUpdated: "2024-03-08",
        status: "in_stock"
    }
];

export default function InventoryManagement() {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add')
    const [selectedItem, setSelectedItem] = useState(null)
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
                        <h2 className="text-2xl font-bold tracking-tight">Inventory Management</h2>
                        <p className="text-muted-foreground">
                            Track and manage equipment and supplies inventory
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search inventory..."
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
                                <SelectItem value="barriers">Barriers</SelectItem>
                                <SelectItem value="signage">Signage</SelectItem>
                                <SelectItem value="equipment">Equipment</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button onClick={() => {
                            setModalMode('add')
                            setSelectedItem(null)
                            setIsModalOpen(true)
                        }}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Item
                        </Button>
                    </div>
                </div>

                {/* Overview Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Package className="h-5 w-5 text-blue-500" />
                                <span className="text-2xl font-bold">400</span>
                                <span className="text-sm text-muted-foreground">Total Items</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <ArrowUpDown className="h-5 w-5 text-green-500" />
                                <span className="text-2xl font-bold">280</span>
                                <span className="text-sm text-muted-foreground">Allocated</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                <span className="text-2xl font-bold">3</span>
                                <span className="text-sm text-muted-foreground">Low Stock</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Filter className="h-5 w-5 text-purple-500" />
                                <span className="text-2xl font-bold">4</span>
                                <span className="text-sm text-muted-foreground">Categories</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Inventory List */}
                <Card>
                    <div className="rounded-md border">
                        <div className="grid grid-cols-7 gap-4 p-4 border-b font-medium">
                            <div>Item</div>
                            <div>Category</div>
                            <div className="text-center">Total</div>
                            <div className="text-center">Allocated</div>
                            <div className="text-center">Available</div>
                            <div>Location</div>
                            <div className="text-center">Status</div>
                        </div>
                        <div className="divide-y">
                            {inventoryData.map((item) => (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-7 gap-4 p-4 items-center hover:bg-muted/50 cursor-pointer"
                                    onClick={() => navigate(`/supply-management/inventory/${item.id}`)}
                                >
                                    <div>
                                        <div className="font-medium">{item.name}</div>
                                        <div className="text-sm text-muted-foreground">{item.id}</div>
                                    </div>
                                    <div>{item.category}</div>
                                    <div className="text-center">{item.quantity}</div>
                                    <div className="text-center">{item.allocated}</div>
                                    <div className="text-center">{item.available}</div>
                                    <div>{item.location}</div>
                                    <div className="text-center">
                                        <Badge
                                            variant={
                                                item.status === 'in_stock' ? 'success' :
                                                    item.status === 'low_stock' ? 'warning' :
                                                        'destructive'
                                            }
                                        >
                                            {item.status.replace('_', ' ')}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
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