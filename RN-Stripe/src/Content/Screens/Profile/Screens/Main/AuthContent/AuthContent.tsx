// PLUGINS IMPORTS //
import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { Text } from "~/Content/Shared/Components/index"
import { useNavigation } from "@react-navigation/native"
import { auth } from "~/API/FirebaseConfig"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS

/////////////////////////////////////////////////////////////////////////////

const AuthContent = () => {
  const navigation = useNavigation()

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("PaymentInfo")}>
        <Text>Payment info</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => auth.signOut()}>
        <Text>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})

export default AuthContent
