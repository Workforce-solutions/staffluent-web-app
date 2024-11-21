import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { CheckCircle, Loader2, XCircle } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { STRIPE_PUBLIC_KEY } from '../hooks/common/common-functions'

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)

const PaymentConfirmation = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [status, setStatus] = useState('processing')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const checkStatus = async () => {
      const stripe = await stripePromise
      if (!stripe) {
        setStatus('error')
        setMessage('Unable to check payment status')
        return
      }

      const clientSecret = new URLSearchParams(window.location.search).get(
        'payment_intent_client_secret'
      )

      if (!clientSecret) {
        setStatus('error')
        setMessage('No payment information found')
        return
      }

      try {
        const { paymentIntent } =
          await stripe.retrievePaymentIntent(clientSecret)
        // @ts-ignore
        switch (paymentIntent.status) {
          case 'succeeded':
            setStatus('success')
            setMessage(
              'Payment successful! You will receive a confirmation email shortly.'
            )
            break
          case 'processing':
            setStatus('processing')
            setMessage('Your payment is processing.')
            break
          case 'requires_payment_method':
            setStatus('error')
            setMessage('Your payment was not successful, please try again.')
            break
          default:
            setStatus('error')
            setMessage('Something went wrong.')
            break
        }

        toast({
          // @ts-ignore
          title:
            paymentIntent?.status === 'succeeded'
              ? 'Payment Successful'
              : 'Payment Status',
          description: message,
          // @ts-ignore
          variant:
            paymentIntent?.status === 'succeeded' ? 'default' : 'destructive',
        })
      } catch (error) {
        setStatus('error')
        setMessage('Unable to check payment status. Please contact support.')
        toast({
          title: 'Error',
          description: 'Failed to verify payment status',
          variant: 'destructive',
        })
      }
    }

    checkStatus()
  }, [toast])

  const handleReturn = () => {
    navigate('/client-portal/invoices')
  }

  const renderStatusIcon = () => {
    switch (status) {
      case 'processing':
        return <Loader2 className='h-16 w-16 animate-spin text-primary' />
      case 'success':
        return <CheckCircle className='h-16 w-16 text-green-500' />
      case 'error':
        return <XCircle className='h-16 w-16 text-red-500' />
      default:
        return null
    }
  }

  const getStatusTitle = () => {
    switch (status) {
      case 'processing':
        return 'Processing Payment'
      case 'success':
        return 'Payment Successful'
      case 'error':
        return 'Payment Failed'
      default:
        return 'Payment Status'
    }
  }

  return (
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>
      <Layout.Body className='flex items-center justify-center py-12'>
        <Card className='w-full max-w-md'>
          <CardHeader className='text-center'>
            <div className='mb-4 flex justify-center'>{renderStatusIcon()}</div>
            <CardTitle className='text-3xl font-bold tracking-tight'>
              {getStatusTitle()}
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <p className='text-center text-muted-foreground'>{message}</p>

            {status !== 'processing' && (
              <div className='flex flex-col space-y-4'>
                <Button
                  onClick={handleReturn}
                  variant={status === 'success' ? 'default' : 'secondary'}
                  className='w-full'
                >
                  Return to Invoices
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  )
}

export default PaymentConfirmation
