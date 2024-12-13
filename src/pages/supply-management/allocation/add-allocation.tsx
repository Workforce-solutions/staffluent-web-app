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
import { Settings } from 'lucide-react'
import { useState } from 'react'

interface AddAllocationModalProps {
    open: boolean
    setOpen: (open: boolean) => void
}

export function AddAllocationModal({ open, setOpen }: AddAllocationModalProps) {
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        equipmentId: '',
        siteId: '',
        teamId: '',
        startDate: '',
        endDate: '',
        notes: '',
        condition: 'good'
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Add API call here in the future
            console.log('Form submitted:', formData)
            setTimeout(() => {
                setOpen(false)
                setIsLoading(false)
            }, 1000)
        } catch (error) {
            console.error('Error:', error)
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-h-[95vh] overflow-y-auto sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex items-center gap-2">
                            <Settings className="h-6 w-6" />
                            <span>New Equipment Allocation</span>
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        Allocate equipment to a specific site and team
                    </DialogDescription>
                </DialogHeader>

                <form id="allocation-form" onSubmit={handleSubmit} className="space-y-6">
                    {/* Equipment Selection */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="equipment">Equipment</Label>
                            <Select
                                value={formData.equipmentId}
                                onValueChange={(value) =>
                                    setFormData({ ...formData, equipmentId: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select equipment" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="eq1">Safety Barrier System A</SelectItem>
                                    <SelectItem value="eq2">Mobile Signage Unit</SelectItem>
                                    <SelectItem value="eq3">Traffic Management Kit</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Separator />

                    {/* Site and Team */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="site">Site</Label>
                            <Select
                                value={formData.siteId}
                                onValueChange={(value) =>
                                    setFormData({ ...formData, siteId: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select site" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="site1">Downtown Project</SelectItem>
                                    <SelectItem value="site2">Midtown Complex</SelectItem>
                                    <SelectItem value="site3">Highway Project</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="team">Assigned Team</Label>
                            <Select
                                value={formData.teamId}
                                onValueChange={(value) =>
                                    setFormData({ ...formData, teamId: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select team" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="team1">Team Alpha</SelectItem>
                                    <SelectItem value="team2">Team Beta</SelectItem>
                                    <SelectItem value="team3">Team Delta</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Separator />

                    {/* Duration */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="startDate">Start Date</Label>
                            <Input
                                id="startDate"
                                type="date"
                                value={formData.startDate}
                                onChange={(e) =>
                                    setFormData({ ...formData, startDate: e.target.value })
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="endDate">End Date</Label>
                            <Input
                                id="endDate"
                                type="date"
                                value={formData.endDate}
                                onChange={(e) =>
                                    setFormData({ ...formData, endDate: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    {/* Equipment Condition */}
                    <div className="space-y-2">
                        <Label htmlFor="condition">Equipment Condition</Label>
                        <Select
                            value={formData.condition}
                            onValueChange={(value) =>
                                setFormData({ ...formData, condition: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="excellent">Excellent</SelectItem>
                                <SelectItem value="good">Good</SelectItem>
                                <SelectItem value="fair">Fair</SelectItem>
                                <SelectItem value="needs_maintenance">Needs Maintenance</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                            id="notes"
                            placeholder="Add any additional notes..."
                            value={formData.notes}
                            onChange={(e) =>
                                setFormData({ ...formData, notes: e.target.value })
                            }
                        />
                    </div>
                </form>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" form="allocation-form" disabled={isLoading}>
                        {isLoading ? "Creating..." : "Create Allocation"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}