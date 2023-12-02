//サーバーとのやり取りは全てここで行うこと！

import { auth, db, storage, remoteConfig } from "../plugins/firebase.client"

export const state = () => ({
    books: { id: [], name: [] },
    my_books: { id: [], name: [] },
    user: ""
})

export const mutations = {
    set_books(state, data) {
        state.books = data
    },
    set_mybooks(state, data) {
        state.my_books = data
    },
    set_user(state, user) {
        if (user) {
            if (user.isAnonymous) {
                state.user = "匿名"
            } else {
                state.user = "Google"
            }
        } else {
            state.user = ""
        }
    },
}

export const actions = {
    async created({ dispatch, commit }) {

        dispatch("on_change_user", ((user) => {
            commit("set_user", user)
            dispatch("get_my_books")
        }))

    },
    async get_books({ commit }) {
        const time = Date.now()
        console.log("get_books_start")


        const { doc, getDoc } = await import("firebase/firestore")


        const docRef = doc(db, "Cards", "public");

        const docSnap = await getDoc(docRef).catch((err) => console.log("get_books_取得エラー:" + err.message));

        if (docSnap.exists()) {
            commit("set_books", docSnap.data())
            console.log("get_books_end", docSnap.data(), `Time:${Date.now() - time}`)
        }
    },
    async get_my_books({ commit, state }) {
        const time = Date.now()
        console.log("get_mybooks_start")

        if (state.user == "") {
            commit("set_mybooks", { id: [], name: [] })
            console.log("get_mybooks_nologin_end", `Time:${Date.now() - time}`)
        } else {

            const { doc, getDoc } = await import("firebase/firestore")

            const docRef = doc(db, "Cards", auth.currentUser.uid);

            const docSnap = await getDoc(docRef).catch((err) => console.log("get_mybooks_取得エラー:" + err.message));


            if (docSnap.exists()) {
                commit("set_mybooks", docSnap.data())
                console.log("get_mybooks_end", state.user, docSnap.data(), `Time:${Date.now() - time}`)
            }
        }
    },
    async get_book_id(context, id) {
        const time = Date.now()
        console.log("get_book_id_start", id)


        const { doc, getDoc } = await import("firebase/firestore")


        const docRef = doc(db, "Books", id);

        const docSnap = await getDoc(docRef).catch((err) => console.log("get_book_id_取得エラー" + err.message));

        const docRef2 = doc(db, "Books_info", id);

        const docSnap2 = await getDoc(docRef2).catch((err) => console.log("get_book_id_info_取得エラー" + err.message));


        if (docSnap.exists()) {
            console.log("get_book_id_end", Object.assign(docSnap.data(), docSnap2.data()), `Time:${Date.now() - time}`)
            return Object.assign(docSnap.data(), docSnap2.data())
        }
    },
    async get_msg() {
        const time = Date.now()
        console.log("get_config_start")

        const { fetchAndActivate, getValue } = await import("firebase/remote-config")


        await fetchAndActivate(remoteConfig).catch((err) => console.log("get_config_取得エラー:" + err.message))

        const important_msg = getValue(remoteConfig, "important_msg")
        const msg = getValue(remoteConfig, "usual_msg")

        console.log("get_config_end", [msg.asString(), important_msg.asString()], `Time:${Date.now() - time}`)

        return [msg.asString(), important_msg.asString()]
    },
    async on_change_user(context, play) {
        const time = Date.now()
        console.log("on_change_user_start")

        const { onAuthStateChanged } = await import("firebase/auth")

        onAuthStateChanged(auth, (user) => {
            console.log("on_change_user", user)
            play(user)
        })

        console.log("on_change_user_end", `Time:${Date.now() - time}`)
    },
    async change_all({ state, dispatch }, [id, question, answer, name, description, secret, img]) {
        const time = Date.now()
        console.log("change_all_start", id, question, answer, name, description, secret, img)

        if (state.user == "") {
            console.log("change_all_nologin_end", `Time:${Date.now() - time}`)
        } else {
            const { doc, addDoc, collection, updateDoc } = await import("firebase/firestore")

            if (!id) {
                //作成作業
                const doc = await addDoc(collection(db, "Books"), {
                    question: question,
                    answer: answer,
                    img: img
                }).catch((err) => console.log("change_all_作成エラー:" + err.message))

                const doc2 = await addDoc(collection(db, "Books_info"), {
                    name: (name == "" ? "ナナシノゴンベエ" : name),
                    description: description,
                    secret: secret,
                    creator: auth.currentUser.uid,
                    now: Date.now(),
                    public: false,
                }).catch((err) => console.log("change_all_info_作成エラー:" + err.message))

                await dispatch("set_cards_creator")

                console.log("change_all_end_create", state.user, doc.id, `Time:${Date.now() - time}`)
                return doc.id

            } else {
                //更新作業

                await updateDoc(doc(db, "Books", id), {
                    question: question,
                    answer: answer,
                    img: img
                }).catch((err) => console.log("change_all_更新エラー:" + err.message))

                await updateDoc(doc(db, "Books_info", id), {
                    name: (name == "" ? "ナナシノゴンベエ" : name),
                    description: description,
                    secret: secret,
                    public: false,
                }).catch((err) => console.log("change_all_info_更新エラー:" + err.message))


                await dispatch("set_cards_creator")

                console.log("change_all_end_update", state.user, id, `Time:${Date.now() - time}`)
                return id
            }
        }
    },
    async change_public({ state, dispatch }, [id, is_public]) {
        const time = Date.now()
        console.log("change_public_start", id, is_public)

        if (state.user == "") {
            console.log("change_public_nologin_end", `Time:${Date.now() - time}`)
        } else {
            const { doc, updateDoc } = await import("firebase/firestore")

            await updateDoc(doc(db, "Books_info", id), {
                public: is_public,
            }).catch((err) => console.log("change_public_info_変更エラー:" + err.message))

            await dispatch("set_cards_public")

            console.log("change_public_end", state.user, `Time:${Date.now() - time}`)
        }
    },
    async set_cards_public({ state, dispatch }) {

        const time = Date.now()
        console.log("set_cards_public_start")

        if (state.user == "") {
            console.log("set_cards_public_nologin_end", `Time:${Date.now() - time}`)

        } else {

            const { doc, getDocs, query, where, orderBy, collection, updateDoc } = await import("firebase/firestore")

            const q = query(collection(db, "Books_info"), where("public", "==", true), orderBy("now", "desc"))
            const snapshot = await getDocs(q).catch((err) => console.log("set_cards_public_info_取得エラー:" + err.message))

            const name = []
            const id = []

            snapshot.forEach((doc) => {
                name.push(doc.data().name)
                id.push(doc.id)
            })

            const public_doc = doc(db, "Cards", "public")


            await updateDoc(public_doc, {
                id: id,
                name: name
            }).catch((err) => console.log("set_cards_public_変更エラー:" + err.message))

            await dispatch("get_books")

            console.log("set_cards_public_end", state.user, `Time:${Date.now() - time}`)
        }
    },
    async set_cards_creator({ state, dispatch }) {

        const time = Date.now()
        console.log("set_cards_creator_start")

        if (state.user == "") {
            console.log("set_cards_creator_nologin_end", `Time:${Date.now() - time}`)

        } else {

            const creator = auth.currentUser.uid

            const { doc, getDocs, query, where, orderBy, collection, setDoc, limit } = await import("firebase/firestore")

            const q = query(collection(db, "Books_info"), where("creator", "==", creator), orderBy("now", "desc"))

            const snapshot = await getDocs(q).catch((err) => console.log("set_cards_creator_info_取得エラー:" + err.message))

            const name = []
            const id = []

            snapshot.forEach((doc) => {
                name.push(doc.data().name)
                id.push(doc.id)
            })

            const creator_doc = doc(db, "Cards", creator)


            await setDoc(creator_doc, {
                id: id,
                name: name
            }).catch((err) => console.log("set_cards_creator_変更エラー:" + err.message))


            await dispatch("get_my_books")

            console.log("set_cards_creator_end", state.user, `Time:${Date.now() - time}`)
        }
    },
    //Auth
    async sign_in_anonymously() {
        const time = Date.now()
        console.log("sign_in_anonymously_start")

        const { signInAnonymously } = await import("firebase/auth")

        await signInAnonymously(auth).catch((err) => console.log("sign_in_anonymously_エラー:" + err.message))

        console.log("sign_in_anonymously_end", `Time:${Date.now() - time}`)
    },
    async sign_in_with_google() {
        const time = Date.now()
        console.log("sign_in_with_google_start")

        const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth")

        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider).catch((err) => console.log("sign_in_with_google_エラー:" + err.message))

        console.log("sign_in_with_google_end", `Time:${Date.now() - time}`)
    },
    async sign_out() {
        const time = Date.now()
        console.log("sign_out_start")

        const { signOut } = await import("firebase/auth")

        await signOut(auth).catch((err) => console.log("sign_out_エラー:" + err.message))

        console.log("sign_out_end", `Time:${Date.now() - time}`)
    },
    async link_with_google() {
        const time = Date.now()
        console.log("link_with_google_start")

        const { GoogleAuthProvider, linkWithPopup } = await import("firebase/auth")


        const provider = new GoogleAuthProvider();
        await linkWithPopup(auth.currentUser, provider).catch((err) => console.log("link_with_google_エラー:" + err.message))

        console.log("link_with_google_end", `Time:${Date.now() - time}`)
    },
    async remove_user() {
        const time = Date.now()
        console.log("remove_user_start")

        if (auth.currentUser) {
            const { deleteUser } = await import("firebase/auth")

            await deleteUser(auth.currentUser).catch((err) => console.log("remove_user_エラー:" + err.message))
        }

        console.log("remove_user_end", `Time:${Date.now() - time}`)
    },
    //Storage
    async upload_img({ state }, [file, folder]) {
        const time = Date.now()
        console.log("upload_img_start", file, folder)

        if (state.user == "") {
            console.log("upload_img_nologin_end", `Time:${Date.now() - time}`)
            return null
        } else {
            const { ref, uploadBytes } = await import("firebase/storage")

            const storageRef = ref(storage, `${auth.currentUser.uid}/${folder}`);

            const value = await uploadBytes(storageRef, file).catch((err) => console.log("upload_img_エラー:" + err.message))

            console.log("upload_img_end", state.user, value, `Time:${Date.now() - time}`)
            return value
        }
    },
    async download_img({ state }, folder) {
        const time = Date.now()
        console.log("download_img_start", folder)

        if (state.user == "") {
            console.log("download_img_nologin_end", `Time:${Date.now() - time}`)
            return ""
        } else {
            const { ref, getDownloadURL } = await import("firebase/storage")

            const url = await getDownloadURL(ref(storage, folder)).catch((err) => console.log("upload_img_エラー:" + err.message))

            console.log("download_img_end", state.user, url, `Time:${Date.now() - time}`)
            return url
        }
    }
}