import { Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Star, Search, TrendingUp, ThumbsUp, MessageSquare, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { useShortCode } from '@/hooks/use-local-storage'
import {
  useGetFeedbackStatsQuery,
  useGetFeedbackListQuery,
  useRespondToFeedbackMutation
} from '@/services/feedbackApi'

interface ResponseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  feedbackId: number
  onSuccess: () => void
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

function ResponseDialog({ open, onOpenChange, feedbackId, onSuccess }: ResponseDialogProps) {
  const { toast } = useToast()
  const short_code = useShortCode()
  const [response, setResponse] = useState('')
  const [respondToFeedback, { isLoading }] = useRespondToFeedbackMutation()

  const handleSubmit = async () => {
    try {
      await respondToFeedback({
        venue_short_code: short_code,
        id: feedbackId,
        response
      }).unwrap()

      toast({
        title: 'Success',
        description: 'Response added successfully'
      })
      onSuccess()
      onOpenChange(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add response',
        variant: 'destructive'
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Respond to Feedback</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            placeholder="Type your response..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!response.trim() || isLoading}
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Submit Response
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function ClientFeedback() {
  const short_code = useShortCode()
  const [searchTerm, setSearchTerm] = useState('')
  const [rating, setRating] = useState('all')
  const [page, setPage] = useState(1)
  const [responseDialog, setResponseDialog] = useState<{ open: boolean; feedbackId: number }>({
    open: false,
    feedbackId: 0
  })

  const debouncedSearch = useDebounce(searchTerm, 500)

  const { data: stats, isLoading: statsLoading } = useGetFeedbackStatsQuery({
    venue_short_code: short_code
  })

  const { data: feedbacks, isLoading: feedbacksLoading, refetch } = useGetFeedbackListQuery({
    venue_short_code: short_code,
    search: debouncedSearch,
    rating,
    page,
    per_page: 10
  })

  const handleRespond = (feedbackId: number) => {
    setResponseDialog({ open: true, feedbackId })
  }

  return (
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Client Feedback
            </h2>
            <p className='text-sm text-muted-foreground'>
              Review and analyze client feedback and ratings
            </p>
          </div>
        </div>
        
        {/* Stats */}
        <div className='grid gap-4 md:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Average Rating</CardTitle>
              <Star className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {statsLoading ? '...' : `${stats?.average_rating}/5.0`}
</div>
<p className='text-xs text-muted-foreground'>

  {statsLoading ? '...' :
      // @ts-ignore
      `${stats?.rating_change >= 0 ? '+' : ''}${stats?.rating_change} from last month`}
  {/*// @ts-ignore*/}
</p>
</CardContent>
</Card>

<Card>
  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
    <CardTitle className='text-sm font-medium'>Total Reviews</CardTitle>
    <MessageSquare className='h-4 w-4 text-muted-foreground' />
  </CardHeader>
  <CardContent>
    <div className='text-2xl font-bold'>
      {statsLoading ? '...' : stats?.total_reviews}
    </div>
    <p className='text-xs text-muted-foreground'>Last 30 days</p>
  </CardContent>
</Card>

<Card>
  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
    <CardTitle className='text-sm font-medium'>Satisfaction Rate</CardTitle>
    <ThumbsUp className='h-4 w-4 text-muted-foreground' />
  </CardHeader>
  <CardContent>
    <div className='text-2xl font-bold'>
      {statsLoading ? '...' : `${Math.round(stats?.satisfaction_rate || 0)}%`}
    </div>
    <p className='text-xs text-muted-foreground'>
      Based on all feedback
    </p>
  </CardContent>
</Card>

<Card>
  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
    <CardTitle className='text-sm font-medium'>Response Rate</CardTitle>
    <TrendingUp className='h-4 w-4 text-muted-foreground' />
  </CardHeader>
  <CardContent>
    <div className='text-2xl font-bold'>
      {statsLoading ? '...' : `${Math.round(stats?.response_rate || 0)}%`}
    </div>
    <p className='text-xs text-muted-foreground'>
      Responses to feedback
    </p>
  </CardContent>
</Card>
</div>

{/* Feedback List */}
<Card>
  <CardHeader>
    <div className='flex items-center justify-between'>
      <div className='space-y-1'>
        <CardTitle>Recent Feedback</CardTitle>
        <p className='text-sm text-muted-foreground'>
          View and respond to client feedback
        </p>
      </div>
      <div className='flex items-center space-x-2'>
        <div className='relative'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
              placeholder='Search feedback...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-[250px] pl-8'
          />
        </div>
        <Select value={rating} onValueChange={setRating}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Filter by rating' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Ratings</SelectItem>
            <SelectItem value='5'>5 Stars</SelectItem>
            <SelectItem value='4'>4 Stars</SelectItem>
            <SelectItem value='3'>3 Stars or less</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </CardHeader>
  <CardContent className='space-y-4'>
    {feedbacksLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
    ) : feedbacks?.data.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No feedback found
        </div>
    ) : (
        feedbacks?.data.map((feedback) => (
            <Card key={feedback.id}>
              <CardContent className='p-4'>
                <div className='flex items-start justify-between'>
                  <div className='space-y-1'>
                    <div className='flex items-center space-x-2'>
                      <h4 className='font-semibold'>{feedback.client_name}</h4>
                      <Badge variant='outline'>{feedback.type}</Badge>
                      {feedback.project_name && (
                          <Badge variant='secondary'>{feedback.project_name}</Badge>
                      )}
                    </div>
                    <div className='flex space-x-1'>
                      {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                              key={i}
                              className={`h-4 w-4 ${
                                  i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill='currentColor'
                          />
                      ))}
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      "{feedback.comment}"
                    </p>
                  </div>
                  <div className="text-right">
                        <span className='text-sm text-muted-foreground'>
                          {feedback.created_at}
                        </span>
                    {!feedback.admin_response && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRespond(feedback.id)}
                            className="ml-4"
                        >
                          Respond
                        </Button>
                    )}
                  </div>
                </div>
                {feedback.admin_response && (
                    <div className='mt-4 border-t pt-4'>
                      <p className='text-sm italic text-muted-foreground'>
                        Response: {feedback.admin_response}
                      </p>
                      <p className='text-xs text-muted-foreground mt-1'>
                        Responded {feedback.responded_at}
                      </p>
                    </div>
                )}
              </CardContent>
            </Card>
        ))
    )}

    {/* Pagination if needed */}
    {/*// @ts-ignore*/}
    {feedbacks?.meta.total_pages > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
          >
            Previous
          </Button>
          <Button
              variant="outline"
              size="sm"
              // @ts-ignore
              disabled={page === feedbacks.meta.total_pages}
              onClick={() => setPage(p => p + 1)}
          >
            Next
          </Button>
        </div>
    )}
  </CardContent>
</Card>
</Layout.Body>

<ResponseDialog
    open={responseDialog.open}
    onOpenChange={(open) => setResponseDialog(s => ({ ...s, open }))}
    feedbackId={responseDialog.feedbackId}
    onSuccess={refetch}
/>
</Layout>
)
}
