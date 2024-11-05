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
  CheckCircle,
  AlertCircle,
  Eye,
  MoreHorizontal
} from 'lucide-react'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate } from 'react-router-dom'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ThemeSwitch from "../../components/theme-switch";
import {UserNav} from "../../components/user-nav";

export default function ServiceRequests() {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

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
                <h2 className="text-lg font-medium">Service Requests</h2>
                <p className="text-sm text-muted-foreground">
                  Manage and process service requests from clients
                </p>
              </div>
            </div>
          </div>
        </Layout.Header>

        <Layout.Body className="space-y-6 p-6">
          {/* Request Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Requests</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">Last 24 hours</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32</div>
                <p className="text-xs text-muted-foreground">Active requests</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+8 from yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4h</div>
                <p className="text-xs text-muted-foreground">-15min from avg</p>
              </CardContent>
            </Card>
          </div>

          {/* Requests Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>Service Requests</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    View and manage all service requests
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search requests..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 w-[300px]"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Requests</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
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
                  <TabsTrigger value="all">All Requests</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Request ID</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Requested Date</TableHead>
                        <TableHead>Schedule Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.from({length: 5}).map((_, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium">REQ-{2024001 + i}</TableCell>
                            <TableCell>Client {i + 1}</TableCell>
                            <TableCell>Equipment Maintenance</TableCell>
                            <TableCell>{new Date().toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(Date.now() + 86400000 * 2).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Badge variant={
                                i === 0 ? "default" :
                                    i === 1 ? "secondary" :
                                        i === 2 ? "destructive" :
                                            "success"
                              }>
                                {i === 0 ? "Pending" :
                                    i === 1 ? "In Progress" :
                                        i === 2 ? "Urgent" :
                                            "Completed"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => navigate(`/admin/services/requests/${2024001 + i}`)}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Update Status
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Assign Staff
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

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({length: 5}).map((_, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                      <div>
                        <p className="text-sm font-medium">
                          {i === 0 ? "New request received from Client 1" :
                              i === 1 ? "Request REQ-2024002 status updated to In Progress" :
                                  i === 2 ? "Staff assigned to REQ-2024003" :
                                      i === 3 ? "Request REQ-2024004 completed" :
                                          "New comment added to REQ-2024005"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {Math.floor(i * 1.5)} hours ago
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