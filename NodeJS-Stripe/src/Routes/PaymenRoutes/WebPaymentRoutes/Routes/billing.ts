import Stripe from "stripe"
import { stripe } from "../../../../index"
import { db } from "../../../../Helpers/firebase"
import { getOrCreateCustomer } from "../../Shared/Helpers"
import { firestore } from "firebase-admin"

// Attaches a payment method to the Stripe customer,
// subscribes to a Stripe plan, and saves the plan to Firestore
export const createSubscription = async (
  userId: string,
  plan: string,
  payment_method: string
) => {
  const customer = await getOrCreateCustomer(userId)
  console.log(customer)

  // Attach the  payment method to the customer
  await stripe.paymentMethods.attach(payment_method, { customer: customer.id })

  // Set it as the default payment method
  await stripe.customers.update(customer.id, {
    invoice_settings: { default_payment_method: payment_method },
  })

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ plan }],
    expand: ["latest_invoice.payment_intent"],
  })

  const invoice = subscription.latest_invoice as Stripe.Invoice
  const payment_intent = invoice.payment_intent as Stripe.PaymentIntent

  if (payment_intent.status === "succeeded") {
    await db
      .collection("users")
      .doc(userId)
      .set(
        {
          stripeCustomerId: customer.id,
          activePlans: firestore.FieldValue.arrayUnion(plan),
        },
        { merge: true }
      )
  }

  return subscription
}

// Cancel an active subscription, syncs the data in Firestore
export const cancelSubscription = async (
  userId: string,
  subscriptionId: string
) => {
  const customer = await getOrCreateCustomer(userId)

  if (customer.metadata.firebaseUID !== userId) {
    throw Error(`Firebase UID doesn't match Stripe Customer`)
  }
  const subscription = await stripe.subscriptions.del(subscriptionId)

  // Cancel at the end of period
  // const subscription = stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true });

  if (subscription.status === "canceled") {
    await db
      .collection("users")
      .doc(userId)
      .update({
        activePlans: firestore.FieldValue.arrayRemove(subscription.id),
      })
  }

  return subscription
}

// List all subscriptions linked to the Firebase userID in Stripe
export const listSubscriptions = async (userId: string) => {
  const customer = await getOrCreateCustomer(userId)
  const subscriptions = await stripe.subscriptions.list({
    customer: customer.id,
  })

  return subscriptions
}
