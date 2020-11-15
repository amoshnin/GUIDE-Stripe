// PLUGINS IMPORTS //
import React, { useState, FormEvent } from "react"
import { fetchFromAPI } from "Content/Shared/Helpers"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { StripeCardElement } from "@stripe/stripe-js"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

const Payments = () => {
  const stripe = useStripe()!
  const elements = useElements()!

  const [amount, setAmount] = useState<number>(0)
  const [paymentIntent, setPaymentIntent] = useState<any>(false)

  // Create a payment intent on the server
  const createPaymentIntent = async () => {
    // Clamp amount to Stripe min/max
    const validAmount = Math.min(Math.max(amount, 50), 9999999)
    setAmount(validAmount)

    // Make the API Request
    const pi = await fetchFromAPI("payments", { body: { amount: validAmount } })
    setPaymentIntent(pi)
  }

  // Handle the submission of card details
  const submitPayment = async (event: FormEvent) => {
    event.preventDefault()
    const cardElement = elements.getElement(CardElement) as StripeCardElement

    // Confirm Card Payment
    const {
      paymentIntent: updatePaymentIntent,
      error,
    } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
      payment_method: { card: cardElement },
    })

    if (error) {
      console.log(error)
      error.payment_intent && setPaymentIntent(error.payment_intent)
    } else {
      setPaymentIntent(updatePaymentIntent)
    }
  }

  return (
    <>
      <div>
        <input
          type="number"
          value={amount}
          disabled={paymentIntent}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button
          disabled={amount <= 0}
          onClick={createPaymentIntent}
          hidden={paymentIntent}
        >
          Ready to Pay ${(amount / 100).toFixed(2)}
        </button>
      </div>

      <form onSubmit={submitPayment}>
        <CardElement />
        <button type="submit">Pay</button>
      </form>
    </>
  )
}

export default React.memo(Payments)
