import { stripe } from "../../../../index"
import Stripe from "stripe"
import { Request, Response } from "express"
import { db } from "../../../../Helpers/firebase"
import { firestore } from "firebase-admin"

const webhookHandlers = {
  "payment_intent.succeeded": async (data: Stripe.PaymentIntent) => {
    // Add your business logic here
  },
  "payment_intent.payment_failed": async (data: Stripe.PaymentIntent) => {
    // Add your business logic here
  },
  "customer.subscription.deleted": async (data: Stripe.Subscription) => {},
  "customer.subscription.created": async (data: Stripe.Subscription) => {
    const customer = (await stripe.customers.retrieve(
      data.customer as string
    )) as Stripe.Customer
    const userId = customer.metadata.firebaseUID
    const userRef = db.collection("users").doc(userId)

    await userRef.update({
      activePlans: firestore.FieldValue.arrayUnion(data.id),
    })
  },
  "invoice.payment_succeeded": async (data: Stripe.Invoice) => {
    // Add your business logic here
  },
  "invoice.payment_failed": async (data: Stripe.Invoice) => {
    const customer = (await stripe.customers.retrieve(
      data.customer as string
    )) as Stripe.Customer
    const userSnapshot = await db
      .collection("users")
      .doc(customer.metadata.firebaseUID)
      .get()

    await userSnapshot.ref.update({ status: "PAST_DUE" })
  },
}

// Business logic for specific webhook event types
export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"]
  const event = stripe.webhooks.constructEvent(
    req["rawBody"],
    sig,
    process.env.STRIPE_WEBHOOK_SECERT_KEY
  )

  try {
    await webhookHandlers[event.type](event.data.object)
    res.send({ received: true })
  } catch (err) {
    console.error(err)
    res.status(400).send(`Webhook Error: ${err.message}`)
  }
}
