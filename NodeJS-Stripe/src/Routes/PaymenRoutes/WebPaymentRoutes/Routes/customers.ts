import { stripe } from "../../../../index"
import { getOrCreateCustomer } from "../../Shared/Helpers"

// Creates a SetupIntent used to save a credit card for later use
export const createSetupIntent = async (userId: string) => {
  const customer = await getOrCreateCustomer(userId)
  return stripe.setupIntents.create({
    customer: customer.id,
  })
}

// Retrieve all cards attached to a customer
export const listPaymentMethods = async (userId: string) => {
  const customer = await getOrCreateCustomer(userId)

  return stripe.paymentMethods.list({
    customer: customer.id,
    type: "card",
  })
}
