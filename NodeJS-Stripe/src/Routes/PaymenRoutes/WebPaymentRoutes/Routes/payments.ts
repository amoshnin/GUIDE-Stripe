import { stripe } from "../../../../index"

// Create a Payment Intent with a specific amount
export const createPaymentIntent = async (amount: number, email?: string) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    receipt_email: email,
  })

  return paymentIntent
}
