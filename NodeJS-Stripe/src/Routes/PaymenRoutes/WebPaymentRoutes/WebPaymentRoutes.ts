import express, { Request, Response } from "express"
// >PLUGINS IMPORTS< //
export const app = express()

/////////////////////////////////////////
// >ROUTES IMPORTS< //
import { createStripeCheckoutSession } from "./Routes/checkout"
import { createPaymentIntent } from "./Routes/payments"
import { handleStripeWebhook } from "./Routes/webhooks"

//
import { runAsync, validateUser } from "../../../Helpers/functions"
import { createSetupIntent, listPaymentMethods } from "./Routes/customers"
import {
  createSubscription,
  listSubscriptions,
  cancelSubscription,
} from "./Routes/billing"

/////////////////////////////////////////
const router = express.Router()

// Checkout //
router.post(
  "/checkout",
  runAsync(async ({ body }: Request, res: Response) => {
    res.send(await createStripeCheckoutSession(body.line_items))
  })
)

// Payment intents API //
// Crate a PaymentIntent
router.post(
  "/payments",
  runAsync(async ({ body }: Request, res: Response) => {
    res.send(await createPaymentIntent(body.amount, body.email))
  })
)

// Webhooks //
// Handle webhooks
router.post("/hooks", runAsync(handleStripeWebhook))

// Customers and Setup Intents
// Save a card on the customer record with a SetupIntent
router.post(
  "/wallet",
  runAsync(async (req: Request, res: Response) => {
    const user = validateUser(req)
    const setupIntent = await createSetupIntent(user.uid)
    res.send(setupIntent)
  })
)

// Retrieve all cards attached to a customer
router.get(
  "/wallet",
  runAsync(async (req: Request, res: Response) => {
    console.log("IN WALLET GET")
    const user = validateUser(req)
    const wallet = await listPaymentMethods(user.uid)
    res.send(wallet.data)
  })
)

// Billing and Recurring subscriptions
// Create and charge new subscription
router.post(
  "/subscriptions",
  runAsync(async (req: Request, res: Response) => {
    const user = validateUser(req)
    const { plan, payment_method } = req.body
    console.log(user)
    const subscription = await createSubscription(
      user.uid,
      plan,
      payment_method
    )
    res.send(subscription)
  })
)

// List all subscription
router.get(
  "/subscriptions",
  runAsync(async (req: Request, res: Response) => {
    const user = validateUser(req)
    const subscriptions = await listSubscriptions(user.uid)
    res.send(subscriptions.data)
  })
)

// Unsubscribe or cancel subscription
router.patch(
  "/subscriptions",
  runAsync(async (req: Request, res: Response) => {
    const user = validateUser(req)
    res.send(await cancelSubscription(user.uid, req.params.id))
  })
)

export default router
