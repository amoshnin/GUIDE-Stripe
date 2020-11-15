// PLUGINS IMPORTS //
import React from "react"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

const CheckoutSuccess = () => {
  const url = window.location.href
  const sessionId = new URL(url).searchParams.get("session_id")
  return <h3>Checkout success {sessionId}</h3>
}

export default React.memo(CheckoutSuccess)
