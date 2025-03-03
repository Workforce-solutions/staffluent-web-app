/* eslint-disable react-refresh/only-export-components */
import { LoginProps } from '@/@types/auth'
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
import { toast } from '@/components/ui/use-toast'
import { SideLink } from '@/data/sidelinks'
import { getRedirectPath } from '@/hooks/common/common-functions'
import useLocalStorage from '@/hooks/use-local-storage'
import { cn } from '@/lib/utils'
import {
  useOmniStackLoginMutation,
  useVbLoginMutation,
} from '@/services/authApi'
import { useMagicLinkMutation } from '@/services/magic-linkApi'
import { useCheckConnectionMutation } from '@/services/vbAuthApi'
import supabase from '@/supabaseClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

export enum AccountType {
  client = 'client',
  business_admin = 'business_admin',
  business = 'business',
  business_team_leader = 'business_team_leader',
  business_operations_managers = 'business_operations_managers',
  staff_team_leader = 'staff_team_leader',
  team_leader = 'team_leader',
  app_client = 'app_client',
  staff_operations_manager = 'staff_operations_manager',
  operations_manager = 'operations_manager',
  business_operations_manager = 'business_operations_manager',
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
  const [sidebar] = useLocalStorage<SideLink[]>({
    defaultValue: [],
    key: 'sidebarLinks',
  })
  const [checkConnection, { isLoading: isCheckLoading }] =
    useCheckConnectionMutation()
  const [vbLogin, { isLoading: isVbLoading }] = useVbLoginMutation()
  const [omniStackLogin, { isLoading: isOmniStackLoading }] =
    useOmniStackLoginMutation()
  const [magicLink, { isLoading: isMagicLoading }] = useMagicLinkMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleOmniStackLogin = async ({ email, password }: LoginProps) => {
    try {
      const res = await omniStackLogin({ email, password }).unwrap()

      // if (res && res.auth_response) {
      const accountType =
        res?.account_type ||
        res?.auth_response?.account_type ||
        AccountType.business

      const newExpiresAt = Math.floor(Date.now() / 1000) + 60 * 60

      if (newExpiresAt && newExpiresAt > 0) {
        // Store just the auth_response in vbAuth
        localStorage.setItem(
          'vbAuth',
          JSON.stringify({ ...res.auth_response, expires_at: newExpiresAt })
        )

        // Store omnistack response in a new item
        localStorage.setItem(
          'osAuth',
          JSON.stringify({ ...res, expires_at: newExpiresAt })
        )

        localStorage.setItem('expires_at', String(newExpiresAt))
      }

      if (res?.userId) {
        localStorage.setItem('osId', res?.userId)
      }

      // Extract tokens from auth_response
      const accessToken =
        res?.auth_response?.token ||
        res?.auth_response?.access_token ||
        res?.token ||
        res?.access_token ||
        ''

      const sidebarLinks = res.sidebarLinks ?? []
      const refreshToken =
        res?.auth_response?.refresh_token || res?.refresh_token || ''

      accessToken && localStorage.setItem('adminToken', accessToken)
      refreshToken && localStorage.setItem('refreshToken', refreshToken)
      accountType && localStorage.setItem('accountType', accountType)
      localStorage.setItem('sidebarLinks', JSON.stringify(sidebarLinks))

      navigate(
        sidebarLinks[0].sub?.[0]?.href ??
          sidebarLinks[0].href ??
          getRedirectPath(accountType)
      )
    } catch (err) {
      setError('Invalid login credentials. Please try again.')
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

        navigate(
          sidebar[0].sub?.[0]?.href ??
            sidebar[0].href ??
            getRedirectPath(accountType)
        )
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

                navigate(
                  sidebar[0].sub?.[0]?.href ??
                    sidebar[0].href ??
                    getRedirectPath(accountType)
                )
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

  const isLoading =
    isMagicLoading || isCheckLoading || isVbLoading || isOmniStackLoading

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

                <div className='flex items-center justify-between'>
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
                    <a
                      href='/forgot-password'
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
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-gray-300' />
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='bg-white px-2 text-center text-gray-500'>
            Not part of Staffluent yet? Contact us to streamline your workforce
            management
          </span>
        </div>
      </div>

      <div className='text-center text-sm'>
        <a
          href='https://staffluent.co/request-demo'
          className='font-bold text-[#0A0A0A] hover:text-[#171717]'
        >
          Join now
        </a>
      </div>
    </div>
  )
}
