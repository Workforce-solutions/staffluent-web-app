import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Star } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { useSubmitFeedbackMutation } from '@/services/clientPortalApi'

interface FeedbackFormProps {
  serviceRequestId: string
  onSuccess?: () => void
}

export function FeedbackForm({ serviceRequestId, onSuccess }: FeedbackFormProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitFeedback, { isLoading }] = useSubmitFeedbackMutation()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return

    try {
      await submitFeedback({
        id: serviceRequestId,
        data: { rating, comment }
      }).unwrap()

      toast({
        title: 'Success',
        description: 'Feedback submitted successfully'
      })
      setRating(0)
      setComment('')
      onSuccess?.()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit feedback',
        variant: 'destructive'
      })
    }
  }

  return (
      <Card>
        <CardHeader>
          <CardTitle>Submit Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Rating</label>
              <div className="flex space-x-1 mt-1">
                {[1, 2, 3, 4, 5].map((value) => (
                    <button
                        key={value}
                        type="button"
                        onClick={() => setRating(value)}
                        className="focus:outline-none"
                    >
                      <Star
                          className={`h-6 w-6 ${
                              value <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                      />
                    </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Comments</label>
              <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about your experience..."
                  className="mt-1"
              />
            </div>

            <Button
                type="submit"
                disabled={isLoading || !rating || !comment.trim()}
            >
              {isLoading ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </form>
        </CardContent>
      </Card>
  )
}

export function ExistingFeedback({ feedback }: { feedback: any }) {
  return (
      <Card>
        <CardHeader>
          <CardTitle>Your Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                      key={value}
                      className={`h-6 w-6 ${
                          value <= feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                  />
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">{feedback.comment}</p>
          </div>

          {feedback.admin_response && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-medium">Response:</p>
                <p className="text-sm text-muted-foreground">{feedback.admin_response}</p>
              </div>
          )}
        </CardContent>
      </Card>
  )
}