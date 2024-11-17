import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { format } from 'date-fns'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, CreditCard, Building2, Banknote } from 'lucide-react'
import { cn } from "@/lib/utils"
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useShortCode } from '@/hooks/use-local-storage'
import { useToast } from '@/components/ui/use-toast'
import { useInitiatePaymentMutation } from '@/services/clientInvoicesApi'
import {STRIPE_PUBLIC_KEY} from "../../hooks/common/common-functions";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)

interface PaymentModalProps {
    open: boolean
    onClose: () => void
    invoice: {
        id: number
        number: string
        amount: number
    }
    onPaymentComplete: () => void
}

const PaymentForm = ({  }: { clientSecret: string }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState('')
    const [processing, setProcessing] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!stripe || !elements) return

        setProcessing(true)
        const { error: submitError } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/invoices/confirmation`,
            },
        })

        if (submitError) {
            setError(submitError.message || 'Payment failed')
            setProcessing(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            <Button className="w-full mt-4" disabled={!stripe || processing}>
                {processing ? 'Processing...' : 'Pay Now'}
            </Button>
        </form>
    )
}

export function PaymentModal({ open, onClose, invoice, onPaymentComplete }: PaymentModalProps) {
    const shortCode = useShortCode()
    const { toast } = useToast()
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank_transfer' | 'cash'>('card')
    const [date, setDate] = useState<Date>()
    const [clientSecret, setClientSecret] = useState<string>()

    const [initiatePayment, { isLoading }] = useInitiatePaymentMutation()

    const handlePaymentInitiation = async () => {
        try {
            const response = await initiatePayment({
                venue_short_code: shortCode,
                invoice_id: invoice.id,
                payment_method: paymentMethod,
                payment_date: date ? format(date, 'yyyy-MM-dd') : undefined
            }).unwrap()

            if (paymentMethod === 'card') {
                setClientSecret(response.payment.metadata.client_secret)
            } else {
                toast({
                    title: 'Success',
                    description: response.message || 'Payment scheduled successfully'
                })
                onPaymentComplete()
                onClose()
            }
        } catch (error) {
            console.error('Payment initiation failed:', error)
            toast({
                title: 'Error',
                description: 'Failed to initiate payment',
                variant: 'destructive'
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Pay Invoice #{invoice.number}</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="space-y-4">
                        <RadioGroup
                            value={paymentMethod}
                            onValueChange={(value: 'card' | 'bank_transfer' | 'cash') => setPaymentMethod(value)}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="card" id="card" />
                                <Label htmlFor="card" className="flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    Pay with Card
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="bank_transfer" id="bank" />
                                <Label htmlFor="bank" className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4" />
                                    Bank Transfer
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cash" id="cash" />
                                <Label htmlFor="cash" className="flex items-center gap-2">
                                    <Banknote className="h-4 w-4" />
                                    Pay with Cash
                                </Label>
                            </div>
                        </RadioGroup>

                        {paymentMethod !== 'card' && (
                            <div className="space-y-2">
                                <Label>Payment Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, 'PPP') : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            disabled={(date) => date < new Date()}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        )}

                        {paymentMethod === 'card' && clientSecret ? (
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <PaymentForm clientSecret={clientSecret} />
                            </Elements>
                        ) : (
                            <Button
                                className="w-full"
                                onClick={handlePaymentInitiation}
                                disabled={isLoading || (paymentMethod !== 'card' && !date)}
                            >
                                {isLoading ? 'Processing...' : paymentMethod === 'card' ? 'Continue to Payment' : 'Schedule Payment'}
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}