// PLUGINS IMPORTS //
import React, { FC, useState, FormEvent, useEffect } from "react"
import { AuthCheck, useUser } from "reactfire"
import Login from "Content/Screens/Auth/Login/Login"
import Logout from "Content/Screens/Auth/Logout/Logout"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { fetchFromAPI, axiosHeaders } from "Content/Shared/Helpers"
import { StripeCardElement } from "@stripe/stripe-js"
import axios from "axios"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  user: any
}

const SubscribeToPlan: FC<PropsType> = (props) => {
  const stripe = useStripe()!
  const elements = useElements()!
  const user = useUser()

  const [plan, setPlan] = useState<string | null>()
  const [subscriptions, setSubscriptions] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(false)

  // Get current subscriptions from API
  const getSubscriptions = async () => {
    if (user) {
      const subs = await fetchFromAPI("subscriptions", { method: "GET" })
      setSubscriptions(subs)
    }
  }

  const cancelSubscription = async (id: string) => {
    setLoading(true)
    await fetchFromAPI(`subscriptions/${id}`, { method: "PATCH" })
    alert(`Canceled ${id}!`)
    await getSubscriptions()
    setLoading(false)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)

    const cardElement = elements.getElement(CardElement) as StripeCardElement

    // Create Payment Method
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    })

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    // Create subscription on server
    const subscription = await fetchFromAPI("subscriptions", {
      body: {
        plan,
        payment_method: paymentMethod?.id,
      },
    })

    // The subscription contains an invoice
    // If the invoice's payment succeeded then you're good,
    // otherwise, the payment intent must be confirmed

    const { latest_invoice } = subscription
    if (latest_invoice.payment_intent) {
      const { client_secret, status } = latest_invoice.payment_intent

      if (status === "requires_action") {
        const { error: confirmationError } = await stripe.confirmCardPayment(
          client_secret
        )

        if (confirmationError) {
          console.log(confirmationError)
          alert("Unable to confirm card")
          return
        }

        // Success
        alert("You are subscribed!")
        getSubscriptions()
      }

      setLoading(false)
      setPlan(null)
    }
  }

  const [products, setProducts] = useState([])
  const getProducts = async () => {
    await axios
      .get("https://api.stripe.com/v1/prices", {
        headers: axiosHeaders,
      })
      .then((res) => {
        const data = res.data.data
        // data.forEach(async (item: any) =>
        //   axios
        //     .get(`https://api.stripe.com/v1/products/${item.product}`, {
        //       headers: axiosHeaders,
        //     })
        //     .then((el) => console.log(el))
        // )
        setProducts(data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getProducts()
  }, [])

  console.log(products)
  return (
    <AuthCheck fallback={<Login />}>
      <hr />

      <div>
        {products.map((item: any) => (
          <button onClick={() => setPlan(item.id)}>
            {item.id} {item.unit_amount}
            {item.currency}
            /m
          </button>
        ))}

        <p>
          Selected Plan: <strong>{plan}</strong>
        </p>
      </div>
      <hr />

      <form onSubmit={handleSubmit} hidden={!plan}>
        <CardElement />
        <button type="submit" disabled={loading}>
          Subscribe & Pay
        </button>
      </form>

      <div>
        <h3>Manage Current Subscriptions</h3>
        <div>
          {subscriptions.map((sub) => (
            <div key={sub.id}>
              {sub.id}. Next payment of {sub.plan.amount} due{" "}
              {new Date(sub.current_period_end * 1000).toUTCString()}
              <button
                onClick={() => cancelSubscription(sub.id)}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Logout user={props.user} />
      </div>
    </AuthCheck>
  )
}

export default React.memo(SubscribeToPlan)
