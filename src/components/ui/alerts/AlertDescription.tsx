import React from 'react'

interface AlertDescriptionProps {
    children: React.ReactNode
    className?: string
}

export function AlertDescription({ children, className }: AlertDescriptionProps) {
    return (
        <p className={`text-sm ${className}`}>
            {children}
        </p>
    )
}
