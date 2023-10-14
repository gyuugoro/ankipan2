//サーバーとのやり取りは全てここで行うこと！

export const state = () => ({
    books: [],
    my_books: [],
    books_level: 0,
    my_books_level: 0,
    user: ""
})

export const mutations = {
    books_level_1(state, data) {
        state.books = data
        state.books_level = 1
    },
    my_books_level_1(state, data) {
        state.my_books = data
        state.my_books_level = 1
    },
    books_level_2(state, data) {
        state.books = data
        state.books_level = 2
    },
    my_books_level_2(state, data) {
        state.my_books = data
        state.my_books_level = 2
    },
    set_user(state, data) {
        state.user = data
    }
}

export const actions = {
    async created({ dispatch, commit, state }) {


        const { on_sign_in } = await import("../firebase").catch((err) => console.log("関係ファイル読み込みエラー", err.message))
        on_sign_in((user) => {
            if (user) {
                if (user.isAnonymous) {
                    commit("set_user", "匿名")
                } else {
                    commit("set_user", "Google")
                }
            } else {
                commit("set_user", "")
            }

            if (state.my_books_level == 1) {
                dispatch("my_books_level_1", true)
            } else if (state.my_books_level == 2) {
                dispatch("my_books_level_2", true)
            }
        })
    },
    async books_level_1({ commit, state }, is_force) {

        if (state.books_level <= 0 || is_force) {

            const { get_all_little, get_all_little_cache } = await import("../firebase").catch((err) => console.log("関係ファイル読み込みエラー", err.message))

            const docs = await get_all_little_cache()

            const data = []
            if (docs) {
                docs.forEach((doc) => {
                    data.push({
                        name: doc.data().name,
                        id: doc.id
                    })
                })
            }
            commit("books_level_1", data)


            get_all_little().then((docs2) => {

                const data2 = []
                if (docs2) {
                    docs2.forEach((doc) => {
                        data2.push({
                            name: doc.data().name,
                            id: doc.id
                        })
                    })
                }

                commit("books_level_1", data2)
            })

        }
    },
    async my_books_level_1({ commit, state }, is_force) {


        if (state.user != "") {


            if (state.my_books_level <= 0 || is_force) {


                const { get_mybooks_little, get_mybooks_little_cache } = await import("../firebase").catch((err) => console.log("関係ファイル読み込みエラー", err.message))
                const docs = await get_mybooks_little_cache()
                const data = []

                if (docs) {

                    docs.forEach((doc) => {
                        data.push({
                            name: doc.data().name,
                            id: doc.id,
                            is_public: doc.data().public
                        })
                    })
                }

                commit("my_books_level_1", data)


                get_mybooks_little().then((docs2) => {
                    const data2 = []
                    if (docs2) {

                        docs2.forEach((doc) => {
                            data2.push({
                                name: doc.data().name,
                                id: doc.id,
                                is_public: doc.data().public
                            })
                        })
                    }
                    commit("my_books_level_1", data2)
                })
            }

        } else {
            commit("my_books_level_1", [])
        }
    },
    async books_level_2({ commit, state }, is_force) {


        if (state.books_level <= 1 || is_force) {


            const { get_all, get_all_cache } = await import("../firebase").catch((err) => console.log("関係ファイル読み込みエラー", err.message))
            const docs = await get_all_cache()
            const data = []

            if (docs) {

                docs.forEach((doc) => {
                    data.push({
                        name: doc.data().name,
                        id: doc.id
                    })
                })
            }

            commit("books_level_2", data)

            get_all().then((docs2) => {
                const data2 = []
                if (docs2) {

                    docs2.forEach((doc) => {
                        data2.push({
                            name: doc.data().name,
                            id: doc.id
                        })
                    })
                }
                commit("books_level_2", data2)
            })

        }
    },
    async my_books_level_2({ commit, state }, is_force) {


        if (state.user != '') {


            if (state.my_books_level <= 1 || is_force) {

                const { get_mybooks, get_mybooks_cache } = await import("../firebase").catch((err) => console.log("関係ファイル読み込みエラー", err.message))
                const docs = await get_mybooks_cache()
                const data = []

                if (docs) {

                    docs.forEach((doc) => {
                        data.push({
                            name: doc.data().name,
                            id: doc.id,
                            is_public: doc.data().public
                        })
                    })
                }
                commit("my_books_level_2", data)

                get_mybooks().then((docs2) => {
                    const data2 = []
                    if (docs2) {

                        docs2.forEach((doc) => {
                            data2.push({
                                name: doc.data().name,
                                id: doc.id,
                                is_public: doc.data().public
                            })
                        })
                    }
                    commit("my_books_level_2", data2)
                })

            }
        } else {
            commit("my_books_level_2", [])
        }
    },
    async get_book_id(context, id) {
        const { get_book_id } = await import("../firebase").catch((err) => console.log("関係ファイル読み込みエラー", err.message))
        return await get_book_id(id)
    },
    async get_msg() {


        const { get_config } = await import("../firebase").catch((err) => console.log("関係ファイル読み込みエラー", err.message))
        const importnat_msg = await get_config("important_msg")
        const msg = await get_config("usual_msg")

        return [msg, importnat_msg]
    },
    async on_change_user({ state }, play) {


        const { on_sign_in } = await import("../firebase").catch((err) => console.log("関係ファイル読み込みエラー", err.message))
        on_sign_in(() => {
            play(state.user)
        })
    },
    async change_all({ dispatch }, [id, question, answer, name, description, secret, img]) {


        const { change_all } = await import("../firebase").catch((err) => console.log("関係ファイル読み込みエラー", err.message))
        const new_id = await change_all(id, [question, answer, name, description, secret, img])
        dispatch("my_books_level_2", true)
        return new_id
    },
    async sign_in_anonymously() {
        const { sign_in_anonymously } = await import("../firebase").catch((err) => console.log("関係ファイル読み込みエラー", err.message))
        await sign_in_anonymously()
    },
    async sign_in_with_google() {
        const { sign_in_with_google } = await import("../firebase").catch((err) => console.log("関係ファイル読み込みエラー", err.message))
        await sign_in_with_google()
    },
    async sign_out() {
        const { sign_out } = await import("../firebase").catch((err) => console.log("関係ファイル読み込みエラー", err.message))
        await sign_out()
    },
    async link_with_google() {
        const { link_with_google } = await import("../firebase").catch((err) => console.log("関係ファイル読み込みエラー", err.message))
        await link_with_google()
    },
    async remove_user() {
        const { remove_user } = await import("../firebase").catch((err) => console.log("関係ファイル読み込みエラー", err.message))
        await remove_user()
    },
    async change_public({ dispatch }, [id, is_public]) {
        const { change_public } = await import("../firebase").catch((err) => console.log("関係ファイル読み込みエラー", err.message))
        await change_public(id, is_public)
        dispatch("my_books_level_2", true)
    },
    async upload_img(context, [file, folder]) {
        const { upload_img } = await import("../firebase").catch((err) => console.log("関係ファイル読み込みエラー", err.message))
        const v = await upload_img(file, folder)
        return v
    },
    async download_img(context, folder) {
        const { download_img } = await import("../firebase").catch((err) => console.log("関係ファイル読み込みエラー", err.message))
        const url = await download_img(folder)
        return url
    }
}