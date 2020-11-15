// PLUGINS IMPORTS //
import React, { useState } from "react"
import { useStripe } from "@stripe/react-stripe-js"

// COMPONENTS IMPORTS //
import { fetchFromAPI } from "Content/Shared/Helpers"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

const Checkout = () => {
  const stripe = useStripe()!
  const [product, setProduct] = useState({
    name: "Hat",
    description: "Pug hat. A hat your pug will love.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR2ej89mONvwOGNy_uWUvgYKrN5fGXXzy59MA&usqp=CAU",
    ],
    amount: 799,
    currency: "usd",
    quantity: 0,
  })

  const changeQuantity = (value: number) =>
    setProduct({ ...product, quantity: Math.max(0, product.quantity + value) })

  const openCheckout = async (event: any) => {
    const body = { line_items: [product] }
    const { id: sessionId } = await fetchFromAPI("checkout", {
      body,
    })

    const { error } = await stripe.redirectToCheckout({
      sessionId,
    })

    if (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>
        <h3>{product.name}</h3>
        <h4>Stripe Amount: {product.amount / 100} $</h4>

        <img src={product.images[0]} width="250px" alt="product" />

        <button onClick={() => changeQuantity(-1)}>-</button>
        <span>{product.quantity}</span>
        <button onClick={() => changeQuantity(1)}>+</button>
      </div>

      <hr />

      <button onClick={openCheckout} disabled={product.quantity < 1}>
        Start Checkout
      </button>
    </>
  )
}

export default React.memo(Checkout)
