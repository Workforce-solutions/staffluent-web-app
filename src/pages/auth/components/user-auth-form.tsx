import { HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
// import {Link} from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
// import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react'
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

import supabase from '@/supabaseClient'
import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line react-refresh/only-export-components
export enum AccountType {
  client = 'client',
  business = 'business',
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null) // Reset error before new login attempt

    const { email, password } = data

    // Attempt to sign in with Supabase
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loginData: any = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    const loginError = loginData.loginError

    if (loginError) {
      setError(loginError.message)
    } else {
      navigate('/')
      checkConnection({
        email: loginData?.data?.user?.email ?? '',
        supabase_id: loginData?.data?.user?.id ?? '',
      }).then((res) => {
        if (res) {
          const accountType = res?.data?.account_type ?? AccountType.business
          localStorage.setItem('vbAuth', JSON.stringify(res))

          localStorage.setItem('adminToken', res?.data?.token ?? '')
          localStorage.setItem('refreshToken', res?.data?.refresh_token ?? '')
          localStorage.setItem('accountType', accountType)

          navigate(
            accountType === AccountType.business
              ? '/'
              : '/client-portal/dashboard'
          )
        }
      })
    }

    setIsLoading(false)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            {error && <p className='text-red-500'>{error}</p>}{' '}
            {/* Display error messages */}
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
