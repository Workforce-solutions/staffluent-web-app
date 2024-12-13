import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
    BarChart2,
    Search,
    Download,
    TrendingUp,
    TrendingDown,
    Package,
    Building2
} from 'lucide-react'

const usageData = [
    {
        id: "USG-001",
        item: "Safety Helmets",
        site: "Downtown Project",
        department: "Construction",
        quantity: 25,
        date: "2024-03-10",
        requestedBy: "John Smith",
        trend: "increasing",
        status: "approved"
    },
    {
        id: "USG-002",
        item: "Safety Gloves",
        site: "Midtown Complex",
        department: "Maintenance",
        quantity: 50,
        date: "2024-03-09",
        requestedBy: "Sarah Johnson",
        trend: "stable",
        status: "pending"
    },
    {
        id: "USG-003",
        item: "First Aid Kits",
        site: "Highway Project",
        department: "Safety",
        quantity: 10,
        date: "2024-03-08",
        requestedBy: "Mike Wilson",
        trend: "decreasing",
        status: "approved"
    }
]

export default function SupplyUsage() {
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
                        <h2 className="text-2xl font-bold tracking-tight">Supply Usage</h2>
                        <p className="text-muted-foreground">
                            Track and analyze supply consumption across sites
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search usage records..."
                                className="w-full pl-8 sm:w-64"
                                type="search"
                            />
                        </div>
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Filter by site" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Sites</SelectItem>
                                <SelectItem value="downtown">Downtown Project</SelectItem>
                                <SelectItem value="midtown">Midtown Complex</SelectItem>
                                <SelectItem value="highway">Highway Project</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                    </div>
                </div>

                {/* Overview Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Package className="h-5 w-5 text-blue-500" />
                                <span className="text-2xl font-bold">1,250</span>
                                <span className="text-sm text-muted-foreground">Items Used (Monthly)</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Building2 className="h-5 w-5 text-green-500" />
                                <span className="text-2xl font-bold">8</span>
                                <span className="text-sm text-muted-foreground">Active Sites</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <TrendingUp className="h-5 w-5 text-yellow-500" />
                                <span className="text-2xl font-bold">12%</span>
                                <span className="text-sm text-muted-foreground">Usage Increase</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <BarChart2 className="h-5 w-5 text-purple-500" />
                                <span className="text-2xl font-bold">85%</span>
                                <span className="text-sm text-muted-foreground">Efficiency Rate</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Usage List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <div className="grid grid-cols-7 gap-4 p-4 border-b font-medium">
                                <div>Item</div>
                                <div>Site</div>
                                <div>Department</div>
                                <div className="text-center">Quantity</div>
                                <div>Requested By</div>
                                <div>Trend</div>
                                <div className="text-center">Status</div>
                            </div>
                            <div className="divide-y">
                                {usageData.map((item) => (
                                    <div key={item.id} className="grid grid-cols-7 gap-4 p-4 items-center hover:bg-muted/50">
                                        <div>
                                            <div className="font-medium">{item.item}</div>
                                            <div className="text-sm text-muted-foreground">{item.id}</div>
                                        </div>
                                        <div>{item.site}</div>
                                        <div>{item.department}</div>
                                        <div className="text-center">{item.quantity}</div>
                                        <div>{item.requestedBy}</div>
                                        <div>
                                            {item.trend === 'increasing' ? (
                                                <div className="flex items-center text-green-600">
                                                    <TrendingUp className="h-4 w-4 mr-1" />
                                                    Increasing
                                                </div>
                                            ) : item.trend === 'decreasing' ? (
                                                <div className="flex items-center text-red-600">
                                                    <TrendingDown className="h-4 w-4 mr-1" />
                                                    Decreasing
                                                </div>
                                            ) : (
                                                <div className="flex items-center text-gray-600">
                                                    <BarChart2 className="h-4 w-4 mr-1" />
                                                    Stable
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-center">
                                            <Badge
                                                variant={
                                                    item.status === 'approved' ? 'success' :
                                                        item.status === 'pending' ? 'warning' :
                                                            'secondary'
                                                }
                                            >
                                                {item.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Layout.Body>
        </Layout>
    )
}