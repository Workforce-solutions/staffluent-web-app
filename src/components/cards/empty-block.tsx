import { ReactNode } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'

interface EmptyBlockProps {
  children: ReactNode
  onClick?: () => void
  description?: string
  title?: string
  topDescription?: string
}

const EmptyBlock = ({
  children,
  onClick,
  description = '',
  title = '',
  topDescription = '',
}: EmptyBlockProps) => {
  return (
    <Card>
      <CardContent className='pt-6'>
        <h3 className='mb-2 text-lg font-semibold'>{topDescription}</h3>
        <p className='mb-4 text-sm text-muted-foreground'>{description}</p>
        <Button onClick={onClick}>{title}</Button>
        {children}
      </CardContent>
    </Card>
  )
}

export default EmptyBlock
