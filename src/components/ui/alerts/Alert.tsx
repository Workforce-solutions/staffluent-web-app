import React from 'react'
import { cn } from '@/lib/utils' // Optional utility for managing classNames

interface AlertProps {
    children: React.ReactNode
    variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
    className?: string
}

const alertVariants = {
    default: 'bg-gray-50 border-gray-300 text-gray-900',
    success: 'bg-green-50 border-green-500 text-green-800',
    error: 'bg-red-50 border-red-500 text-red-800',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-800',
    info: 'bg-blue-50 border-blue-500 text-blue-800',
}

export function Alert({ children, variant = 'default', className }: AlertProps) {
    return (
        <div
            className={cn(
                'border-l-4 p-4 rounded-md shadow-sm',
                alertVariants[variant],
                className
            )}
        >
            {children}
        </div>
    )
}
