// PLUGINS IMPORTS //
import React, { FC } from "react"
import { auth } from "API/FirebaseConfig"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  user: any
}

const Logout: FC<PropsType> = (props) => {
  const handleClick = async () => auth.signOut()

  return <button onClick={handleClick}>Sign out</button>
}

export default React.memo(Logout)
