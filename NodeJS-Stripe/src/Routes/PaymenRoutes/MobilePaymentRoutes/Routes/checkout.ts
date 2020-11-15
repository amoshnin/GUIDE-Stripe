import { stripe } from "../../../../index"
import { getOrCreateCustomer } from "../../Shared/Helpers"

export const chargeCheckout = async (
  userId: string,
  cardId: string,
  amount: number,
  currency: string
) => {
  const customer = await getOrCreateCustomer(userId)
  const updatedCustomer = await stripe.customers.update(customer.id, {
    default_source: cardId,
  })

  const charge = await stripe.charges.create({
    amount,
    currency,
    description: "My First Test Charge (created for API docs)",
    customer: updatedCustomer.id,
  })

  return charge
}
