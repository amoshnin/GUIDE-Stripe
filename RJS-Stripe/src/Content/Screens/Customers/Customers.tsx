// PLUGINS IMPORTS //
import React, { useState, useEffect, FormEvent } from "react"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { useUser, AuthCheck } from "reactfire"

// COMPONENTS IMPORTS //
import Login from "../Auth/Login/Login"
import Logout from "../Auth/Logout/Logout"
import CreditCard from "./CreditCard/CreditCard"

import { fetchFromAPI } from "Content/Shared/Helpers"
import { StripeCardElement } from "@stripe/stripe-js"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

const Customers = () => {
  const stripe = useStripe()!
  const elements = useElements()!
  const user = useUser()

  console.log(user)

  const [setupIntent, setSetupIntent] = useState<any>()
  const [wallet, setWallet] = useState<Array<{ id: number; card: any }>>([])

  // Get the user's wallet on mount
  useEffect(() => {
    getWallet()
  }, [user])

  const getWallet = async () => {
    if (user) {
      const paymentMethods = await fetchFromAPI("wallet", { method: "GET" })
      setWallet(paymentMethods)
    }
  }

  const createSetupIntent = async () => {
    const si = await fetchFromAPI("wallet")
    setSetupIntent(si)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const cardElement = elements.getElement(CardElement) as StripeCardElement

    // Confirm Card Setup
    const {
      setupIntent: updatedSetupIntent,
      error,
    } = await stripe.confirmCardSetup(setupIntent.client_secret, {
      payment_method: { card: cardElement },
    })

    if (error) {
      alert(error.message)
      console.log(error)
    } else {
      setSetupIntent(updatedSetupIntent)
      await getWallet()
      alert("Success! Card added to your wallet!")
    }
  }

  return (
    <>
      <AuthCheck fallback={<Login />}>
        <div>
          <button onClick={createSetupIntent} hidden={setupIntent}>
            Attach New Credit Card
          </button>
        </div>
        <hr />

        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit">Attach</button>
        </form>

        <select>
          {wallet.map((paymentSource) => (
            <CreditCard key={paymentSource.id} card={paymentSource.card} />
          ))}
        </select>

        <div>
          <Logout user={user} />
        </div>
      </AuthCheck>
    </>
  )
}

export default React.memo(Customers)
