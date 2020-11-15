import { db } from "../../../Helpers/firebase"
import Stripe from "stripe"
import { stripe } from "../../../index"

// Throws an error if the currentUser does not exist on the request
export const getOrCreateCustomer = async (userId: string, source?: string) => {
  const userSnapshot = await db.collection("users").doc(userId).get()
  const { stripeCustomerId, email } = userSnapshot.data()

  // If missing customerID, create it
  if (!stripeCustomerId) {
    //  CREATE new customer
    const customer = await stripe.customers.create({
      email,
      metadata: {
        firebaseUID: userId,
      },
      source,
    })

    await userSnapshot.ref.update({ stripeCustomerId: customer.id })
    return customer
  } else {
    return (await stripe.customers.retrieve(
      stripeCustomerId
    )) as Stripe.Customer
  }
}
