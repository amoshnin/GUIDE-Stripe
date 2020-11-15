// PLUGINS IMPORTS //
import React from "react"
import firebase from "firebase/app"
import { auth, db } from "API/FirebaseConfig"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

const Login = () => {
  const handleClick = async () => {
    const credential = await auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )

    const { uid, email } = credential.user as any
    db.collection("users").doc(uid).set({ email }, { merge: true })
  }

  return <button onClick={handleClick}>Sign In with Google</button>
}

export default React.memo(Login)
