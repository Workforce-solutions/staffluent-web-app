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
import { Construction, Plus, Trash2 } from 'lucide-react'

interface AddWorkflowModalProps {
    open: boolean
    setOpen: (open: boolean) => void
}

type WorkflowStep = {
    name: string
    duration: string
    dependencies: string[]
}

export function AddWorkflowModal({ open, setOpen }: AddWorkflowModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        site: '',
        startDate: '',
        estimatedDuration: '',
        priority: 'medium',
        team: '',
        description: '',
        steps: [] as WorkflowStep[]
    })

    const [newStep, setNewStep] = useState<WorkflowStep>({
        name: '',
        duration: '',
        dependencies: []
    })

    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const handleAddStep = () => {
        if (newStep.name && newStep.duration) {
            setFormData({
                ...formData,
                steps: [...formData.steps, { ...newStep }]
            })
            setNewStep({
                name: '',
                duration: '',
                dependencies: []
            })
        }
    }

    const handleRemoveStep = (index: number) => {
        const updatedSteps = formData.steps.filter((_, i) => i !== index)
        setFormData({ ...formData, steps: updatedSteps })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        if (formData.steps.length === 0) {
            toast({
                title: 'Error',
                description: 'At least one workflow step is required',
                variant: 'destructive',
            })
            setIsLoading(false)
            return
        }

        try {
            // Add your API call here
            console.log('Submitting workflow:', formData)
            toast({
                title: 'Success',
                description: 'Workflow created successfully',
            })
            setOpen(false)
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to create workflow',
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
                            <Construction className="h-6 w-6" />
                            <span>Add New Workflow</span>
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        Create a new site workflow with sequential steps and dependencies.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto pr-2">
                    <form id="create-workflow-form" onSubmit={handleSubmit}>
                        <div className="grid gap-6 py-4">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Basic Information</h3>
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-left">
                                            Workflow Name
                                        </Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                            className="col-span-3"
                                            placeholder="Enter workflow name"
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
                                                <SelectItem value="downtown">Downtown Project</SelectItem>
                                                <SelectItem value="midtown">Midtown Complex</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="priority" className="text-left">
                                            Priority
                                        </Label>
                                        <Select
                                            value={formData.priority}
                                            onValueChange={(value) =>
                                                setFormData({ ...formData, priority: value })
                                            }
                                        >
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select priority" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">Low Priority</SelectItem>
                                                <SelectItem value="medium">Medium Priority</SelectItem>
                                                <SelectItem value="high">High Priority</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Timeline */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Timeline</h3>
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="startDate" className="text-left">
                                            Start Date
                                        </Label>
                                        <Input
                                            id="startDate"
                                            type="date"
                                            value={formData.startDate}
                                            onChange={(e) =>
                                                setFormData({ ...formData, startDate: e.target.value })
                                            }
                                            className="col-span-3"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="duration" className="text-left">
                                            Est. Duration (days)
                                        </Label>
                                        <Input
                                            id="duration"
                                            type="number"
                                            min="1"
                                            value={formData.estimatedDuration}
                                            onChange={(e) =>
                                                setFormData({ ...formData, estimatedDuration: e.target.value })
                                            }
                                            className="col-span-3"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Workflow Steps */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Workflow Steps</h3>

                                <div className="space-y-4">
                                    {formData.steps.map((step, index) => (
                                        <div key={index} className="flex items-center space-x-2 border rounded-md p-2">
                                            <span className="flex-1">{step.name}</span>
                                            <span className="text-sm text-muted-foreground">{step.duration} days</span>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemoveStep(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}

                                    <div className="grid grid-cols-5 gap-2">
                                        <Input
                                            placeholder="Step name"
                                            value={newStep.name}
                                            onChange={(e) =>
                                                setNewStep({ ...newStep, name: e.target.value })
                                            }
                                            className="col-span-2"
                                        />
                                        <Input
                                            type="number"
                                            placeholder="Duration (days)"
                                            value={newStep.duration}
                                            onChange={(e) =>
                                                setNewStep({ ...newStep, duration: e.target.value })
                                            }
                                            className="col-span-2"
                                        />
                                        <Button type="button" onClick={handleAddStep}>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Additional Details */}
                            <div className="grid gap-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="team" className="text-left">
                                        Assigned Team
                                    </Label>
                                    <Select
                                        value={formData.team}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, team: value })
                                        }
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select team" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="team-a">Team Alpha</SelectItem>
                                            <SelectItem value="team-b">Team Beta</SelectItem>
                                            <SelectItem value="team-c">Team Gamma</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="description" className="text-left">
                                        Description
                                    </Label>
                                    <Input
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({ ...formData, description: e.target.value })
                                        }
                                        className="col-span-3"
                                        placeholder="Add workflow description"
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
                    <Button type="submit" form="create-workflow-form" disabled={isLoading}>
                        {isLoading ? 'Creating...' : 'Create Workflow'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}