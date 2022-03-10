import React, { FC } from "react"
import { TextStyle, View, ViewStyle, ImageStyle } from "react-native"
import { Text, AutoImage as Image } from "../../components"
import UploadImage from "./UploadImage"

const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
  marginTop: 20,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#FFF",
  padding: 5,
}
const STORE_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 5,
  width: "100%",
}
const IMAGE: ImageStyle = {
  borderRadius: 35,
  height: 65,
  width: 65,
}
const LIST_TEXT: TextStyle = {
  width: "70%",
  fontWeight: "400",
}
const LIST_TITLE: TextStyle = {
  width: "30%",
  fontWeight: "700",
}

export type StoreCardProps = {
  item: any
}

export const StoreCard: FC<StoreCardProps> = ({ item }) => {
  return (
    <View style={LIST_CONTAINER}>
      {/* <Image source={{ uri: item.image }} style={IMAGE} /> */}
      <View style={STORE_CONTAINER}>
        <Text style={LIST_TITLE}>Name</Text>
        <Text style={LIST_TEXT}>{item.name}</Text>
      </View>
      <View style={STORE_CONTAINER}>
        <Text style={LIST_TITLE}>Address</Text>
        <Text style={LIST_TEXT}>{item.address}</Text>
      </View>
      <View style={STORE_CONTAINER}>
        <Text style={LIST_TITLE}>Area</Text>
        <Text style={LIST_TEXT}>{item.area}</Text>
      </View>
      <View style={STORE_CONTAINER}>
        <Text style={LIST_TITLE}>Store type</Text>
        <Text style={LIST_TEXT}>{item.type}</Text>
      </View>
      <View style={STORE_CONTAINER}>
        <Text style={LIST_TITLE}>Route</Text>
        <Text style={LIST_TEXT}>{item.route}</Text>
      </View>
      <View style={STORE_CONTAINER}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={{ height: 100, width: 100 }} />
        ) : null}
      </View>

      <UploadImage uid={item.storeUid} />
    </View>
  )
}

export default StoreCard
