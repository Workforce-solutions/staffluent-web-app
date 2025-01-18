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
              {error && <p className='text-red-500 text-sm'>{error}</p>}

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
                              className="bg-white border-gray-300 focus:border-[#1964b7] focus:ring-[#1964b7]"
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
                className="w-full bg-[#1964b7] hover:bg-[#1557a0] text-white"
                loading={isLoading}
            >
              Send Reset Link
            </Button>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            Remember your password?
          </span>
          </div>
        </div>

        <div className="text-center text-sm">
          <a href="/login" className="font-bold text-[#1964b7] hover:text-[#1557a0]">
            Back to login
          </a>
        </div>
      </div>
  )
}
