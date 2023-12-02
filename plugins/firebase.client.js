import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.fb_api_key,
  authDomain: process.env.fb_auth_domain,
  projectId: process.env.fb_project_id,
  storageBucket: process.env.fb_storage_bucket,
  messagingSenderId: process.env.fb_messaging_sender_id,
  appId: process.env.fb_app_id,
  measurementId: process.env.fb_measurement_id
};

const app = initializeApp(firebaseConfig);

//RemoteConfig
import { getRemoteConfig } from "firebase/remote-config"
const remoteConfig = getRemoteConfig(app);

remoteConfig.settings = {
  minimumFetchIntervalMillis: 360000
}

remoteConfig.defaultConfig = {
  important_msg: "",
  usual_msg: ""
};

//Auth
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth"
const auth = getAuth(app)
setPersistence(auth, browserLocalPersistence)

//Firestore
import { getFirestore } from "firebase/firestore"

const db = getFirestore(app)

//Storage
import { getStorage } from "firebase/storage"

const storage = getStorage(app);

//Analytics
import { getAnalytics } from "firebase/analytics"
getAnalytics(app)

//Performance
import { getPerformance } from "firebase/performance"
getPerformance(app)
//公開
export {
  auth,
  db,
  storage,
  remoteConfig
}
