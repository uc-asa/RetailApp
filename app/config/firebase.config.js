import { firebase } from "@react-native-firebase/database"

export const firebaseConfig = {
  apiKey: "AIzaSyCmO3xcwD6riCd8XhEjiNkKdy8Zkclj12c",
  authDomain: "retails-pulse.firebaseapp.com",
  databaseURL: "https://retails-pulse-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "retails-pulse",
  storageBucket: "retails-pulse.appspot.com",
  messagingSenderId: "669542165505",
  appId: "1:669542165505:web:8534493c7ee53529ec2400",
  measurementId: "G-EYQW3F5W84",
}

export const initializeAppLocal = () => {
  try {
    if (!firebase.apps.length)
    firebase.initializeApp(firebaseConfig)
  } catch {
    console.log();
  }
}
export default firebase
