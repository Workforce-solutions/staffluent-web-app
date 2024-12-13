import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { AlertTriangle } from 'lucide-react'
import { useState } from 'react'

interface AllocationModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    allocation?: any // Replace with proper type
}


// End Allocation Modal
export function EndAllocationModal({ open, setOpen }: AllocationModalProps) {
    const [isLoading, setIsLoading] = useState(false)

    const handleConfirm = async () => {
        setIsLoading(true)
        try {
            // Add API call here
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
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-5 w-5" />
                        <AlertDialogTitle>End Allocation</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription>
                        Are you sure you want to end this allocation? This will mark the equipment as available and notify the assigned team.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isLoading}
                        onClick={handleConfirm}
                        className="bg-destructive hover:bg-destructive/90"
                    >
                        {isLoading ? "Ending..." : "End Allocation"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}