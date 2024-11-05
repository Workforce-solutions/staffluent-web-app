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
    Clock,
    CheckCircle2,
    AlertCircle,
    MessageSquare,
    Users,
    Eye,
    MoreHorizontal
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from 'react'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function SupportTickets() {
    const [searchTerm, setSearchTerm] = useState('')

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
                            <h2 className="text-lg font-medium">Support Tickets</h2>
                            <p className="text-sm text-muted-foreground">
                                Manage and respond to support tickets
                            </p>
                        </div>
                        <div className="flex space-x-2">
                            <Button>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Create Ticket
                            </Button>
                        </div>
                    </div>
                </div>
            </Layout.Header>

            <Layout.Body className="space-y-6 p-6">
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">42</div>
                            <p className="text-xs text-muted-foreground">+8 since yesterday</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2.4h</div>
                            <p className="text-xs text-muted-foreground">-15min from avg</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
                            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">94%</div>
                            <p className="text-xs text-muted-foreground">+2% this week</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">8</div>
                            <p className="text-xs text-muted-foreground">Handling tickets</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Tickets Table */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle>Support Tickets</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    Manage and track all support tickets
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search tickets..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-8 w-[250px]"
                                    />
                                </div>
                                <Select defaultValue="all">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="open">Open</SelectItem>
                                        <SelectItem value="in-progress">In Progress</SelectItem>
                                        <SelectItem value="resolved">Resolved</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline" size="icon">
                                    <Filter className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="all" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="all">All Tickets</TabsTrigger>
                                <TabsTrigger value="open">Open</TabsTrigger>
                                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                                <TabsTrigger value="resolved">Resolved</TabsTrigger>
                            </TabsList>

                            <TabsContent value="all">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Ticket ID</TableHead>
                                            <TableHead>Subject</TableHead>
                                            <TableHead>Client</TableHead>
                                            <TableHead>Priority</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Assigned To</TableHead>
                                            <TableHead>Created</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Array.from({length: 5}).map((_, i) => (
                                            <TableRow key={i}>
                                                <TableCell className="font-medium">TK-{1001 + i}</TableCell>
                                                <TableCell>Equipment maintenance issue</TableCell>
                                                <TableCell>Client {i + 1}</TableCell>
                                                <TableCell>
                                                    <Badge variant={i === 0 ? "destructive" : i === 1 ? "warning" : "default"}>
                                                        {i === 0 ? "High" : i === 1 ? "Medium" : "Low"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary">
                                                        {i === 0 ? "Open" : i === 1 ? "In Progress" : "Resolved"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>Agent {i + 1}</TableCell>
                                                <TableCell>{new Date().toLocaleDateString()}</TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View Details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                Assign Agent
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                Update Status
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </Layout.Body>
        </Layout>
    )
}