import React, { FC } from "react"
import { View, Text, ViewStyle, TextStyle } from "react-native"
import { Modalize } from "react-native-modalize"
import { observer } from "mobx-react-lite"

import { useStores } from "../../models"

const CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
  marginTop: 20,
  borderRadius: 10,
  padding: 5,
}

const CONTAINER_OPT: ViewStyle = {
  flexDirection: "row",
  width: "100%",
  padding: 5,
}

const BTN_OPT: TextStyle = {
  color: "#ccc",
  padding: 5,
  borderWidth: 1,
  marginLeft: 10,
  borderColor: "#000",
}
const BTN_OPT_SELECTED: TextStyle = {
  color: "#FFF",
  borderColor: "#422443",
  backgroundColor: "#422443",
}
const BTN_COLOR: TextStyle = {
  color: "#000",
}

// we can get these options from firebase response as well

export type FilterOptions = {
  modalRef: any
}

export const FilterOptions: FC<FilterOptions> = ({ modalRef }) => {
  const { retailStore } = useStores()
  const {
    filterList: { area, type: storeType, route: routes },
    selectedFilter,
  } = retailStore
  const closeModal = () => {
    modalRef.current?.close()
  }

  const handleRoute = (value: string) => {
    retailStore.updateFilter({
      route: value,
    })
  }

  const handleArea = (value: string) => {
    retailStore.updateFilter({
      area: value,
    })
  }

  const handleType = (value: string) => {
    retailStore.updateFilter({
      type: value,
    })
  }

  const filterModal = () => {
    return (
      <View>
        <View>
          <Text style={BTN_COLOR}>Route</Text>
          <View style={CONTAINER_OPT}>
            {routes?.map((item) => {
              const isSelected = selectedFilter.route.indexOf(item) > -1;
              return (
                <Text
                  style={[
                    BTN_OPT,
                    isSelected ? BTN_OPT_SELECTED : null,
                  ]}
                  key={item}
                  onPress={() => handleRoute(item)}
                >
                  {item}
                </Text>
              )
            })}
          </View>
        </View>
        <View>
          <Text style={BTN_COLOR}>Area</Text>
          <View style={CONTAINER_OPT}>
            {area?.map((item) => {
              return (
                <Text
                  style={[BTN_OPT, item === selectedFilter.area ? BTN_OPT_SELECTED : null]}
                  key={item}
                  onPress={() => handleArea(item)}
                >
                  {item}
                </Text>
              )
            })}
          </View>
        </View>
        <View>
          <Text style={BTN_COLOR}>Type</Text>
          <View style={CONTAINER_OPT}>
            {storeType?.map((item) => {
              return (
                <Text
                  style={[BTN_OPT, item === selectedFilter.type ? BTN_OPT_SELECTED : null]}
                  key={item}
                  onPress={() => handleType(item)}
                >
                  {item}
                </Text>
              )
            })}
          </View>
        </View>
      </View>
    )
  }

  return (
    <Modalize ref={modalRef} modalHeight={500}>
      <View style={CONTAINER}>
        <Text onPress={closeModal}>Close</Text>
        {filterModal()}
      </View>
    </Modalize>
  )
}

export default observer(FilterOptions)
