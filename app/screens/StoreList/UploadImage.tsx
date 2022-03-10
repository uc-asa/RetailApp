import React, { FC, useState } from "react"
import { StyleSheet, View, Button, Image, Platform, Text } from "react-native"
import { MediaType, launchImageLibrary } from "react-native-image-picker"

import { useStores } from "../../models"

export interface UploadImage {
  uid: string
}
export const App: FC<UploadImage> = ({ uid }) => {
  const { retailStore } = useStores()

  const mediaType: MediaType = "photo"
  const options = {
    maxHeight: 200,
    maxWidth: 200,
    selectionLimit: 0,
    mediaType,
    includeBase64: false,
    // includeExtra,
  }

  const handleClick = async () => {
    const { assets } = await launchImageLibrary(options)
    if (assets?.[0]) {
      uploadImageToStorage(assets[0]?.uri)
    }
  }

  const uploadImageToStorage = async (assets) => {
    await retailStore.updateImage(assets, uid)
    retailStore.getStoreList()
  }

  return (
    <View style={styles.eightyWidthStyle}>
      <Button title={"Upload Image"} onPress={handleClick}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  eightyWidthStyle: {
    width: "80%",
    margin: 2,
  },
})

export default App
