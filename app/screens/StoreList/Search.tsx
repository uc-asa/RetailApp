import React, { FC } from "react"
import { observer } from "mobx-react-lite"

import { useStores } from "../../models"
import { TextField } from "../../components"

export const Search: FC = () => {
  const { retailStore } = useStores()

  const handleChange = (value) => {
    retailStore.setSearchText(value)
  }

  return (
    <TextField
      onChangeText={handleChange}
      value={retailStore.searchValue}
      label="Search"
      placeholder="Search"
    />
  )
}

export default observer(Search)
