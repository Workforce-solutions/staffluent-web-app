import { HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/custom/button'
import { PasswordInput } from '@/components/custom/password-input'
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
import { useCheckConnectionMutation } from '@/services/vbAuthApi'
import { useVbLoginMutation } from '@/services/authApi'
import supabase from '@/supabaseClient'
import { useNavigate } from 'react-router-dom'

export enum AccountType {
  client = 'client',
  business = 'business',
  business_team_leader = 'business_team_leader',
  business_operations_managers = 'business_operations_managers',
}

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  email: z
      .string()
      .min(1, { message: 'Please enter your email' })
      .email({ message: 'Invalid email address' }),
  password: z
      .string()
      .min(1, { message: 'Please enter your password' })
      .min(5, { message: 'Password must be at least 7 characters long' }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const [checkConnection] = useCheckConnectionMutation()
  const [vbLogin] = useVbLoginMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const redirectMap = {
    [AccountType.client]: '/client-portal/dashboard',
    [AccountType.business]: '/',
    [AccountType.business_team_leader]: '/team-leader/dashboard',
    [AccountType.business_operations_managers]: '/operations-manager/dashboard',
  }

  const handleVbLogin = async ({
                                 email,
                                 password,
                               }: {
    email: string
    password: string
  }) => {
    try {
      const res = await vbLogin({ email, password }).unwrap()
      if (res) {
        const accountType = res.account_type
        const newExpiresAt = Math.floor(Date.now() / 1000) + 60 * 60

        localStorage.setItem(
            'vbAuth',
            JSON.stringify({ ...res, expires_at: newExpiresAt })
        )
        localStorage.setItem('adminToken', res?.access_token ?? '')
        localStorage.setItem('refreshToken', res?.refresh_token ?? '')
        localStorage.setItem('accountType', accountType)
        localStorage.setItem('expires_at', String(newExpiresAt))

        navigate(redirectMap[accountType])
      }
    } catch (err) {
      setError('Invalid login credentials. Please try again.')
    }
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)

    try {
      const { email, password } = data

      const loginData = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      const loginError = loginData?.error

      if (loginError) {
        await handleVbLogin({ email, password })
      } else {
        try {
          const res = await checkConnection({
            email: loginData?.data?.user?.email ?? '',
            supabase_id: loginData?.data?.user?.id ?? '',
          })

          if (res) {
            const accountType = res?.data?.account_type ?? AccountType.business
            const newExpiresAt = Math.floor(Date.now() / 1000) + 60 * 60

            localStorage.setItem(
                'vbAuth',
                JSON.stringify({ ...res, expires_at: newExpiresAt })
            )
            localStorage.setItem('adminToken', res?.data?.token ?? '')
            localStorage.setItem('refreshToken', res?.data?.refresh_token ?? '')
            localStorage.setItem('accountType', accountType)
            localStorage.setItem('expires_at', String(newExpiresAt))

            navigate(redirectMap[accountType])
          }
        } catch (error) {
          await handleVbLogin({ email, password })
        }
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.')
    }

    setIsLoading(false)
  }

  return (
      <div className={cn('grid gap-6', className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className='grid gap-3'>
              {error && <p className='text-red-500 text-sm'>{error}</p>}

              <FormField
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

              <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                      <FormItem className='space-y-1.5'>
                        <FormLabel className="text-gray-700">Password</FormLabel>
                        <FormControl>
                          <PasswordInput
                              placeholder='Enter your password'
                              className="bg-white border-gray-300 focus:border-[#1964b7] focus:ring-[#1964b7]"
                              {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                  )}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-[#1964b7] focus:ring-[#1964b7]"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="/forgot-password" className="font-medium text-[#1964b7] hover:text-[#1557a0]">
                    Forgot password?
                  </a>
                </div>
              </div>
            </div>

            <Button
                type="submit"
                className="w-full bg-[#1964b7] hover:bg-[#1557a0] text-white"
                loading={isLoading}
            >
              Sign In
            </Button>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500 text-center">Not part of Staffluent yet? Contact us to streamline your workforce management</span>
          </div>
        </div>

        <div className="text-center text-sm">
          <a href="https://staffluent.co/contact" className="font-bold text-[#1964b7] hover:text-[#1557a0]">
            Join now
          </a>
        </div>
      </div>
  )
}