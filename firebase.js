import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";

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
getAnalytics(app);
getPerformance(app);

initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider("6LcSR4coAAAAAADWwA5jPaPOVE6uFFllO4f9lyp9"),
  isTokenAutoRefreshEnabled: true
})



//RemoteConfig

import { getRemoteConfig } from "firebase/remote-config"
const remoteConfig = getRemoteConfig(app);

remoteConfig.settings = {
  minimumFetchIntervalMillis: 360000
}

remoteConfig.defaultConfig = {
  "topic": "{}"
};


const get_topic = async () => {

  console.log("get_topic_start")

  const { fetchAndActivate, getValue } = await import("firebase/remote-config").catch((err) => console.log("リモートコンフィグ関係ファイル読み込みエラー：" + err.message))


  await fetchAndActivate(remoteConfig).catch((err) => console.log("トピック取得エラー:" + err.message))

  const v = getValue(remoteConfig, "topic")
  console.log("get_topic_end")
  return v.asString()
}


//Auth
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth"
const auth = getAuth(app)
setPersistence(auth, browserLocalPersistence)

const signInAnonymous = async () => {

  console.log("signInAnonymous_start")

  const { signInAnonymously } = await import("firebase/auth").catch((err) => console.log("オース関係ファイル読み込みエラー：" + err.message))

  await signInAnonymously(auth).catch((err) => console.log("匿名サインインエラー:" + err.message))

  console.log("signInAnonymous_end")
}

const onSignIn = async (play) => {

  console.log("onSignIn_start")

  const { onAuthStateChanged } = await import("firebase/auth").catch((err) => console.log("オース関係ファイル読み込みエラー：" + err.message))


  // play(auth.currentUser)
  onAuthStateChanged(auth, (user) => {
    console.log("認証状態更新", user)
    play(user)
  })

  console.log("onSignIn_end")
}

const signInGoogle = async () => {

  console.log("signInGoogle_start")

  const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth").catch((err) => console.log("オース関係ファイル読み込みエラー：" + err.message))


  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider).catch((err) => console.log("Googleサインインエラー:" + err.message))

  console.log("signInGoogle_end")
}

const linkGoogle = async () => {

  console.log("linkGoogle_start")

  const { GoogleAuthProvider, linkWithRedirect } = await import("firebase/auth").catch((err) => console.log("オース関係ファイル読み込みエラー：" + err.message))


  const provider = new GoogleAuthProvider();
  await linkWithRedirect(auth.currentUser, provider).catch((err) => console.log("Googleリンクエラー:" + err.message))

  console.log("linkGoogle_end")
}

const signOutAll = async () => {

  console.log("signOutAll_start")

  const { signOut } = await import("firebase/auth").catch((err) => console.log("オース関係ファイル読み込みエラー：" + err.message))


  await signOut(auth).catch((err) => console.log("サインアウトエラー:" + err.message))

  console.log("signOutAll_end")

}

const removeUser = async () => {

  console.log("removeUser_start")

  const { deleteUser } = await import("firebase/auth").catch((err) => console.log("オース関係ファイル読み込みエラー：" + err.message))


  if (auth.currentUser) {
    await deleteUser(auth.currentUser).catch((err) => console.log("アカウント削除エラー:" + err.message))
  }

  console.log("removeUser_end")
}


//Firestore
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore"

const db = initializeFirestore(app,
  {
    localCache:
      persistentLocalCache(/*settings*/{ tabManager: persistentMultipleTabManager() }),
  });
// const db = getFirestore(app)


const get_book_id = async (id) => {
  console.log("get_book_id_start")


  const { doc, getDoc } = await import("firebase/firestore").catch((err) => console.log("ファイアストア関係ファイル読み込みエラー：" + err.message))

  const docRef = doc(db, "Books", id);
  const docSnap = await getDoc(docRef).catch((err) => console.log("id単語帳取得エラー:" + err.message));

  if (docSnap.exists()) {
    console.log("get_book_id_start")
    return docSnap.data()
  } else {
    console.log("get_book_id_end_err")
    return "ERR"
  }
}

const get_all = async () => {
  console.log("get_all_start")


  const { query, where, orderBy, collection, getDocs } = await import("firebase/firestore").catch((err) => console.log("ファイアストア関係ファイル読み込みエラー：" + err.message))


  const q = query(collection(db, "Books"), where("public", "==", true), orderBy("now", "desc"));
  const querySnapshot = await getDocs(q).catch((err) => console.log("全単語帳取得エラー:" + err.message));

  console.log("get_all_end")
  return querySnapshot
}

