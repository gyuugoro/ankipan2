import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";
import { collection, doc, getDoc, query, where, getDocs, initializeFirestore, persistentLocalCache, persistentMultipleTabManager, orderBy, updateDoc, addDoc, deleteField } from "firebase/firestore";
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
  await signInAnonymously(auth).catch((err) => console.log("匿名サインインエラー:" + err.message))
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
    await linkWithRedirect(auth.currentUser, provider).catch((err) => console.log("Googleリンクエラー:" + err.message))
  } else {
    await signInWithRedirect(auth, provider).catch((err) => console.log("Googleサインインエラー:" + err.message))
  }
}


//Firestore
const get_book_id = async (id) => {

  const docRef = doc(db, "Books", id);
  const docSnap = await getDoc(docRef).catch((err) => console.log("id単語帳取得エラー:" + err.message));

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    return "ERR"
  }
}

const get_all = async () => {
  const q = query(collection(db, "Books"), where("public", "==", true), orderBy("now", "desc"));
  const querySnapshot = await getDocs(q).catch((err) => console.log("全単語帳取得エラー:" + err.message));

  return querySnapshot
}

const get_mybooks = async () => {

  if (auth.currentUser) {
    const q = query(collection(db, "Books"), where("creator", "==", auth.currentUser.uid), where("public", "==", false), orderBy("now", "desc"));
    const querySnapshot = await getDocs(q).catch((err) => console.log("自分用非公開単語帳取得エラー:" + err.message));


    const q2 = query(collection(db, "Books"), where("creator", "==", auth.currentUser.uid), where("public", "==", true), orderBy("now", "desc"));
    const querySnapshot2 = await getDocs(q2).catch((err) => console.log("自分用公開単語帳取得エラー:" + err.message));

    return [querySnapshot, querySnapshot2]
  }
}

//単語帳を削除する
const remove_book = async (id) => {

  const docSnap = await getDoc(doc(db, "Books", id)).catch((err) => console.log("削除予定の単語帳取得エラー:" + err.message))

  if (docSnap.exists()) {
    await updateDoc(doc(db, "Books", id), {
      public: false,
      creator: "OLD" + docSnap.data().creator
    }).catch((err) => console.log("単語帳削除エラー:" + err.message))
  }
}

//公開、非公開を変更
const change_public = async (id, isPublic) => {

  const docSnap = await getDoc(doc(db, "Books", id)).catch((err) => console.log("公開非公開変更予定の単語帳取得エラー:" + err.message))

  if (docSnap.exists()) {
    await updateDoc(doc(db, "Books", id), {
      public: isPublic,
    }).catch((err) => console.log("公開非公開変更エラー:" + err.message))
  }
}

//単語帳全体を変更
const change_all = async (id, [question, answer, name, description, secret]) => {

  const docSnap = await getDoc(doc(db, "Books", id)).catch((err) => console.log("単語帳内容変更予定の単語帳取得エラー:" + err.message))

  if (docSnap.exists()) {
    await updateDoc(doc(db, "Books", id), {
      question: question,
      answer: answer,
      name: name,
      description: description,
      secret: secret
    }).catch((err) => console.log("単語帳内容変更エラー:" + err.message))
  }
}

const create_book = async ([question, answer, name, description, secret]) => {

  await addDoc(collection(db, "Books"), {
    question: question,
    answer: answer,
    name: name,
    description: description,
    secret: secret,

    creator: auth.currentUser.uid,
    now: Date.now(),
    public: false,
  }).catch((err) => console.log("単語帳作成エラー:" + err.message))
}

//公開
export {
  get_book_id,
  get_all,
  get_mybooks,

  remove_book,
  change_public,
  change_all,
  create_book,

  onSignIn,
  signInGoogle,
  signInAnonymous,
}