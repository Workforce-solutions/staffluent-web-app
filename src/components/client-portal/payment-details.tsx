import { PaymentResponse } from '@/services/clientInvoicesApi'
import { Card, CardContent } from '../ui/card'
import { Label } from '../ui/label'

interface PaymentDetailsProps {
  paymentResponse: PaymentResponse
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ paymentResponse }) => {
  const renderField = (label: string, value: string | null) => (
    <div className='space-y-1'>
      <Label className='text-sm font-medium'>{label}</Label>
      <div className='flex items-center justify-between'>
        <p className='text-sm'>{value || 'N/A'}</p>
      </div>
    </div>
  )

  const renderPaymentDetails = () => {
    const { method, metadata } = paymentResponse.payment
    const detailsMap: Record<
      string,
      { label: string; field: keyof typeof metadata }[]
    > = {
      cash: [
        { label: 'Business Email', field: 'business_email' },
        { label: 'Address', field: 'venue_address' },
        { label: 'Contact Phone', field: 'venue_phone' },
      ],
      bank_transfer: [
        { label: 'Reference Number', field: 'reference' },
        { label: 'Bank Name', field: 'bank_name' },
        { label: 'Account Name', field: 'account_name' },
        { label: 'Account Number', field: 'account_number' },
        { label: 'Routing Number', field: 'routing_number' },
        { label: 'SWIFT Code', field: 'swift_code' },
      ],
    }

    return detailsMap[method]?.map(({ label, field }) =>
      renderField(label, metadata[field] || null)
    )
  }

  return (
    <Card className='mt-4'>
      <CardContent className='space-y-4 pt-6'>
        <div className='space-y-2'>
          <h3 className='text-lg font-medium'>
            {paymentResponse.payment.method === 'cash'
              ? 'Cash Payment Details'
              : 'Bank Transfer Details'}
          </h3>
          <p className='text-sm text-muted-foreground'>
            {paymentResponse.message}
          </p>
        </div>
        {renderPaymentDetails()}
      </CardContent>
    </Card>
  )
}

export default PaymentDetails
