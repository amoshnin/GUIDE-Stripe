// REDUX IMPORTS //
import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunkMiddleware from "redux-thunk"

// FIREBASE IMPORTS //
import { getFirebase } from "react-redux-firebase"
import { reduxFirestore, getFirestore } from "redux-firestore"
import FirebaseConfig from "~/API/FirebaseConfig"

import { firestoreReducer } from "redux-firestore"
import { firebaseReducer } from "react-redux-firebase"

// REDUCERS IMPORTS //
// AccountReducer
import AccountGetReducer from "./Reducers/AccountReducers/AccountGetReducer"
// Payments reducers
import PaymentsGetReducer from "./Reducers/PaymentsReducers/PaymentsGetReducer"

////////////////////////////////////////////////////////////////////////

let reducers = combineReducers({
  AccountGetReducer,
  PaymentsGetReducer,

  // Firebase //
  firestore: firestoreReducer,
  firebase: firebaseReducer,
})

type reducersType = typeof reducers
export type AppStateType = ReturnType<reducersType>

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<PropertiesTypes<T>>

const composeEnhancers = compose
const ReduxStore = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware.withExtraArgument({ getFirestore, getFirebase })
    ),
    reduxFirestore(FirebaseConfig)
  )
)

export default ReduxStore
