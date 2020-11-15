// PLUGINS IMPORTS //
import React, { useState, useEffect, FC } from "react"
import { db } from "../../../../API/FirebaseConfig"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  user: any
}

const UserData: FC<PropsType> = (props) => {
  const [data, setData] = useState<any>({
    stripeCustomerId: undefined,
    activePlans: [],
  })

  // Subscribe to the user's data in Firestore
  useEffect(() => {
    const unsubscribe = props.user
      ? db
          .collection("users")
          .doc(props.user.uid)
          .onSnapshot((doc) => {
            const data = doc.data()
            if (data) {
              setData(data)
            }
          })
      : () => {}
    return () => unsubscribe()
  }, [props.user])

  return (
    <pre>
      Stripe Customer ID: {data.stripeCustomerId} <br />
      Subscriptions: {JSON.stringify(data.activePlans || [])}
    </pre>
  )
}

export default React.memo(UserData)
