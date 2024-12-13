import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import {
    ArrowDown,
    ArrowUp,
    Clock,
    Package,
    RefreshCcw,
    AlertTriangle,
    Download,
    Filter,
    Building2,
    CalendarRange
} from 'lucide-react'

// Demo data for item activity
const itemActivity = {
    id: "INV-001",
    name: "Safety Barrier Type A",
    category: "Barriers",
    currentStats: {
        inStock: 50,
        allocated: 30,
        reserved: 10,
        minimum: 25
    },
    movements: [
        {
            id: "MOV-001",
            date: "2024-03-12",
            type: "out",
            quantity: 5,
            location: "Downtown Project",
            requestedBy: "John Smith",
            status: "completed",
            reference: "REQ-2024-001"
        },
        {
            id: "MOV-002",
            date: "2024-03-10",
            type: "in",
            quantity: 15,
            location: "Central Warehouse",
            requestedBy: "Supply Team",
            status: "completed",
            reference: "PO-2024-015"
        },
        {
            id: "MOV-003",
            date: "2024-03-08",
            type: "transfer",
            quantity: 8,
            location: "Warehouse B to Site C",
            requestedBy: "Mike Wilson",
            status: "completed",
            reference: "TRF-2024-003"
        }
    ],
    adjustments: [
        {
            id: "ADJ-001",
            date: "2024-03-11",
            type: "count",
            difference: -2,
            reason: "Physical count adjustment",
            performedBy: "Sarah Johnson"
        },
        {
            id: "ADJ-002",
            date: "2024-03-09",
            type: "damage",
            difference: -1,
            reason: "Item damaged during handling",
            performedBy: "Tom Davis"
        }
    ]
}

export default function InventoryItemActivity() {
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
                            <h2 className="text-2xl font-bold tracking-tight">{itemActivity.name}</h2>
                            <Badge variant="outline">{itemActivity.id}</Badge>
                        </div>
                        <p className="text-muted-foreground mt-1">
                            {itemActivity.category} • Activity History
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <Select defaultValue="month">
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Time Period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="week">Last Week</SelectItem>
                                <SelectItem value="month">Last Month</SelectItem>
                                <SelectItem value="quarter">Last Quarter</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                    </div>
                </div>

                {/* Current Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Package className="h-5 w-5 text-blue-500" />
                                <span className="text-2xl font-bold">{itemActivity.currentStats.inStock}</span>
                                <span className="text-sm text-muted-foreground">In Stock</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Building2 className="h-5 w-5 text-green-500" />
                                <span className="text-2xl font-bold">{itemActivity.currentStats.allocated}</span>
                                <span className="text-sm text-muted-foreground">Allocated</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <CalendarRange className="h-5 w-5 text-yellow-500" />
                                <span className="text-2xl font-bold">{itemActivity.currentStats.reserved}</span>
                                <span className="text-sm text-muted-foreground">Reserved</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                                <span className="text-2xl font-bold">{itemActivity.currentStats.minimum}</span>
                                <span className="text-sm text-muted-foreground">Minimum Stock</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Stock Level Progress */}
                <Card>
                    <CardHeader>
                        <CardTitle>Current Stock Level</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Current: {itemActivity.currentStats.inStock} units</span>
                            <span>Minimum: {itemActivity.currentStats.minimum} units</span>
                        </div>
                        <Progress
                            value={(itemActivity.currentStats.inStock / (itemActivity.currentStats.minimum * 2)) * 100}
                            className="h-2"
                        />
                    </CardContent>
                </Card>

                {/* Activity List */}
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Activity History</CardTitle>
                            <Button variant="outline" size="sm">
                                <Filter className="h-4 w-4 mr-2" />
                                Filter
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {itemActivity.movements.map((movement) => (
                                <div
                                    key={movement.id}
                                    className="flex items-start justify-between border-b pb-4 last:border-0"
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2">
                                            {movement.type === 'in' ? (
                                                <ArrowDown className="h-4 w-4 text-green-500" />
                                            ) : movement.type === 'out' ? (
                                                <ArrowUp className="h-4 w-4 text-red-500" />
                                            ) : (
                                                <RefreshCcw className="h-4 w-4 text-blue-500" />
                                            )}
                                            <span className="font-medium">
                                                {movement.type === 'in' ? 'Stock In' :
                                                    movement.type === 'out' ? 'Stock Out' :
                                                        'Transfer'}
                                            </span>
                                            <Badge variant="outline">{movement.reference}</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {movement.location}
                                        </p>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <Clock className="h-4 w-4 mr-2" />
                                            <span>{movement.date}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium">
                                            {movement.type === 'in' ? '+' : '-'}{movement.quantity} units
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {movement.requestedBy}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {itemActivity.adjustments.map((adjustment) => (
                                <div
                                    key={adjustment.id}
                                    className="flex items-start justify-between border-b pb-4 last:border-0"
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                            <span className="font-medium">Stock Adjustment</span>
                                            <Badge variant="outline">{adjustment.id}</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {adjustment.reason}
                                        </p>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <Clock className="h-4 w-4 mr-2" />
                                            <span>{adjustment.date}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium">
                                            {adjustment.difference > 0 ? '+' : ''}{adjustment.difference} units
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {adjustment.performedBy}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </Layout.Body>
        </Layout>
    )
}