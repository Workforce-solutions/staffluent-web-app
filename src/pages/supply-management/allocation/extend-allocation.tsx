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

import { useState } from 'react'

interface AllocationModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    allocation?: any // Replace with proper type
}

// Extend Allocation Modal
export function ExtendAllocationModal({ open, setOpen }: AllocationModalProps) {
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
                    <AlertDialogTitle>Extend Allocation Period</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to extend this allocation? This will add 30 days to the current end date.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isLoading}
                        onClick={handleConfirm}
                    >
                        {isLoading ? "Extending..." : "Extend Allocation"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}