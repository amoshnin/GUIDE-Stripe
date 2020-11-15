import React from "react"
import ReactDOM from "react-dom"
import "Styles/styles.css"
import App from "./App"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import { FirebaseAppProvider } from "reactfire"

export const firebaseConfig = {
  apiKey: "AIzaSyCZ6n1Q4pqjFY7vv7iPkErsz7umuYdHirE",
  authDomain: "easy-service-dc8a5.firebaseapp.com",
  databaseURL: "https://easy-service-dc8a5.firebaseio.com",
  projectId: "easy-service-dc8a5",
  storageBucket: "easy-service-dc8a5.appspot.com",
  messagingSenderId: "404550704994",
  appId: "1:404550704994:web:50be66126ec8d24d4ed63b",
  measurementId: "G-S6W8Q0335H",
}

export const stripePromise = loadStripe(
  "pk_test_51HcZzoGN8FXEZpFVnYXJ379Cf2ymbXTEhGGjr9rwcgFyDbt7MJEjlCukDjwBKAMU5Ex3sTe80cvKAepnYS6FOHtK009FZJLqnP"
)

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
