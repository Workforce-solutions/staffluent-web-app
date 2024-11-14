// components/client-portal/request-service-modal.tsx
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Star } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
{/*// @ts-ignore*/}
import { useSubmitFeedbackMutation } from '../../services/clientPortalApi'
import { OpenModalProps } from '@/@types/common'

const feedbackSchema = z.object({
  rating: z.number().min(1, 'Please provide a rating'),
  comment: z.string().min(10, 'Please provide more detailed feedback'),
  satisfaction_level: z.enum(['satisfied', 'neutral', 'dissatisfied']),
})

type FeedbackForm = z.infer<typeof feedbackSchema>

interface FeedbackDialogProps extends OpenModalProps {
  serviceId: string
}

export function FeedbackDialog({
  open,
  setOpen,
  serviceId,
}: FeedbackDialogProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitFeedback] = useSubmitFeedbackMutation()

  const form = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 0,
      comment: '',
      satisfaction_level: 'neutral',
    },
  })

  const onSubmit = async (data: FeedbackForm) => {
    try {
      setIsSubmitting(true)
      await submitFeedback({
        serviceId,
        ...data,
      }).unwrap()

      toast({
        title: 'Feedback Submitted',
        description: 'Thank you for your feedback!',
      })
      setOpen(false)
      form.reset()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit feedback',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Service Feedback</DialogTitle>
          <DialogDescription>
            Help us improve by sharing your experience
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='rating'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <div className='flex space-x-2'>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Button
                        key={rating}
                        type='button'
                        variant='ghost'
                        className={
                          rating <= field.value ? 'text-yellow-500' : ''
                        }
                        onClick={() => field.onChange(rating)}
                      >
                        <Star
                          className='h-5 w-5'
                          fill={rating <= field.value ? 'currentColor' : 'none'}
                        />
                      </Button>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='satisfaction_level'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Overall Satisfaction</FormLabel>
                  <div className='flex space-x-2'>
                    {['satisfied', 'neutral', 'dissatisfied'].map((level) => (
                      <Button
                        key={level}
                        type='button'
                        variant={field.value === level ? 'default' : 'outline'}
                        onClick={() => field.onChange(level)}
                        className='capitalize'
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='comment'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback Comments</FormLabel>
                  <Textarea
                    placeholder='What did you think about our service?'
                    className='min-h-[100px]'
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
