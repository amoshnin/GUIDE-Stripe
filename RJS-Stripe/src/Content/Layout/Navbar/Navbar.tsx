// PLUGINS IMPORTS //
import React from "react"
import { Link } from "react-router-dom"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

const Navbar = () => {
  return (
    <nav>
      <ul className="navbar-nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/checkout">
            <span aria-label="emoji" role="img">
              🛒
            </span>{" "}
            Checkout
          </Link>
        </li>
        <li>
          <Link to="/payments">
            <span aria-label="emoji" role="img">
              💸
            </span>{" "}
            Payments
          </Link>
        </li>
        <li>
          <Link to="/customers">
            <span aria-label="emoji" role="img">
              🧑🏿‍🤝‍🧑🏻
            </span>{" "}
            Customers
          </Link>
        </li>
        <li>
          <Link to="/subscriptions">
            <span aria-label="emoji" role="img">
              🔄
            </span>{" "}
            Subscriptions
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default React.memo(Navbar)
