import { LoaderProps } from '@/@types/table'
import { Card, CardContent } from '@/components/ui/card'
import { useMemo } from 'react'

export default function EmptyState({ isError, isLoading }: LoaderProps) {
  const displayText = useMemo(() => {
    if (isLoading) {
      return 'Loading...'
    } else if (isError) {
      return 'Something went wrong. Please try again.'
    }
    return 'No data to display'
  }, [isLoading, isError])
  return (
    <Card className='mx-auto w-full'>
      <CardContent className='flex h-[60vh] items-center justify-center'>
        <p className='text-center text-lg font-medium text-muted-foreground'>
          {displayText}
        </p>
      </CardContent>
    </Card>
  )
}
