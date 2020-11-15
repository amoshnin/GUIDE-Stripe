// PLUGINS IMPORTS //
import React, { FC } from "react"

// COMPONENTS IMPORTS //
import UserData from "./UserData/UserData"
import SubscribeToPlan from "./SubscribeToPlan/SubscribeToPlan"
import { useUser } from "reactfire"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

interface PropsType {}

const Subscriptions: FC<PropsType> = (props) => {
  const user = useUser()
  return (
    <>
      <UserData user={user} />
      <SubscribeToPlan user={user} />
    </>
  )
}

export default React.memo(Subscriptions)