const get_all_little = async () => {
  console.log("get_all_little_start")


  const { query, where, orderBy, collection, getDocs, limit } = await import("firebase/firestore").catch((err) => console.log("ファイアストア関係ファイル読み込みエラー：" + err.message))


  const q = query(collection(db, "Books"), where("public", "==", true), orderBy("now", "desc"), limit(10));
  const querySnapshot = await getDocs(q).catch((err) => console.log("全単語帳取得エラー:" + err.message));

  console.log("get_all_little_end")
  return querySnapshot
}

const get_mybooks = async () => {
  console.log("get_mybooks_start")

  const { query, where, orderBy, getDocs, collection } = await import("firebase/firestore").catch((err) => console.log("ファイアストア関係ファイル読み込みエラー：" + err.message))


  if (auth.currentUser) {
    const q = query(collection(db, "Books"), where("creator", "==", auth.currentUser.uid), orderBy("now", "desc"));
    const querySnapshot = await getDocs(q).catch((err) => console.log("自分用単語帳取得エラー:" + err.message));

    console.log("get_mybooks_end")
    return querySnapshot
  }
}

const get_mybooks_little = async () => {
  console.log("get_mybooks_little_start")

  const { query, where, orderBy, getDocs, collection, limit } = await import("firebase/firestore").catch((err) => console.log("ファイアストア関係ファイル読み込みエラー：" + err.message))


  if (auth.currentUser) {
    const q = query(collection(db, "Books"), where("creator", "==", auth.currentUser.uid), orderBy("now", "desc"), limit(10));
    const querySnapshot = await getDocs(q).catch((err) => console.log("自分用単語帳取得エラー:" + err.message));

    console.log("get_mybooks_little_end")
    return querySnapshot
  }
}

//公開、非公開を変更
const change_public = async (id, isPublic) => {

  console.log("change_public_start")


  const { doc, getDoc, updateDoc } = await import("firebase/firestore").catch((err) => console.log("ファイアストア関係ファイル読み込みエラー：" + err.message))


  const docSnap = await getDoc(doc(db, "Books", id)).catch((err) => console.log("公開非公開変更予定の単語帳取得エラー:" + err.message))

  if (docSnap.exists()) {
    await updateDoc(doc(db, "Books", id), {
      public: isPublic,
    }).catch((err) => console.log("公開非公開変更エラー:" + err.message))
  }

  console.log("change_public_end")
}

//単語帳全体を変更
const change_all = async (id, [question, answer, name, description, secret, img]) => {

  console.log("change_all_start")


  const { doc, addDoc, collection, getDoc, updateDoc } = await import("firebase/firestore").catch((err) => console.log("ファイアストア関係ファイル読み込みエラー：" + err.message))



  if (auth.currentUser) {


    if (!id) {
      //作成作業
      const doc = await addDoc(collection(db, "Books"), {
        question: question,
        answer: answer,
        name: (name == "" ? "ナナシノゴンベエ" : name),
        description: description,
        secret: secret,

        creator: auth.currentUser.uid,
        now: Date.now(),
        public: false,
        img: img
      }).catch((err) => console.log("単語帳作成エラー:" + err.message))

      console.log("change_all_end_create")
      return doc.id


    } else {
      //更新作業
      const docSnap = await getDoc(doc(db, "Books", id)).catch((err) => console.log("単語帳内容変更予定の単語帳取得エラー:" + err.message))

      if (docSnap.exists()) {
        await updateDoc(doc(db, "Books", id), {
          question: question,
          answer: answer,
          name: (name == "" ? "ナナシノゴンベエ" : name),
          description: description,
          secret: secret,
          public: false,
          img: img
        }).catch((err) => console.log("単語帳内容変更エラー:" + err.message))
      }

      console.log("get_change_all_end_update")
      return id
    }
  }
}

//Storage
import { getStorage } from "firebase/storage"

const storage = getStorage(app);


const upload_img = async (file, folder) => {

  console.log("upload_img_start")

  const { ref, uploadBytes } = await import("firebase/storage").catch((err) => console.log("ストレージ関係ファイル読み込みエラー：" + err.message))

  const storageRef = ref(storage, `${auth.currentUser.uid}/${folder}`);

  const value = await uploadBytes(storageRef, file).catch((err) => console.log("アップロードエラー:" + err.message))

  console.log("upload_img_end")

  return value
}

const download_img = async (folder) => {
  console.log("download_img_start")
  const { ref, getDownloadURL } = await import("firebase/storage").catch((err) => console.log("ストレージ関係ファイル読み込みエラー：" + err.message))


  const url = await getDownloadURL(ref(storage, folder)).catch((err) => console.log("ダウンロードエラー:" + err.message))

  console.log("download_img_end")
  return url
}

//公開
export {
  get_book_id,
  get_all,
  get_mybooks,
  get_all_little,
  get_mybooks_little,

  change_public,
  change_all,

  onSignIn,
  signInGoogle,
  linkGoogle,
  signInAnonymous,
  signOutAll,
  removeUser,

  get_topic,

  upload_img,
  download_img
}
