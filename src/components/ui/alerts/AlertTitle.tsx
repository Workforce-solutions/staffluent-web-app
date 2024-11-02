import React from 'react'

interface AlertTitleProps {
    children: React.ReactNode
    className?: string
}

export function AlertTitle({ children, className }: AlertTitleProps) {
    return (
        <h3 className={`font-bold text-lg ${className}`}>
            {children}
        </h3>
    )
}
