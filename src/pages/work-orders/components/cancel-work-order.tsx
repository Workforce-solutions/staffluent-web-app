import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AlertTriangle } from 'lucide-react'
import { useState } from 'react'


// Cancel Work Order Modal
export function CancelWorkOrderModal({ open, setOpen, workOrderId }: any) {
    const [reason, setReason] = useState('')

    const handleCancel = () => {
        console.log('Cancelling work order:', workOrderId, 'Reason:', reason)
        setOpen(false)
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        Cancel Work Order
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to cancel this work order? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Cancellation Reason</Label>
                        <Textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Please provide a reason for cancellation..."
                            required
                        />
                    </div>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Keep Work Order</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleCancel}
                        className="bg-destructive hover:bg-destructive/90"
                    >
                        Cancel Work Order
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}