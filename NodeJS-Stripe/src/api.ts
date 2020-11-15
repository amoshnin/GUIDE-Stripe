// >PLUGINS IMPORTS< //
import express from "express"
import cors from "cors"
import { decodeJWT } from "./Helpers/functions"
export const app = express()

/////////////////////////////////////////

app.use(cors({ origin: true }))
app.use(
  express.json({
    verify: (req, res, buffer) => (req["rawBody"] = buffer),
  })
)
// Decodes the Firebase JSON Web Token
app.use(decodeJWT)

//////////////////////////////////////////////////////////////////////////////////
import WebPaymentRoutes from "./Routes/PaymenRoutes/WebPaymentRoutes/WebPaymentRoutes"
import MobilePaymentRoutes from "./Routes/PaymenRoutes/MobilePaymentRoutes/MobilePaymentRoutes"

// >SERVER ENDPOINTS< //
app.use(WebPaymentRoutes)
app.use(MobilePaymentRoutes)
