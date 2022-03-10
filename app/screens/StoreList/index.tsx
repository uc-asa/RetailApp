import React, { useEffect, FC, useRef } from "react"
import { FlatList, TextStyle, View, ViewStyle, TouchableOpacity, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { Modalize } from "react-native-modalize"

import { Header, Screen, GradientBackground } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import { HEADER, HEADER_TITLE, FULL, CONTAINER } from "../commonStyle"

import StoreCard from "./StoreCard"
import Filter from "./Filter"
import Search from "./Search"

const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}

const BTN_COLOR: TextStyle = {
  color: "#FFF",
}

export const StoreListScreen: FC<any> = (props) => {
  const { navigation } = props
  const goBack = () => navigation.goBack()
  const modalizeRef = useRef<Modalize>(null)

  const { retailStore } = useStores()
  const data = retailStore.storeList || []

  useEffect(() => {
    retailStore.getFilters();
  }, []);

  useEffect(() => {
    async function fetchData() {
      retailStore.getStoreList()
    }
    fetchData()
  }, [
    retailStore.searchValue,
    retailStore.selectedFilter.route,
    retailStore.selectedFilter.area,
    retailStore.selectedFilter.type,
  ])

  const onOpen = () => {
    modalizeRef.current?.open()
  }

  return (
    <View testID="StoreListScreen" style={FULL}>
      <GradientBackground colors={["#422443", "#281b34"]} />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerTx="storeListScreen.title"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <View style={{ flexDirection: "row", alignItems: 'center', paddingHorizontal: 10 }}>
          <View style={FULL}>
            <Search />
          </View>
          <TouchableOpacity onPress={onOpen} style={{ flex: 0.3, alignItems: 'flex-end', paddingRight: 10, }}>
            <Text style={BTN_COLOR}>Filter</Text>
          </TouchableOpacity>
        </View>
        <Filter modalRef={modalizeRef} />
        <FlatList
          contentContainerStyle={FLAT_LIST}
          data={[...data]}
          keyExtractor={(item) => String(item.storeUid)}
          renderItem={({ item }) => <StoreCard item={item} />}
        />
      </Screen>
    </View>
  )
}

export default observer(StoreListScreen)
