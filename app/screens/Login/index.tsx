import React, { FC, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"

import { Button, Header, Screen, GradientBackground, TextField } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import { HEADER, HEADER_TITLE, FULL, CONTAINER } from "../commonStyle"

const DEMO: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const DEMO_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}

export const LoginScreen: FC<any> = ({ navigation }) => {
  const { retailStore } = useStores()

  const goBack = () => navigation.goBack()
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const handleContinue = async () => {
    const data = await retailStore.getUserDetails({
      password,
      username,
    })

    if (data?.username) {
      navigation.navigate("storeList")
    }
  }

  return (
    <View testID="LoginScreen" style={FULL}>
      <GradientBackground colors={["#422443", "#281b34"]} />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          headerTx="loginScreen.title"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <View>
          <TextField
            onChangeText={(value: string) => setUserName(value)}
            value={username}
            label="Username"
            placeholder="Username"
          />
          <TextField
            onChangeText={(value: string) => setPassword(value)}
            value={password}
            label="Password"
            placeholder="Password"
            secureTextEntry
            blurOnSubmit
            onSubmitEditing={handleContinue}
          />
        </View>
        <Button
          style={DEMO}
          textStyle={DEMO_TEXT}
          tx="loginScreen.continue"
          onPress={handleContinue}
        />
      </Screen>
    </View>
  )
}

export default observer(LoginScreen)
