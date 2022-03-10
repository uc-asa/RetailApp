import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import firestore from "@react-native-firebase/firestore"
import storage from "@react-native-firebase/storage"

const getData = ({ username, password }) => {
  return new Promise((resolve) => {
    firestore()
      .collection("users")
      .where("username", "==", username)
      .where("password", "==", password)
      .get()
      .then((querySnapshot) => {
        const data = {}
        querySnapshot.forEach((documentSnapshot) => {
          data[documentSnapshot.id] = documentSnapshot.data()
        })
        resolve(data)
      })
      .catch((error) => {
        console.log("Error: Getting document:", error)
        resolve({})
      })
  })
}

const getStore = (reference) => {
  return new Promise((resolve) => {
    reference.get().then((querySnapshot) => {
      const data = {}
      querySnapshot.forEach((documentSnapshot) => {
        data[documentSnapshot.id] = documentSnapshot.data()
      })
      resolve(data)
    })
  })
}

const getFilters = (reference) => {
  return new Promise((resolve) => {
    reference
      .get()
      .then((querySnapshot) => {
        const data = {
          route: [],
          area: [],
          type: [],
        }
        querySnapshot.forEach((documentSnapshot) => {
          const values = documentSnapshot.data()

          data.route.push(values?.route)
          data.area.push(values?.area)
          data.type.push(values?.type)
        })

        // creating unique value
        data.area = [...new Set(data.area)]
        data.route = [...new Set(data.route)]
        data.type = [...new Set(data.type)]

        resolve(data)
      })
      .catch((err) => {
        console.log(err, "errerr")
      })
  })
}

const StoreItem = types.model({
  type: "",
  name: "",
  route: "",
  area: "",
  address: "",
  storeUid: "",
  imageUrl: "",
  visitTime: 0,
})

const SelectedFilterItems = types.model({
  route: types.optional(types.array(types.string), []),
  type: "",
  area: "",
})

const FilterItems = types.model({
  route: types.optional(types.array(types.string), []),
  type: types.optional(types.array(types.string), []),
  area: types.optional(types.array(types.string), []),
})

const uploadImage = async (assets) => {
  const spiltPath = assets.split("/")
  const imageName = spiltPath[spiltPath.length - 1]
  const reference = storage().ref(`images/${imageName}`)
  const data = await reference.putFile(assets)
  const downloadURL = await storage().ref(data.metadata.fullPath).getDownloadURL()
  return downloadURL
}

export const RetailStoreModel = types
  .model("RetailStore")
  .props({
    searchValue: "",
    storeList: types.optional(types.array(StoreItem), []),
    selectedFilter: types.optional(SelectedFilterItems, {}),
    username: "",
    password: "",
    name: "",
    stores: types.optional(types.array(types.string), []),
    filterList: types.optional(FilterItems, {}),
  })
  .actions((self) => ({
    setSearchText: (value) => {
      self.searchValue = value
    },
    updateFilter: ({ route, area, type }: any) => {
      if (route) {
        const routes = self.selectedFilter.route || []
        const index = routes.indexOf(route)
        // Removing element if already there
        if (index > -1) {
          routes.splice(index, 1)
        } else {
          routes.push(route)
        }
        self.selectedFilter.route = [...new Set(routes)] as any
      }
      if (type) {
        self.selectedFilter.type = type
      }
      if (area) {
        self.selectedFilter.area = area
      }
    },
    getUserDetails: flow(function* ({ username, password }) {
      const data = yield getData({
        password,
        username,
      })
      const [details] = (Object.values(data) as unknown) as any

      if (details) {
        self.username = details.username
        self.password = details.password
        self.name = details.name
        self.stores = details.stores
        const blank: any = []
        self.storeList = blank
        self.selectedFilter = {
          route: blank,
          area: "",
          type: "",
        }
        self.searchValue = ""
      }
      return details
    }),
    updateImage: flow(function* (img: any, uid: string) {
      const url = yield uploadImage(img)
      const updatedDoc = firestore()
        .collection("stores")
        .doc(uid)
        .update({ imageUrl: url, visitTime: new Date().getTime() })
        .then()

      return updatedDoc
    }),
    getStoreList: flow(function* () {
      let ref = firestore().collection("stores").limit(1000)

      if (self.selectedFilter.route?.length) {
        ref = ref.where("route", "in", self.selectedFilter.route)
      }

      if (self.selectedFilter.area) {
        ref = ref.where("area", "==", self.selectedFilter.area)
      }

      if (self.selectedFilter.type) {
        ref = ref.where("type", "==", self.selectedFilter.type)
      }

      if (self.searchValue) {
        ref = ref.where("name", ">=", self.searchValue).where("name", "<", self.searchValue + "z")
      }

      const list = yield getStore(ref)

      if (list) {
        const map: any = []
        for (let i in list) {
          const item = list[i]

          if (self.stores.indexOf(i) > -1) {
            map.push(
              StoreItem.create({
                ...item,
                storeUid: i,
              }),
            )
          }
        }
        self.storeList = map
      }
    }),
    getFilters: flow(function* () {
      const ref = firestore().collection("stores").orderBy("name")
      const list = yield getFilters(ref)
      self.filterList = list
    }),
  }))

type RetailStoreType = Instance<typeof RetailStoreModel>
export interface RetailStore extends RetailStoreType {}
type RetailStoreSnapshotType = SnapshotOut<typeof RetailStoreModel>
export interface RetailStoreSnapshot extends RetailStoreSnapshotType {}
export const createRetailStoreDefaultModel = () => types.optional(RetailStoreModel, {})
