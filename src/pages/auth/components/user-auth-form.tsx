/* eslint-disable react-refresh/only-export-components */
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
import { useOmniStackLoginMutation, useVbLoginMutation } from '@/services/authApi'
import supabase from '@/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { LoginProps } from '@/@types/auth'
import { useMagicLinkMutation } from '@/services/magic-linkApi'
import { toast } from '@/components/ui/use-toast'

export enum AccountType {
  client = 'client',
  business = 'business',
  business_team_leader = 'business_team_leader',
  business_operations_managers = 'business_operations_managers',
}

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {
  authMethod: 'password' | 'magic-link'
  buttonText: string
}

export function UserAuthForm({
  className,
  buttonText,
  authMethod,
  ...props
}: UserAuthFormProps) {
  const formSchema = z
    .object({
      email: z
        .string()
        .min(1, { message: 'Please enter your email' })
        .email({ message: 'Invalid email address' }),
      password: z.string().optional(),
    })
    .refine(
      (data) => {
        if (authMethod !== 'magic-link' && !data.password) {
          return false
        }
        return true
      },
      {
        message: 'Password must be at least 7 characters long',
        path: ['password'],
      }
    )

  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const [checkConnection, { isLoading: isCheckLoading }] =
    useCheckConnectionMutation()
  const [vbLogin, { isLoading: isVbLoading }] = useVbLoginMutation()
  const [omniStackLogin, { isLoading: isOmniStackLoading }] = useOmniStackLoginMutation()
  const [magicLink, { isLoading: isMagicLoading }] = useMagicLinkMutation()

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

  const handleOmniStackLogin = async ({ email, password }: LoginProps) => {
    try {
      const res = await omniStackLogin({ email, password }).unwrap()
      
      if (res && res.auth_response) {
        // Get account_type from auth_response
        const accountType = res.auth_response.account_type || AccountType.business;
        const newExpiresAt = Math.floor(Date.now() / 1000) + 60 * 60;
        
  
        // Store just the auth_response in vbAuth
        localStorage.setItem(
          'vbAuth',
          JSON.stringify({ ...res.auth_response, expires_at: newExpiresAt })
        );
        
         // Store omnistack response in a new item
        localStorage.setItem(
          'osAuth',
          JSON.stringify({ ...res, expires_at: newExpiresAt })
        );

        // Extract tokens from auth_response
        const accessToken = res.auth_response.token || res.auth_response.access_token || '';
        const refreshToken = res.auth_response.refresh_token || '';
        
        localStorage.setItem('adminToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('accountType', accountType);
        localStorage.setItem('expires_at', String(newExpiresAt));
  
        navigate(redirectMap[accountType]);
      }
    } catch (err) {
      setError('Invalid login credentials. Please try again.');
    }
  }
  
  const handleVbLogin = async ({ email, password }: LoginProps) => {
    try {
      const res = await vbLogin({ email, password }).unwrap()
      if (res) {
        const accountType = res.account_type
        const newExpiresAt = Math.floor(Date.now() / 1000) + 60 * 60

        if (newExpiresAt) {
          localStorage.setItem(
            'vbAuth',
            JSON.stringify({ ...res, expires_at: newExpiresAt })
          )
        }
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
    setError(null)

    try {
      const { email, password = '' } = data

      if (authMethod === 'magic-link') {
        magicLink({ email })
          .unwrap()
          .then(() => {
            toast({
              title: 'Magic Link Sent',
              description:
                'Check your email sent with the magic link so you can access directly your web app',
              variant: 'default',
            })
          })
          .catch(() => {
            toast({
              title: 'Error',
              description: 'Failed to send magic link. Please try again.',
              variant: 'destructive',
            })
          })
      } else {
        // First try OmniStack login
        try {
          await handleOmniStackLogin({ email, password })
          return
        } catch (omniError) {
          // If OmniStack login fails, try Supabase, then VB login as fallback
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
                const accountType =
                  res?.data?.account_type ?? AccountType.business
                const newExpiresAt = Math.floor(Date.now() / 1000) + 60 * 60
  
                if (newExpiresAt) {
                  localStorage.setItem(
                    'vbAuth',
                    JSON.stringify({ ...res, expires_at: newExpiresAt })
                  )
                }
                localStorage.setItem('adminToken', res?.data?.token ?? '')
                localStorage.setItem(
                  'refreshToken',
                  res?.data?.refresh_token ?? ''
                )
                localStorage.setItem('accountType', accountType)
                localStorage.setItem('expires_at', String(newExpiresAt))
  
                navigate(redirectMap[accountType])
              }
            } catch (error) {
              await handleVbLogin({ email, password })
            }
          }
        }
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.')
    }
  }

  const isLoading = isMagicLoading || isCheckLoading || isVbLoading || isOmniStackLoading

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='grid gap-3'>
            {error && <p className='text-sm text-red-500'>{error}</p>}

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1.5'>
                  <FormLabel className='text-gray-700'>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter your email'
                      className='border-gray-300 bg-white text-[#0A0A0A] focus:border-[#0A0A0A] focus:ring-[#0A0A0A]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-sm' />
                </FormItem>
              )}
            />

            {/* The rest of your form remains unchanged */}
            {authMethod === 'password' && (
              <>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem className='space-y-1.5'>
                      <FormLabel className='text-gray-700'>Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder='Enter your password'
                          className='border-gray-300 bg-white text-[#0A0A0A] focus:border-[#0A0A0A] focus:ring-[#0A0A0A]'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='text-sm' />
                    </FormItem>
                  )}
                />

                <div className='flex justify-between items-center'>
                  <div className='flex items-center'>
                    <input
                      id='remember-me'
                      name='remember-me'
                      type='checkbox'
                      className='h-4 w-4 rounded border-gray-300 text-[#0A0A0A] focus:ring-[#0A0A0A]'
                    />
                    <label
                      htmlFor='remember-me'
                      className='ml-2 text-sm text-gray-700'
                    >
                      Remember me
                    </label>
                  </div>

                  <div className='text-sm'>
                  <a href='/forgot-password'
                      className='font-medium text-[#0A0A0A] hover:text-[#171717]'
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>

          <Button
            type='submit'
            className='w-full bg-[#0A0A0A] text-white hover:bg-[#171717]'
            loading={isLoading}
          >
            {buttonText}
          </Button>
        </form>
      </Form>

      <div className='relative'>
        <div className='flex absolute inset-0 items-center'>
          <div className='w-full border-t border-gray-300' />
        </div>
        <div className='flex relative justify-center text-sm'>
          <span className='px-2 text-center text-gray-500 bg-white'>
            Not part of Staffluent yet? Contact us to streamline your workforce
            management
          </span>
        </div>
      </div>

      <div className='text-sm text-center'>
        <a href='https://staffluent.co/request-demo'
          className='font-bold text-[#0A0A0A] hover:text-[#171717]'
        >
          Join now
        </a>
      </div>
    </div>
  )
}