/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { CheckCircle, Loader, XCircle } from 'lucide-react'
import type React from 'react'
import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

interface PasswordResetData {
  password: string
  confirmPassword: string
}

interface VerificationStatusProps {
  redirected?: boolean
  isResetFlow?: boolean
  isLoading?: boolean
  onPasswordReset?: (data: PasswordResetData) => void
  onSkip?: () => void
}

const VerificationStatus: React.FC<VerificationStatusProps> = ({
  redirected = false,
  isResetFlow = false,
  isLoading = true,
  onPasswordReset,
  onSkip,
}) => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const { toast } = useToast()
  const navigate = useNavigate()

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please check the form for errors',
      })
      return
    }

    try {
      await onPasswordReset?.(formData)
      toast({
        title: 'Success',
        description: 'Password set successfully',
      })
      setFormData({ password: '', confirmPassword: '' })
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to set password. Please try again.',
      })
    }
  }

  useEffect(() => {
    if (redirected && !isLoading) {
      const timeout = setTimeout(() => {
        navigate('/')
      }, 30000)

      return () => clearTimeout(timeout)
    }
  }, [redirected, isLoading])

  if (isResetFlow) {
    return (
      <Card className='relative mx-auto my-10 min-h-[40vh] max-w-md'>
        <Button
          variant='secondary'
          size='sm'
          onClick={onSkip}
          className='absolute right-4 top-4'
        >
          Skip
        </Button>
        <CardHeader>
          <CardTitle>Set Your Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='password'>New Password</Label>
              <Input
                id='password'
                type='password'
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={errors.password ? 'border-destructive' : ''}
              />
              {errors.password && (
                <p className='text-sm text-destructive'>{errors.password}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='confirmPassword'>Confirm Password</Label>
              <Input
                id='confirmPassword'
                type='password'
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className={errors.confirmPassword ? 'border-destructive' : ''}
              />
              {errors.confirmPassword && (
                <p className='text-sm text-destructive'>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <Button
              type='submit'
              className='w-full'
              disabled={isLoading}
              size='lg'
            >
              {isLoading ? (
                <>
                  <Loader className='mr-2 h-4 w-4 animate-spin' />
                  Processing...
                </>
              ) : (
                'Set Password'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className='flex min-h-screen items-center justify-center border bg-background p-4'>
      <Card className='w-full max-w-md'>
        <CardContent className='flex flex-col items-center space-y-4 p-6 text-center'>
          {isLoading ? (
            <div className='flex flex-col items-center space-y-4'>
              <Loader className='h-12 w-12 animate-spin text-primary' />
              <h1 className='text-2xl font-semibold text-gray-900 dark:text-white'>
                Redirecting...
              </h1>
              <p className='text-base text-gray-600'>Please wait a moment</p>
            </div>
          ) : redirected ? (
            <>
              <div className='rounded-full bg-green-50 p-3'>
                <CheckCircle className='h-12 w-12 text-green-600' />
              </div>
              <h1 className='text-2xl font-semibold text-green-900'>
                Verification Successful
              </h1>
              <p className={cn('text-base text-green-600', 'animate-pulse')}>
                Redirecting to the dashboard...
              </p>
            </>
          ) : (
            <>
              <div className='rounded-full bg-red-50 p-3'>
                <XCircle className='h-12 w-12 text-red-600' />
              </div>
              <h1 className='text-2xl font-semibold text-gray-900'>
                Verification Failed
              </h1>
              <p className='text-base text-gray-600'>
                We couldn't verify your email. The link might be expired or
                invalid.
              </p>
              <a
                href='/support'
                className={cn(
                  'mt-2 text-primary underline underline-offset-4',
                  'transition-colors duration-200',
                  'hover:text-primary/90'
                )}
              >
                Contact Support
              </a>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default VerificationStatus
