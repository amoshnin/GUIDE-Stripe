// PLUGINS IMPORTS //
import React from "react"
import { View } from "react-native"
import { useSelector } from "react-redux"

// COMPONENTS IMPORTS //
import AuthContent from "./AuthContent/AuthContent"
import UnAuthContent from "./UnAuthContent/UnAuthContent"

// EXTRA IMPORTS

// REDUX
import { getIsAuthSelector } from "~/Redux/Selectors/AccountSelectors"

/////////////////////////////////////////////////////////////////////////////

const Main = () => {
  const isAuth = useSelector(getIsAuthSelector)

  return <View>{isAuth ? <AuthContent /> : <UnAuthContent />}</View>
}

export default Main
