//サーバーとのやり取りは全てここで行うこと！

import { auth, db, storage, remoteConfig } from "../plugins/firebase.client"

export const state = () => ({
    books: [],
    my_books: [],
    //booksは最初だけ更新する
    books_loaded: false,
    books_loading: false,
    user: ""
})

export const mutations = {
    set_books(state, data) {
        state.books = data
    },
    set_books_loaded(state) {
        state.books_loaded = true
        state.books_loading = false
    },
    set_books_start(state) {
        state.books_loading = true
    },
    set_my_books(state, data) {
        state.my_books = data
    },
    set_user(state, data) {
        state.user = data
    },
}

export const actions = {
    async created({ dispatch, commit }) {

        await dispatch("on_change_user", ((user) => {
            if (user) {
                if (user.isAnonymous) {
                    commit("set_user", "匿名")
                } else {
                    commit("set_user", "Google")
                }
            } else {
                commit("set_user", "")
            }
        }))
    },
    async get_books({ commit, state }) {
        const time = Date.now()
        console.log("get_books_start")

        if (!state.books_loaded) {


            const { query, where, orderBy, collection, getDocs, disableNetwork, enableNetwork, limit } = await import("firebase/firestore").catch((err) => console.log("ファイアストア関係ファイル読み込みエラー：" + err.message))

            commit("set_books_start")

            //オフライン取得
            disableNetwork(db)
            const q = query(collection(db, "Books"), where("public", "==", true), orderBy("now", "desc"));
            const q_min = query(collection(db, "Books"), where("public", "==", true), orderBy("now", "desc"), limit(10));
            let querySnapshot = await getDocs(q).catch((err) => console.log("オフライン全単語帳取得エラー:" + err.message));
            enableNetwork(db)

            if (querySnapshot.empty) {
                //オフラインがなければオンライン１０こだけ取得
                querySnapshot = await getDocs(q_min).catch((err) => console.log("全単語（１０）取得エラー:" + err.message));
            }

            const data = []
            querySnapshot.forEach((doc) => {
                data.push({
                    name: doc.data().name,
                    id: doc.id
                })
            })
            commit("set_books", data)

            //最新情報を得る
            getDocs(q).catch((err) => console.log("全単語帳取得エラー:" + err.message)).then((querySnapshot2) => {
                const data2 = []
                querySnapshot2.forEach((doc) => {
                    data2.push({
                        name: doc.data().name,
                        id: doc.id
                    })
                })
                commit("set_books", data2)

                console.log("get_books_new_end", querySnapshot2, `Time:${Date.now() - time}`)

                commit("set_books_loaded")
            })

            console.log("get_books_end", querySnapshot, `Time:${Date.now() - time}`)

        } else {
            console.log("get_books_loaded_end", `Time:${Date.now() - time}`)
        }
    },
    async get_my_books({ commit, state }) {
        const time = Date.now()
        console.log("get_mybooks_start")


        if (state.user != "") {

            const { query, where, orderBy, collection, getDocs, disableNetwork, enableNetwork } = await import("firebase/firestore").catch((err) => console.log("ファイアストア関係ファイル読み込みエラー：" + err.message))

            //オフライン取得
            disableNetwork(db)
            const q = query(collection(db, "Books"), where("creator", "==", auth.currentUser.uid), orderBy("now", "desc"));
            let querySnapshot = await getDocs(q).catch((err) => console.log("オフライン自分用単語帳取得エラー:" + err.message));
            enableNetwork(db)

            const data = []
            querySnapshot.forEach((doc) => {
                data.push({
                    name: doc.data().name,
                    id: doc.id,
                    is_public: doc.data().public
                })
            })
            commit("set_my_books", data)

            const querySnapshot2 = await getDocs(q).catch((err) => console.log("自分用単語帳取得エラー:" + err.message))
            const data2 = []
            querySnapshot2.forEach((doc) => {
                data2.push({
                    name: doc.data().name,
                    id: doc.id,
                    is_public: doc.data().public
                })
            })
            commit("set_my_books", data2)

            console.log("get_mybooks_end", querySnapshot, `Time:${Date.now() - time}`)


        } else {
            commit("set_my_books", [])
            console.log("get_mybooks_end_nologin", `Time:${Date.now() - time}`)
        }
    },
    async load_my_books({ commit }) {
        commit("set_my_books_load")
    },
    async get_book_id(context, id) {
        const time = Date.now()
        console.log("get_book_id_start", id)


        const { doc, getDoc, disableNetwork, enableNetwork } = await import("firebase/firestore").catch((err) => console.log("ファイアストア関係ファイル読み込みエラー：" + err.message))


        const docRef = doc(db, "Books", id);

        disableNetwork(db)
        let docSnap = await getDoc(docRef).catch((err) => console.log("オフラインid単語帳取得エラー:" + err.message));
        enableNetwork(db)

        if (!docSnap) {
            console.log("id単語取得キャッシュ不在")
            docSnap = await getDoc(docRef).catch((err) => console.log("id単語帳取得エラー:" + err.message));
        } else {
            getDoc(docRef).catch((err) => console.log("id単語帳取得エラー:" + err.message));
        }


        if (docSnap.exists()) {
            console.log("get_book_id_end", docSnap.data(), `Time:${Date.now() - time}`)
            return docSnap.data()
        }
    },
    async get_msg() {
        const time = Date.now()

        console.log("get_config_start")

        const { fetchAndActivate, getValue } = await import("firebase/remote-config").catch((err) => console.log("リモートコンフィグ関係ファイル読み込みエラー：" + err.message))


        await fetchAndActivate(remoteConfig).catch((err) => console.log("コンフィグ取得エラー:" + err.message))

        const important_msg = getValue(remoteConfig, "important_msg")
        const msg = getValue(remoteConfig, "usual_msg")

        console.log("get_config_end", [msg.asString(), important_msg.asString()], `Time:${Date.now() - time}`)

        return [msg.asString(), important_msg.asString()]
    },
    async on_change_user(context, play) {
        const time = Date.now()
        console.log("on_sign_in_start")

        const { onAuthStateChanged } = await import("firebase/auth").catch((err) => console.log("オース関係ファイル読み込みエラー：" + err.message))

        onAuthStateChanged(auth, (user) => {
            console.log("認証状態更新", user)
            play(user)
        })

        console.log("on_sign_in_end", `Time:${Date.now() - time}`)
    },
    async change_all({ dispatch }, [id, question, answer, name, description, secret, img]) {
        const time = Date.now()
        console.log("change_all_start", id, question, answer, name, description, secret, img)

        if (auth.currentUser) {
            const { doc, addDoc, collection, getDoc, updateDoc } = await import("firebase/firestore").catch((err) => console.log("ファイアストア関係ファイル読み込みエラー：" + err.message))

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

                await dispatch("get_my_books")

                console.log("change_all_end_create", doc.id, `Time:${Date.now() - time}`)
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

                await dispatch("get_my_books")

                console.log("get_change_all_end_update", id, `Time:${Date.now() - time}`)
                return id
            }
        }
    },
    async change_public({ dispatch }, [id, is_public]) {
        const time = Date.now()
        console.log("change_public_start", id, is_public)

        const { doc, getDoc, updateDoc } = await import("firebase/firestore").catch((err) => console.log("ファイアストア関係ファイル読み込みエラー：" + err.message))


        const docSnap = await getDoc(doc(db, "Books", id)).catch((err) => console.log("公開非公開変更予定の単語帳取得エラー:" + err.message))

        if (docSnap.exists()) {
            await updateDoc(doc(db, "Books", id), {
                public: is_public,
            }).catch((err) => console.log("公開非公開変更エラー:" + err.message))
        }

        await dispatch("get_my_books")

        console.log("change_public_end", `Time:${Date.now() - time}`)
    },
    //Auth
    async sign_in_anonymously() {
        const time = Date.now()
        console.log("sign_in_anonymously_start")

        const { signInAnonymously } = await import("firebase/auth").catch((err) => console.log("オース関係ファイル読み込みエラー：" + err.message))

        await signInAnonymously(auth).catch((err) => console.log("匿名サインインエラー:" + err.message))

        console.log("sign_in_anonymously_end", `Time:${Date.now() - time}`)
    },
    async sign_in_with_google() {
        const time = Date.now()
        console.log("sign_in_with_google_start")

        const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth").catch((err) => console.log("オース関係ファイル読み込みエラー：" + err.message))

        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider).catch((err) => console.log("Googleサインインエラー:" + err.message))

        console.log("sign_in_with_google_end", `Time:${Date.now() - time}`)
    },
    async sign_out() {
        const time = Date.now()
        console.log("sign_out_start")

        const { signOut } = await import("firebase/auth").catch((err) => console.log("オース関係ファイル読み込みエラー：" + err.message))

        await signOut(auth).catch((err) => console.log("サインアウトエラー:" + err.message))

        console.log("sign_out_end", `Time:${Date.now() - time}`)
    },
    async link_with_google() {
        const time = Date.now()
        console.log("link_with_google_start")

        const { GoogleAuthProvider, linkWithPopup } = await import("firebase/auth").catch((err) => console.log("オース関係ファイル読み込みエラー：" + err.message))


        const provider = new GoogleAuthProvider();
        await linkWithPopup(auth.currentUser, provider).catch((err) => console.log("Googleリンクエラー:" + err.message))

        console.log("link_with_google_end", `Time:${Date.now() - time}`)
    },
    async remove_user() {
        const time = Date.now()
        console.log("remove_user_start")

        if (auth.currentUser) {
            const { deleteUser } = await import("firebase/auth").catch((err) => console.log("オース関係ファイル読み込みエラー：" + err.message))
            await deleteUser(auth.currentUser).catch((err) => console.log("アカウント削除エラー:" + err.message))
        }

        console.log("remove_user_end", `Time:${Date.now() - time}`)
    },
    //Storage
    async upload_img(context, [file, folder]) {
        const time = Date.now()
        console.log("upload_img_start", file, folder)

        const { ref, uploadBytes } = await import("firebase/storage").catch((err) => console.log("ストレージ関係ファイル読み込みエラー：" + err.message))

        const storageRef = ref(storage, `${auth.currentUser.uid}/${folder}`);

        const value = await uploadBytes(storageRef, file).catch((err) => console.log("アップロードエラー:" + err.message))

        console.log("upload_img_end", value, `Time:${Date.now() - time}`)
        return value
    },
    async download_img(context, folder) {
        const time = Date.now()
        console.log("download_img_start", folder)

        const { ref, getDownloadURL } = await import("firebase/storage").catch((err) => console.log("ストレージ関係ファイル読み込みエラー：" + err.message))


        const url = await getDownloadURL(ref(storage, folder)).catch((err) => console.log("ダウンロードエラー:" + err.message))

        console.log("download_img_end", url, `Time:${Date.now() - time}`)
        return url
    }
}