import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'

// Time Entry Modal
export function TimeEntryModal({ open, setOpen }: any) {
    const [timeEntry, setTimeEntry] = useState({
        hours: '',
        description: '',
        type: 'regular'
    })

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Time Entry</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Hours</Label>
                        <Input
                            type="number"
                            value={timeEntry.hours}
                            onChange={(e) => setTimeEntry({ ...timeEntry, hours: e.target.value })}
                            min="0"
                            step="0.5"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Type</Label>
                        <Select value={timeEntry.type} onValueChange={(value) => setTimeEntry({ ...timeEntry, type: value })}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="regular">Regular Time</SelectItem>
                                <SelectItem value="overtime">Overtime</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            value={timeEntry.description}
                            onChange={(e) => setTimeEntry({ ...timeEntry, description: e.target.value })}
                            placeholder="Describe the work performed..."
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button>Save Time Entry</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}