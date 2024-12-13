import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import {
    DollarSign,
    Search,
    Download,
    PieChart,
    TrendingUp,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react'

const costData = [
    {
        id: "CST-001",
        category: "Safety Equipment",
        budget: 50000,
        spent: 42500,
        remaining: 7500,
        status: "on_track",
        trend: "up",
        percentageChange: 12,
        lastMonth: 38000
    },
    {
        id: "CST-002",
        category: "Construction Materials",
        budget: 75000,
        spent: 73000,
        remaining: 2000,
        status: "at_risk",
        trend: "up",
        percentageChange: 8,
        lastMonth: 68000
    },
    {
        id: "CST-003",
        category: "Tools & Equipment",
        budget: 30000,
        spent: 20000,
        remaining: 10000,
        status: "under_budget",
        trend: "down",
        percentageChange: 5,
        lastMonth: 21000
    }
]

export default function SupplyCosts() {
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
                        <h2 className="text-2xl font-bold tracking-tight">Supply Costs</h2>
                        <p className="text-muted-foreground">
                            Track and analyze supply expenditure and budgets
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search categories..."
                                className="w-full pl-8 sm:w-64"
                                type="search"
                            />
                        </div>
                        <Select defaultValue="month">
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="month">This Month</SelectItem>
                                <SelectItem value="quarter">This Quarter</SelectItem>
                                <SelectItem value="year">This Year</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Export Report
                        </Button>
                    </div>
                </div>

                {/* Overview Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <DollarSign className="h-5 w-5 text-blue-500" />
                                <span className="text-2xl font-bold">$155,000</span>
                                <span className="text-sm text-muted-foreground">Total Budget</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <PieChart className="h-5 w-5 text-green-500" />
                                <span className="text-2xl font-bold">$135,500</span>
                                <span className="text-sm text-muted-foreground">Total Spent</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <TrendingUp className="h-5 w-5 text-yellow-500" />
                                <span className="text-2xl font-bold">87.4%</span>
                                <span className="text-sm text-muted-foreground">Budget Utilization</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <AlertCircle className="h-5 w-5 text-purple-500" />
                                <span className="text-2xl font-bold">1</span>
                                <span className="text-sm text-muted-foreground">Categories At Risk</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Cost Categories */}
                <Card>
                    <CardHeader>
                        <CardTitle>Cost Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <div className="grid grid-cols-7 gap-4 p-4 border-b font-medium">
                                <div className="col-span-2">Category</div>
                                <div className="text-right">Budget</div>
                                <div className="text-right">Spent</div>
                                <div>Progress</div>
                                <div>Trend</div>
                                <div className="text-center">Status</div>
                            </div>
                            <div className="divide-y">
                                {costData.map((category) => (
                                    <div key={category.id} className="grid grid-cols-7 gap-4 p-4 items-center hover:bg-muted/50">
                                        <div className="col-span-2">
                                            <div className="font-medium">{category.category}</div>
                                            <div className="text-sm text-muted-foreground">{category.id}</div>
                                        </div>
                                        <div className="text-right font-medium">
                                            ${category.budget.toLocaleString()}
                                        </div>
                                        <div className="text-right font-medium">
                                            ${category.spent.toLocaleString()}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Progress
                                                value={(category.spent / category.budget) * 100}
                                                className="h-2"
                                            />
                                            <span className="text-sm text-muted-foreground">
                                                {((category.spent / category.budget) * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                        <div>
                                            <div className={`flex items-center ${
                                                category.trend === 'up' ? 'text-red-600' : 'text-green-600'
                                            }`}>
                                                {category.trend === 'up' ? (
                                                    <ArrowUpRight className="h-4 w-4 mr-1" />
                                                ) : (
                                                    <ArrowDownRight className="h-4 w-4 mr-1" />
                                                )}
                                                {category.percentageChange}%
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <Badge
                                                variant={
                                                    category.status === 'under_budget' ? 'success' :
                                                        category.status === 'on_track' ? 'secondary' :
                                                            'destructive'
                                                }
                                            >
                                                {category.status.replace('_', ' ')}
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