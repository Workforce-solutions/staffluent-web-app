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

// eslint-disable-next-line react-refresh/only-export-components
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
    .min(1, {
      message: 'Please enter your password',
    })
    .min(7, {
      message: 'Password must be at least 7 characters long',
    }),
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
      setError('Invalid login credentials from Supabase. Trying fallback...')
    }
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)

    const { email, password } = data

    const loginData = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    const loginError = loginData?.error

    try {
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
    } catch {
      setError('Invalid login credentials from Supabase. Trying fallback...')
    }
    setIsLoading(false)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            {error && <p className='text-red-500'>{error}</p>}{' '}
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='name@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' loading={isLoading}>
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
