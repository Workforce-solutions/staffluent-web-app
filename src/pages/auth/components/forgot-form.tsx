import { HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/custom/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { CheckCircle } from 'lucide-react'
import { useMagicLinkMutation } from '@/services/magic-linkApi'
import { toast } from '@/components/ui/use-toast'

// Form Schema
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
})

// ForgotForm Component
export function ForgotForm({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [magicLink, { isLoading }] = useMagicLinkMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setError(null)

    try {
      const { email } = data
      
      await magicLink({ email })
        .unwrap()
        .then(() => {
          setIsSuccess(true)
          toast({
            title: 'Magic Link Sent',
            description: 'Check your email for the magic link to log in directly.',
            variant: 'default',
          })
        })
        .catch((err) => {
          console.error('Magic link error:', err)
          setError('Failed to send magic link. Please try again.')
          toast({
            title: 'Error',
            description: 'Failed to send magic link. Please try again.',
            variant: 'destructive',
          })
        })
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      {isSuccess ? (
        <div className="flex flex-col items-center py-4 space-y-4">
          <div className="p-3 bg-green-50 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-[#0A0A0A]">Magic Link Sent</h3>
          <p className="text-center text-gray-600">
            We've sent a magic link to your email. Click the link to log in instantly.
          </p>
          <p className="text-sm text-gray-500">
            Don't see it? Check your spam folder or try again.
          </p>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className='grid gap-3'>
              {error && <p className='text-sm text-red-500'>{error}</p>}

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='space-y-1.5'>
                    <FormLabel className="text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your email'
                        className="bg-white border-gray-300 focus:border-[#0A0A0A] focus:ring-[#0A0A0A] text-[#0A0A0A]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#0A0A0A] hover:bg-[#171717] text-white"
              loading={isLoading}
            >
              Send Magic Link
            </Button>
          </form>
        </Form>
      )}

      <div className="relative">
        <div className="flex absolute inset-0 items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="flex relative justify-center text-sm">
          <span className="px-2 text-gray-500 bg-white">
            {isSuccess ? 'Need another option?' : 'Remember your password?'}
          </span>
        </div>
      </div>

      <div className="text-sm text-center">
        <a href="/login" className="font-bold text-[#0A0A0A] hover:text-[#171717]">
          Back to login
        </a>
      </div>
    </div>
  )
}