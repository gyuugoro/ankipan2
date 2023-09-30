import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";
import { collection, doc, getDoc, query, where, getDocs, initializeFirestore, persistentLocalCache, persistentMultipleTabManager, orderBy } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signInAnonymously, GoogleAuthProvider, signInWithRedirect, linkWithRedirect, setPersistence, browserLocalPersistence } from "firebase/auth"

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

const db = initializeFirestore(app,
  {
    localCache:
      persistentLocalCache(/*settings*/{ tabManager: persistentMultipleTabManager() }),
  });

const analytics = getAnalytics(app);
// const db = getFirestore(app);
const perf = getPerformance(app);
const auth = getAuth(app)
setPersistence(auth, browserLocalPersistence)

//Auth
const signInAnonymous = async () => {
  await signInAnonymously(auth).catch((err) => console.log(err.message))
}

const onSignIn = (play) => {
  play(auth.currentUser)
  onAuthStateChanged(auth, (user) => {
    console.log("認証状態更新")
    play(user)
  })
}

const signInGoogle = async () => {
  const provider = new GoogleAuthProvider();

  if (auth.currentUser) {
    await linkWithRedirect(auth.currentUser, provider).catch((err) => console.log(err.message))
  } else {
    await signInWithRedirect(auth, provider).catch((err) => console.log(err.message))
  }
}


//Firestore
const get_book_id = async (id) => {

  const docRef = doc(db, "Books", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    return "ERR"
  }
}

const get_all = async () => {
  const q = query(collection(db, "Books"), where("public", "==", true), where("creating", "==", false), orderBy("now", "desc"));
  const querySnapshot = await getDocs(q);

  return querySnapshot
}

const get_mybooks = async () => {

  if (auth.currentUser) {
    const q = query(collection(db, "Books"), where("creator", "==", auth.currentUser.uid), where("creating", "==", false), orderBy("now", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot
  } else {
    return null
  }
}

const get_creatings = async () => {

  if (auth.currentUser) {
    const q = query(collection(db, "Books"), where("creator", "==", auth.currentUser.uid), where("creating", "==", true), orderBy("now", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot
  } else {
    return null
  }
}

//公開
export {
  get_book_id,
  get_all,
  get_mybooks,
  get_creatings,

  onSignIn,
  signInGoogle,
  signInAnonymous,
}