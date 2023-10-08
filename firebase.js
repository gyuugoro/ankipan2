import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";

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
  const { fetchAndActivate, getValue } = await import("firebase/remote-config").catch((err) => console.log("リモートコンフィグ関係ファイル読み込みエラー：" + err.message))


  await fetchAndActivate(remoteConfig).catch((err) => console.log("トピック取得エラー:" + err.message))

  const v = getValue(remoteConfig, "topic")
  return v.asString()
}


//Auth
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth"
const auth = getAuth(app)
setPersistence(auth, browserLocalPersistence)

const signInAnonymous = async () => {

  const { signInAnonymously } = await import("firebase/auth").catch((err) => console.log("オース関係ファイル読み込みエラー：" + err.message))

  await signInAnonymously(auth).catch((err) => console.log("匿名サインインエラー:" + err.message))
}

const onSignIn = async (play) => {

  const { onAuthStateChanged } = await import("firebase/auth").catch((err) => console.log("オース関係ファイル読み込みエラー：" + err.message))


  // play(auth.currentUser)
  onAuthStateChanged(auth, (user) => {
    console.log("認証状態更新", user)
    play(user)
  })
}

const signInGoogle = async () => {

  const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth").catch((err) => console.log("オース関係ファイル読み込みエラー：" + err.message))


  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider).catch((err) => console.log("Googleサインインエラー:" + err.message))
}

const linkGoogle = async () => {

  const { GoogleAuthProvider, linkWithRedirect } = await import("firebase/auth").catch((err) => console.log("オース関係ファイル読み込みエラー：" + err.message))


  const provider = new GoogleAuthProvider();
  await linkWithRedirect(auth.currentUser, provider).catch((err) => console.log("Googleリンクエラー:" + err.message))
}

const signOutAll = async () => {

  const { signOut } = await import("firebase/auth").catch((err) => console.log("オース関係ファイル読み込みエラー：" + err.message))


  await signOut(auth).catch((err) => console.log("サインアウトエラー:" + err.message))

}

const removeUser = async () => {

  const { deleteUser } = await import("firebase/auth").catch((err) => console.log("オース関係ファイル読み込みエラー：" + err.message))


  if (auth.currentUser) {
    await deleteUser(auth.currentUser).catch((err) => console.log("アカウント削除エラー:" + err.message))
  }
}


//Firestore
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore"

const db = initializeFirestore(app,
  {
    localCache:
      persistentLocalCache(/*settings*/{ tabManager: persistentMultipleTabManager() }),
  });


const get_book_id = async (id) => {


  const { doc, getDoc } = await import("firebase/firestore").catch((err) => console.log("ファイアストア関係ファイル読み込みエラー：" + err.message))

  const docRef = doc(db, "Books", id);
  const docSnap = await getDoc(docRef).catch((err) => console.log("id単語帳取得エラー:" + err.message));

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    return "ERR"
  }
}

const get_all = async () => {


  const { query, where, orderBy, collection, getDocs } = await import("firebase/firestore").catch((err) => console.log("ファイアストア関係ファイル読み込みエラー：" + err.message))


  const q = query(collection(db, "Books"), where("public", "==", true), orderBy("now", "desc"));
  const querySnapshot = await getDocs(q).catch((err) => console.log("全単語帳取得エラー:" + err.message));

  return querySnapshot
}

const get_mybooks = async () => {


  const { query, where, orderBy, getDocs, collection } = await import("firebase/firestore").catch((err) => console.log("ファイアストア関係ファイル読み込みエラー：" + err.message))


  if (auth.currentUser) {
    const q = query(collection(db, "Books"), where("creator", "==", auth.currentUser.uid), orderBy("now", "desc"));
    const querySnapshot = await getDocs(q).catch((err) => console.log("自分用単語帳取得エラー:" + err.message));

    return querySnapshot
  }
}

//公開、非公開を変更
const change_public = async (id, isPublic) => {


  const { doc, getDoc, updateDoc } = await import("firebase/firestore").catch((err) => console.log("ファイアストア関係ファイル読み込みエラー：" + err.message))


  const docSnap = await getDoc(doc(db, "Books", id)).catch((err) => console.log("公開非公開変更予定の単語帳取得エラー:" + err.message))

  if (docSnap.exists()) {
    await updateDoc(doc(db, "Books", id), {
      public: isPublic,
    }).catch((err) => console.log("公開非公開変更エラー:" + err.message))
  }
}

//単語帳全体を変更
const change_all = async (id, [question, answer, name, description, secret, img]) => {


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

      return id
    }
  }
}

//Storage
import { getStorage } from "firebase/storage"

const storage = getStorage(app);


const upload_img = async (file, folder) => {

  const { ref, uploadBytes } = await import("firebase/storage").catch((err) => console.log("ストレージ関係ファイル読み込みエラー：" + err.message))

  const storageRef = ref(storage, `${auth.currentUser.uid}/${folder}`);

  const value = await uploadBytes(storageRef, file).catch((err) => console.log("アップロードエラー:" + err.message))

  return value
}

const download_img = async (folder) => {

  const { ref, getDownloadURL } = await import("firebase/storage").catch((err) => console.log("ストレージ関係ファイル読み込みエラー：" + err.message))


  const url = await getDownloadURL(ref(storage, folder)).catch((err) => console.log("ダウンロードエラー:" + err.message))

  return url
}

//公開
export {
  get_book_id,
  get_all,
  get_mybooks,

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
