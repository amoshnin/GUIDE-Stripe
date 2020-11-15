import { stripe } from "../../../../index"
import { getOrCreateCustomer } from "../../Shared/Helpers"

export const addPaymentMethod = async (userId: string, token: string) => {
  const customer = await getOrCreateCustomer(userId)
  const card = await stripe.customers.createSource(customer.id, {
    source: token,
  })
  return card
}

export const delPaymentMethod = async (userId: string, cardId: string) => {
  const customer = await getOrCreateCustomer(userId)
  const delCard = await stripe.customers.deleteSource(customer.id, cardId)
  console.log(delCard)
  return delCard
}
