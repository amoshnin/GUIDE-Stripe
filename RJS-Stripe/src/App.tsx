// PLUGINS IMPORTS //
import React, { Suspense } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

// COMPONENTS IMPORTS //
import Navbar from "Content/Layout/Navbar/Navbar"
//
import Checkout from "Content/Screens/Checkout/Checkout"
import CheckoutSuccess from "Content/Screens/Checkout/ResponseScreens/CheckoutSuccess/CheckoutSuccess"
import CheckoutFail from "Content/Screens/Checkout/ResponseScreens/CheckoutFail/CheckoutFail"

import Payments from "Content/Screens/Payments/Payments"
import Customers from "Content/Screens/Customers/Customers"
import Subscriptions from "Content/Screens/Subscriptions/Subscriptions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <main>
          <Switch>
            <Route path="/" exact></Route>
            <Route path="/checkout">
              <Checkout />
            </Route>
            <Route path="/payments">
              <Payments />
            </Route>
            <Route path="/customers">
              <Suspense fallback={<div>Loading...</div>}>
                <Customers />
              </Suspense>
            </Route>
            <Route path="/subscriptions">
              <Suspense fallback={<div>Loading...</div>}>
                <Subscriptions />
              </Suspense>
            </Route>
            <Route path="/success">
              <CheckoutSuccess />
            </Route>
            <Route path="/failed">
              <CheckoutFail />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default React.memo(App)
