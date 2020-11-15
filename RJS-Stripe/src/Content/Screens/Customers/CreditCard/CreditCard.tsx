// PLUGINS IMPORTS //
import React, { FC } from "react"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  card: any
}

const CreditCard: FC<PropsType> = (props) => {
  const { last4, brand, exp_month, exp_year } = props.card
  return (
    <option>
      {brand} **** **** **** {last4} expires {exp_month}/{exp_year}
    </option>
  )
}

export default React.memo(CreditCard)
