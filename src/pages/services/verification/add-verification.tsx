import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { FormEvent, useState } from 'react'
import { FileCheck, Plus, Trash2, Upload, CheckSquare, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface AddVerificationModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    verification?: any | null
}

type ChecklistItem = {
    item: string
    status: 'pending' | 'passed' | 'failed' | 'warning'
    note: string
}

export function AddVerificationModal({ open, setOpen }: AddVerificationModalProps) {
    const [formData, setFormData] = useState({
        task: '',
        site: '',
        category: '',
        inspector: '',
        date: new Date().toISOString().split('T')[0],
        checklist: [] as ChecklistItem[],
        photos: [] as string[],
        notes: ''
    })

    const [newChecklistItem, setNewChecklistItem] = useState<ChecklistItem>({
        item: '',
        status: 'pending',
        note: ''
    })

    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const handleAddChecklistItem = () => {
        if (newChecklistItem.item) {
            setFormData({
                ...formData,
                checklist: [...formData.checklist, { ...newChecklistItem }]
            })
            setNewChecklistItem({
                item: '',
                status: 'pending',
                note: ''
            })
        }
    }

    const handleRemoveChecklistItem = (index: number) => {
        const updatedChecklist = formData.checklist.filter((_, i) => i !== index)
        setFormData({ ...formData, checklist: updatedChecklist })
    }

    const handleUpdateChecklistStatus = (index: number, status: 'passed' | 'failed' | 'warning' | 'pending') => {
        const updatedChecklist = [...formData.checklist]
        updatedChecklist[index] = {
            ...updatedChecklist[index],
            status
        }
        setFormData({ ...formData, checklist: updatedChecklist })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        if (formData.checklist.length === 0) {
            toast({
                title: 'Error',
                description: 'Please add at least one checklist item',
                variant: 'destructive',
            })
            setIsLoading(false)
            return
        }

        try {
            // Add your API call here
            console.log('Submitting verification:', formData)
            toast({
                title: 'Success',
                description: 'Verification created successfully',
            })
            setOpen(false)
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to create verification',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="flex max-h-[95vh] flex-col sm:max-w-[425px] md:min-w-[600px]">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex items-center space-x-2">
                            <FileCheck className="h-6 w-6" />
                            <span>New Quality Verification</span>
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        Create a new quality verification checklist and inspection.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto pr-2">
                    <form id="verification-form" onSubmit={handleSubmit}>
                        <div className="grid gap-6 py-4">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Basic Information</h3>
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="task" className="text-left">
                                            Task
                                        </Label>
                                        <Input
                                            id="task"
                                            value={formData.task}
                                            onChange={(e) =>
                                                setFormData({ ...formData, task: e.target.value })
                                            }
                                            className="col-span-3"
                                            placeholder="Enter verification task"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="site" className="text-left">
                                            Site
                                        </Label>
                                        <Select
                                            value={formData.site}
                                            onValueChange={(value) =>
                                                setFormData({ ...formData, site: value })
                                            }
                                        >
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select site" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="building-a">Building A</SelectItem>
                                                <SelectItem value="building-b">Building B</SelectItem>
                                                <SelectItem value="building-c">Building C</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="category" className="text-left">
                                            Category
                                        </Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(value) =>
                                                setFormData({ ...formData, category: value })
                                            }
                                        >
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="structural">Structural</SelectItem>
                                                <SelectItem value="electrical">Electrical</SelectItem>
                                                <SelectItem value="plumbing">Plumbing</SelectItem>
                                                <SelectItem value="safety">Safety</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="inspector" className="text-left">
                                            Inspector
                                        </Label>
                                        <Select
                                            value={formData.inspector}
                                            onValueChange={(value) =>
                                                setFormData({ ...formData, inspector: value })
                                            }
                                        >
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select inspector" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="john-smith">John Smith</SelectItem>
                                                <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                                                <SelectItem value="mike-wilson">Mike Wilson</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="date" className="text-left">
                                            Date
                                        </Label>
                                        <Input
                                            id="date"
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) =>
                                                setFormData({ ...formData, date: e.target.value })
                                            }
                                            className="col-span-3"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Checklist */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Inspection Checklist</h3>

                                <div className="space-y-4">
                                    {formData.checklist.map((item, index) => (
                                        <div key={index} className="flex items-start space-x-2 bg-muted/50 rounded-lg p-3">
                                            <div className="flex-1 space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium">{item.item}</span>
                                                    <div className="flex items-center space-x-2">
                                                        <Badge
                                                            variant={
                                                                item.status === 'passed' ? 'success' :
                                                                    item.status === 'failed' ? 'destructive' :
                                                                        item.status === 'warning' ? 'warning' :
                                                                            'secondary'
                                                            }
                                                        >
                                                            {item.status}
                                                        </Badge>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleRemoveChecklistItem(index)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <Input
                                                    value={item.note}
                                                    onChange={(e) => {
                                                        const updatedChecklist = [...formData.checklist]
                                                        updatedChecklist[index] = {
                                                            ...updatedChecklist[index],
                                                            note: e.target.value
                                                        }
                                                        setFormData({ ...formData, checklist: updatedChecklist })
                                                    }}
                                                    placeholder="Add note"
                                                />
                                                <div className="flex space-x-2">
                                                    <Button
                                                        type="button"
                                                        variant={item.status === 'passed' ? 'default' : 'outline'}
                                                        size="sm"
                                                        onClick={() => handleUpdateChecklistStatus(index, 'passed')}
                                                    >
                                                        <CheckSquare className="h-4 w-4 mr-1" />
                                                        Pass
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant={item.status === 'failed' ? 'default' : 'outline'}
                                                        size="sm"
                                                        onClick={() => handleUpdateChecklistStatus(index, 'failed')}
                                                    >
                                                        <AlertCircle className="h-4 w-4 mr-1" />
                                                        Fail
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="flex space-x-2">
                                        <Input
                                            placeholder="Checklist item"
                                            value={newChecklistItem.item}
                                            onChange={(e) =>
                                                setNewChecklistItem({ ...newChecklistItem, item: e.target.value })
                                            }
                                        />
                                        <Button type="button" onClick={handleAddChecklistItem}>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Photo Upload */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Photos</h3>
                                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                    <p className="text-sm text-muted-foreground text-center">
                                        Drag and drop photos here, or click to select files
                                    </p>
                                    <Button type="button" variant="outline" className="mt-4">
                                        Upload Photos
                                    </Button>
                                </div>
                            </div>

                            <Separator />

                            {/* Notes */}
                            <div className="space-y-4">
                                <div className="grid grid-cols-4 items-start gap-4">
                                    <Label htmlFor="notes" className="text-left">
                                        Notes
                                    </Label>
                                    <Textarea
                                        id="notes"
                                        value={formData.notes}
                                        onChange={(e) =>
                                            setFormData({ ...formData, notes: e.target.value })
                                        }
                                        className="col-span-3"
                                        placeholder="Add any additional notes or observations"
                                        rows={4}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <DialogFooter className="mt-6 flex flex-none justify-between sm:justify-end sm:space-x-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" form="verification-form" disabled={isLoading}>
                        {isLoading ? 'Creating...' : 'Create Verification'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}