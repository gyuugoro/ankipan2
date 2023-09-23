import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getPerformance } from "firebase/performance";
import { collection, doc, getDoc, query, where, getDocs, initializeFirestore, persistentLocalCache, persistentMultipleTabManager, CACHE_SIZE_UNLIMITED, addDoc, orderBy } from "firebase/firestore";

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

initializeFirestore(app,
  {
    localCache:
      persistentLocalCache(/*settings*/{ tabManager: persistentMultipleTabManager() })
  });

const analytics = getAnalytics(app);
const db = getFirestore(app);
const perf = getPerformance(app);


const get_book_id = async (id) => {

  const docRef = doc(db, "Books", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    return "ERR"
  }
}

const add_book = async (data) => {
  const ref = await addDoc(collection(db, "Books"), data)
  return ref.id
}

const get_all = async () => {
  const q = query(collection(db, "Books"), where("public", "==", true), orderBy("now"));

  const querySnapshot = await getDocs(q);

  return querySnapshot
}

export {
  get_book_id,
  add_book,
  get_all
}