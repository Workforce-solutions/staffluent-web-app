import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Clock,
    Calendar,
    FileText,
    Upload,
    MessageSquare,
    // ArrowLeft,
    CheckCircle2,
    AlertCircle
} from 'lucide-react'
import { useState } from 'react'
import WorkOrderExecution from "./ execution";
import {StatusChangeModal} from "./components/status-change";
import {MaterialRequestModal} from "./components/material-request";
import {TimeEntryModal} from "./components/time-entry";
import {CancelWorkOrderModal} from "./components/cancel-work-order";
// import { useNavigate } from 'react-router-dom'

export default function WorkOrderDetails() {
    // const navigate = useNavigate()
    const [note, setNote] = useState('')

    // Demo checklist items
    const [checklistItems, setChecklistItems] = useState([
        { id: 1, text: 'Initial inspection', completed: false },
        { id: 2, text: 'Safety check', completed: false },
        { id: 3, text: 'Equipment test', completed: false }
    ])

    // Demo notes/history
    const activityHistory = [
        {
            id: 1,
            type: 'note',
            content: 'Initial assessment completed',
            user: 'John Smith',
            timestamp: '2024-03-12 09:30'
        },
        {
            id: 2,
            type: 'status',
            content: 'Status changed to In Progress',
            user: 'System',
            timestamp: '2024-03-12 10:00'
        }
    ]

    // Demo documents
    const documents = [
        { id: 1, name: 'Equipment Manual.pdf', size: '2.4 MB', uploaded: '2024-03-12' },
        { id: 2, name: 'Safety Guidelines.pdf', size: '1.1 MB', uploaded: '2024-03-12' }
    ]

    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
    const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false)
    const [isTimeEntryModalOpen, setIsTimeEntryModalOpen] = useState(false)
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)

    return (
        <Layout>
            <Layout.Header className="border-b">
                <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body className="space-y-8">
                {/* Header Section */}
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="text-2xl font-bold">HVAC Repair - #WO-2024-001</h1>
                            <p className="text-muted-foreground">Created on March 12, 2024</p>
                        </div>
                        <Badge variant="warning" className="text-base">In Progress</Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>2 hours estimated</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Due: March 15, 2024</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                            <span>High Priority</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Tabs */}
                <Tabs defaultValue="details" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="execution">Execution</TabsTrigger>
                        <TabsTrigger value="tasks">Tasks & Checklist</TabsTrigger>
                        <TabsTrigger value="notes">Notes & History</TabsTrigger>
                        <TabsTrigger value="documents">Documents</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details">
                        <div className="grid gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Work Order Information</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div>
                                        <h3 className="font-medium mb-2">Description</h3>
                                        <p className="text-muted-foreground">
                                            HVAC unit in server room requiring maintenance and repair. Unit is showing decreased cooling efficiency and making unusual noises.
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="font-medium mb-2">Location</h3>
                                            <p className="text-muted-foreground">Server Room - Floor 3</p>
                                            <p className="text-muted-foreground">Building A</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium mb-2">Equipment</h3>
                                            <p className="text-muted-foreground">HVAC Unit #HC-123</p>
                                            <p className="text-muted-foreground">Model: XYZ-2000</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Add this TabsContent */}
                    <TabsContent value="execution">
                        <WorkOrderExecution />
                    </TabsContent>

                    <TabsContent value="tasks">
                        <Card>
                            <CardHeader>
                                <CardTitle>Completion Checklist</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {checklistItems.map((item) => (
                                        <div key={item.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                checked={item.completed}
                                                onCheckedChange={(checked) => {
                                                    // @ts-ignore
                                                    setChecklistItems(checklistItems.map(i =>
                                                        i.id === item.id ? {...i, completed: checked} : i
                                                    ))
                                                }}
                                            />
                                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                {item.text}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="notes">
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Add Note</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <Textarea
                                            placeholder="Add a note..."
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                        />
                                        <Button>Add Note</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Activity History</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {activityHistory.map((activity) => (
                                            <div key={activity.id} className="flex items-start space-x-4 pb-4 border-b last:border-0">
                                                {activity.type === 'note' ? (
                                                    <MessageSquare className="h-5 w-5 text-blue-500 mt-0.5" />
                                                ) : (
                                                    <Clock className="h-5 w-5 text-green-500 mt-0.5" />
                                                )}
                                                <div className="flex-1">
                                                    <p>{activity.content}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {activity.user} • {activity.timestamp}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="documents">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle>Documents</CardTitle>
                                    <Button>
                                        <Upload className="h-4 w-4 mr-2" />
                                        Upload
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {documents.map((doc) => (
                                        <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex items-center space-x-4">
                                                <FileText className="h-5 w-5 text-blue-500" />
                                                <div>
                                                    <p className="font-medium">{doc.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {doc.size} • Uploaded {doc.uploaded}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm">Download</Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Footer Actions */}
                <div className="flex justify-between items-center pt-6 border-t">
                    <div className="flex space-x-2">
                        <Button variant="outline" onClick={() => setIsStatusModalOpen(true)}>
                            <Clock className="h-4 w-4 mr-2"/>
                            Update Status
                        </Button>
                        <Button onClick={() => setIsMaterialModalOpen(true)}>
                            Request Materials
                        </Button>
                        <Button onClick={() => setIsTimeEntryModalOpen(true)}>
                            Log Time
                        </Button>

                    </div>

                    <div className="flex space-x-2">
                        <Button variant="destructive" onClick={() => setIsCancelModalOpen(true)} className="mr-2">
                            Cancel Order
                        </Button>
                        {/*// @ts-ignore*/}
                        <Button variant="success">
                            <CheckCircle2 className="h-4 w-4 mr-2"/>
                            Complete Work Order
                        </Button>
                    </div>
                </div>
            </Layout.Body>
            {/* Add Modals */}
            <StatusChangeModal
                open={isStatusModalOpen}
                setOpen={setIsStatusModalOpen}
                currentStatus="in_progress"
            />
            <MaterialRequestModal
                open={isMaterialModalOpen}
                setOpen={setIsMaterialModalOpen}
            />
            <TimeEntryModal
                open={isTimeEntryModalOpen}
                setOpen={setIsTimeEntryModalOpen}
            />
            <CancelWorkOrderModal
                open={isCancelModalOpen}
                setOpen={setIsCancelModalOpen}
                workOrderId="WO-2024-001"  // Use actual work order ID
            />
        </Layout>
    )
}