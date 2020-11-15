import express, { Request, Response } from "express"
// >PLUGINS IMPORTS< //
export const app = express()

/////////////////////////////////////////
// >ROUTES IMPORTS< //
import { runAsync } from "../../../Helpers/functions"

// Checkout
import { chargeCheckout } from "./Routes/checkout"
// Payment methods
import { addPaymentMethod, delPaymentMethod } from "./Routes/paymentMethods"

/////////////////////////////////////////
const router = express.Router()

router.post(
  "/m_charge",
  runAsync(async (req: Request, res: Response) => {
    const { userId, token, amount, currency } = req.body
    res.send(await chargeCheckout(userId, token, amount, currency))
  })
)

router.post(
  "/m_payment_method",
  runAsync(async (req: Request, res: Response) => {
    const { userId, token } = req.body
    res.send(await addPaymentMethod(userId, token))
  })
)

router.patch(
  "/m_payment_method",
  runAsync(async (req: Request, res: Response) => {
    const { userId, cardId } = req.body
    res.send(await delPaymentMethod(userId, cardId))
  })
)

export default router
