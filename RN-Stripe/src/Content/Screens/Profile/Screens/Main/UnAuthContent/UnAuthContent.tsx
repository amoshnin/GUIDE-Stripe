// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"
import { GoogleButton, GoogleLoginFunction } from "react-native-fb-social-auth"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS

/////////////////////////////////////////////////////////////////////////////

const ICON_SIZE = 27
const WEB_CLIENT_ID =
  "404550704994-8o7ah64bescpu9ljcudgdgm9gs8kiprk.apps.googleusercontent.com"
const UnAuthContent = () => {
  return (
    <View>
      <GoogleButton
        webClientID={WEB_CLIENT_ID}
        buttonStyle={{ size: ICON_SIZE, styles: styles.button }}
        onPress={async () =>
          GoogleLoginFunction()
            .then((user) => console.log(user))
            .catch((error) => console.log(error))
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: "80%",
    backgroundColor: "#0C0D0D",
    alignItems: "center",
  },
})

export default UnAuthContent
