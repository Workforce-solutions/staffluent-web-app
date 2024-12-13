import { useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Settings, History } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import {
    CheckSquare,
    ListTodo,
    PenTool,
    Shield,
    Upload,
    Plus,
    Trash2,
    Calendar,
    FileText,
} from 'lucide-react'
import {cn} from "../../lib/utils";
import {Checkbox} from "../ui/checkbox";

// Types
interface WorkPlan {
    id: string
    title: string
    steps: string[]
}

interface CheckList {
    id: string
    title: string
    items: Array<{ id: string; text: string; completed: boolean }>
}

interface Todo {
    id: string
    title: string
    description: string
    completed: boolean
    dueDate: string
}

interface Warranty {
    id: string
    title: string
    coverage: string
    startDate: string
    endDate: string
    terms: string
}

interface ServiceHistoryItem {
    id: string
    date: string
    type: string
    description: string
    technician: string
    status: string
}

interface WorkOrderNote {
    id: string
    date: string
    author: string
    content: string
    type: 'internal' | 'customer'
}

interface Document {
    id: string
    name: string
    type: string
    size: string
    uploadDate: string
    uploadedBy: string
}

// Work Order Creation Components
// @ts-ignore
export function WorkPlanModal({ open, setOpen, onSave }) {
    const [plan, setPlan] = useState<WorkPlan>({
        id: '',
        title: '',
        steps: ['']
    })

    const handleAddStep = () => {
        setPlan(prev => ({
            ...prev,
            steps: [...prev.steps, '']
        }))
    }

    const handleRemoveStep = (index: number) => {
        setPlan(prev => ({
            ...prev,
            steps: prev.steps.filter((_, i) => i !== index)
        }))
    }

    const handleStepChange = (index: number, value: string) => {
        setPlan(prev => ({
            ...prev,
            steps: prev.steps.map((step, i) => i === index ? value : step)
        }))
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Create Work Plan</DialogTitle>
                    <DialogDescription>
                        Define the steps and procedures for this work order
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label>Plan Title</Label>
                        <Input
                            value={plan.title}
                            onChange={(e) => setPlan(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Enter plan title"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Steps</Label>
                        {plan.steps.map((step, index) => (
                            <div key={index} className="flex gap-2">
                                <Input
                                    value={step}
                                    onChange={(e) => handleStepChange(index, e.target.value)}
                                    placeholder={`Step ${index + 1}`}
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveStep(index)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button onClick={handleAddStep} variant="outline" className="w-full">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Step
                        </Button>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={() => onSave(plan)}>Save Plan</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

// Main Navigation Component
export function WorkOrderNav() {
    return (
        <div className="flex items-center space-x-4 py-4">
            <Select>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Work Order Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="repair">Repair</SelectItem>
                    <SelectItem value="installation">Installation</SelectItem>
                    <SelectItem value="inspection">Inspection</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
            </Select>

            <div className="flex-1" />

            <Button variant="outline" className="flex items-center gap-2">
                <PenTool className="h-4 w-4" />
                <span>Assets</span>
            </Button>

            <Button variant="outline" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                <span>History</span>
            </Button>

            <Button variant="outline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
            </Button>
        </div>
    )
}

// @ts-ignore
export function CheckListModal({ open, setOpen, onSave }) {
    const [checklist, setChecklist] = useState<CheckList>({
        id: '',
        title: '',
        items: []
    })

    const handleAddItem = () => {
        setChecklist(prev => ({
            ...prev,
            items: [...prev.items, { id: Date.now().toString(), text: '', completed: false }]
        }))
    }

    const handleRemoveItem = (id: string) => {
        setChecklist(prev => ({
            ...prev,
            items: prev.items.filter(item => item.id !== id)
        }))
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Create Checklist</DialogTitle>
                    <DialogDescription>
                        Add items to be checked during work order execution
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label>Checklist Title</Label>
                        <Input
                            value={checklist.title}
                            onChange={(e) => setChecklist(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Enter checklist title"
                        />
                    </div>

                    <div className="space-y-2">
                        {checklist.items.map((item) => (
                            <div key={item.id} className="flex gap-2">
                                <Input
                                    value={item.text}
                                    onChange={(e) => {
                                        setChecklist(prev => ({
                                            ...prev,
                                            items: prev.items.map(i =>
                                                i.id === item.id ? { ...i, text: e.target.value } : i
                                            )
                                        }))
                                    }}
                                    placeholder="Check item"
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveItem(item.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button onClick={handleAddItem} variant="outline" className="w-full">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Item
                        </Button>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={() => onSave(checklist)}>Save Checklist</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

// Work Order Execution Components
// @ts-ignore
export function WorkOrderExecutionPanel({ workOrder }) {
    const serviceHistory: ServiceHistoryItem[] = [
        {
            id: '1',
            date: '2024-03-10',
            type: 'Maintenance',
            description: 'Regular system maintenance',
            technician: 'John Doe',
            status: 'completed'
        },
        {
            id: '2',
            date: '2024-03-05',
            type: 'Repair',
            description: 'Emergency repair work',
            technician: 'Jane Smith',
            status: 'completed'
        }
    ]

    const notes: WorkOrderNote[] = [
        {
            id: '1',
            date: '2024-03-10',
            author: 'John Doe',
            content: 'Completed initial inspection',
            type: 'internal'
        },
        {
            id: '2',
            date: '2024-03-10',
            author: 'Customer',
            content: 'Issue reported with the installation',
            type: 'customer'
        }
    ]

    const documents: Document[] = [
        {
            id: '1',
            name: 'Inspection_Report.pdf',
            type: 'PDF',
            size: '2.5 MB',
            uploadDate: '2024-03-10',
            uploadedBy: 'John Doe'
        },
        {
            id: '2',
            name: 'Site_Photos.zip',
            type: 'ZIP',
            size: '15 MB',
            uploadDate: '2024-03-10',
            uploadedBy: 'Jane Smith'
        }
    ]

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Service History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Technician</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {serviceHistory.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>{item.type}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{item.technician}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{item.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Work Order Notes</CardTitle>
                        <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Note
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {notes.map((note) => (
                            <div
                                key={note.id}
                                className={cn(
                                    "p-4 rounded-lg border",
                                    note.type === 'customer' ? 'bg-muted/50' : ''
                                )}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-medium">{note.author}</p>
                                        <p className="text-sm text-muted-foreground">{note.date}</p>
                                    </div>
                                    <Badge variant="outline">{note.type}</Badge>
                                </div>
                                <p>{note.content}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Documents</CardTitle>
                        <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Size</TableHead>
                                <TableHead>Upload Date</TableHead>
                                <TableHead>Uploaded By</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {documents.map((doc) => (
                                <TableRow key={doc.id}>
                                    <TableCell className="font-medium">{doc.name}</TableCell>
                                    <TableCell>{doc.type}</TableCell>
                                    <TableCell>{doc.size}</TableCell>
                                    <TableCell>{doc.uploadDate}</TableCell>
                                    <TableCell>{doc.uploadedBy}</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon">
                                            <FileText className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

// Work Order Management Components
// @ts-ignore
export function WorkOrderManagementPanel({ workOrder }) {
    const checklists: CheckList[] = [
        {
            id: '1',
            title: 'Pre-Installation Checklist',
            items: [
                { id: '1', text: 'Site inspection completed', completed: true },
                { id: '2', text: 'Safety equipment checked', completed: true },
                { id: '3', text: 'Required tools available', completed: false }
            ]
        },
        {
            id: '2',
            title: 'Quality Control Checklist',
            items: [
                { id: '1', text: 'Installation tested', completed: false },
                { id: '2', text: 'Documentation completed', completed: false }
            ]
        }
    ]

    const todos: Todo[] = [
        {
            id: '1',
            title: 'Order additional parts',
            description: 'Need to order replacement filters',
            completed: false,
            dueDate: '2024-03-15'
        },
        {
            id: '2',
            title: 'Schedule follow-up inspection',
            description: 'Conduct follow-up inspection after installation',
            completed: false,
            dueDate: '2024-03-20'
        }
    ]

    const warranties: Warranty[] = [
        {
            id: '1',
            title: 'Equipment Warranty',
            coverage: 'Parts and Labor',
            startDate: '2024-03-10',
            endDate: '2025-03-10',
            terms: 'Standard manufacturer warranty terms apply'
        }
    ]

    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="checklists">
                <AccordionTrigger>
                    <div className="flex items-center gap-2">
                        <CheckSquare className="h-4 w-4" />
                        <span>Checklists</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-4">
                        {checklists.map((checklist) => (
                            <div key={checklist.id} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium">{checklist.title}</h4>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">
                                            <PenTool className="h-4 w-4 mr-2" />
                                            Edit
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="pl-4 space-y-2">
                                    {checklist.items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-2">
                                            <Checkbox checked={item.completed} />
                                            <span className={item.completed ? 'line-through text-muted-foreground' : ''}>
                                                {item.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <Button className="w-full" variant="outline">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Checklist
                        </Button>
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="todos">
                <AccordionTrigger>
                    <div className="flex items-center gap-2">
                        <ListTodo className="h-4 w-4" />
                        <span>ToDo Lists</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-4">
                        {todos.map((todo) => (
                            <div key={todo.id} className="flex items-start gap-4 p-4 border rounded-lg">
                                <Checkbox checked={todo.completed} className="mt-1" />
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-medium">{todo.title}</p>
                                            <p className="text-sm text-muted-foreground">{todo.description}</p>
                                        </div>
                                        <Button variant="ghost" size="icon">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        <span>Due: {todo.dueDate}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Button className="w-full" variant="outline">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Todo
                        </Button>
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="warranty">
                <AccordionTrigger>
                    <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span>Warranty Information</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-4">
                        {warranties.map((warranty) => (
                            <div key={warranty.id} className="space-y-4 p-4 border rounded-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-medium">{warranty.title}</h4>
                                        <p className="text-sm text-muted-foreground">{warranty.coverage}</p>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <PenTool className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground">Start Date</p>
                                        <p className="font-medium">{warranty.startDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">End Date</p>
                                        <p className="font-medium">{warranty.endDate}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">Terms</p>
                                    <p className="text-sm">{warranty.terms}</p>
                                </div>
                            </div>
                        ))}
                        <Button className="w-full" variant="outline">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Warranty
                        </Button>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

// Don't forget to export the default object
export default {
    WorkPlanModal,
    CheckListModal,
    WorkOrderExecutionPanel,
    WorkOrderManagementPanel,
    WorkOrderNav
}