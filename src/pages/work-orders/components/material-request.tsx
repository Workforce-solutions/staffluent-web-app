import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'


// Material Request Modal
export function MaterialRequestModal({ open, setOpen }: any) {
    const [material, setMaterial] = useState({
        name: '',
        quantity: '',
        unit: 'pcs',
        urgency: 'normal'
    })

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Request Materials</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Material</Label>
                        <Select value={material.name} onValueChange={(value) => setMaterial({ ...material, name: value })}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select material" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="material_1">Material 1</SelectItem>
                                <SelectItem value="material_2">Material 2</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Quantity</Label>
                            <Input
                                type="number"
                                value={material.quantity}
                                onChange={(e) => setMaterial({ ...material, quantity: e.target.value })}
                                min="1"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Unit</Label>
                            <Select value={material.unit} onValueChange={(value) => setMaterial({ ...material, unit: value })}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pcs">Pieces</SelectItem>
                                    <SelectItem value="kg">Kilograms</SelectItem>
                                    <SelectItem value="l">Liters</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button>Submit Request</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
