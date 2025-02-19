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

// Form Schema
const formSchema = z.object({
  email: z
      .string()
      .min(1, { message: 'Please enter your email' })
      .email({ message: 'Invalid email address' }),
})

// ForgotForm Component
export function ForgotForm({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)

    try {
      // Add your password reset logic here
      console.log('Reset password for:', data.email)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
    } catch (err) {
      setError('An error occurred. Please try again.')
    }

    setIsLoading(false)
  }

  return (
      // @ts-ignore
      <div className={cn('grid gap-6', className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className='grid gap-3'>
              {error && <p className='text-sm text-red-500'>{error}</p>}

              <FormField
                  // @ts-ignore
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                      <FormItem className='space-y-1.5'>
                        <FormLabel className="text-gray-700">Email</FormLabel>
                        <FormControl>
                          <Input
                              placeholder='Enter your email'
                              className="bg-white border-gray-300 focus:border-[#0A0A0A] focus:ring-[#0A0A0A] text-gray-900"
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
              Send Reset Link
            </Button>
          </form>
        </Form>

        <div className="relative">
          <div className="flex absolute inset-0 items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="flex relative justify-center text-sm">
          <span className="px-2 text-gray-500 bg-white">
            Remember your password?
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
