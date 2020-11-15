import { stripe } from "../../../../index"
import Stripe from "stripe"

// Creates a Stripe Checkout session with line items
export const createStripeCheckoutSession = async (
  line_items: Array<Stripe.Checkout.SessionCreateParams.LineItem>
) => {
  // Example Item
  // {
  //   name: "T-Shirt",
  //   description: "Comfortable cotton T-Shirt",
  //   images: ["https://image.png"],
  //   amount: 500,
  //   currency: "usd",
  //   quantity: 1,
  // }

  const url = process.env.WEBAPP_URL
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    success_url: `${url}success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${url}failed`,
  })

  return session
}
