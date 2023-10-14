//サーバーとのやり取りは全てここで行うこと！

import { get_all, get_mybooks, get_all_little, get_mybooks_little, get_book_id, get_config, on_sign_in, change_all, sign_in_anonymously, sign_in_with_google, sign_out, link_with_google, remove_user, change_public, download_img, upload_img } from '../firebase';

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
    created({ dispatch, commit, state }) {
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


            const docs = await get_all_little()
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


        }
    },
    async my_books_level_1({ commit, state }, is_force) {

        if (state.my_books_level <= 0 || is_force) {


            const docs = await get_mybooks_little()
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

        }
    },
    async books_level_2({ commit, state }, is_force) {

        if (state.books_level <= 1 || is_force) {


            const docs = await get_all()
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

        }
    },
    async my_books_level_2({ commit, state }, is_force) {

        if (state.my_books_level <= 1 || is_force) {

            const docs = await get_mybooks()
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


        }
    },
    async get_book_id(context, id) {
        return await get_book_id(id)
    },
    async get_msg() {
        const importnat_msg = await get_config("important_msg")
        const msg = await get_config("usual_msg")

        return [msg, importnat_msg]
    },
    on_change_user({ state }, play) {
        on_sign_in(() => {
            play(state.user)
        })
    },
    async change_all({ dispatch }, [id, question, answer, name, description, secret, img]) {
        const new_id = await change_all(id, [question, answer, name, description, secret, img])
        dispatch("my_books_level_2", true)
        return new_id
    },
    async sign_in_anonymously() {
        await sign_in_anonymously()
    },
    async sign_in_with_google() {
        await sign_in_with_google()
    },
    async sign_out() {
        await sign_out()
    },
    async link_with_google() {
        await link_with_google()
    },
    async remove_user() {
        await remove_user()
    },
    async change_public({ dispatch }, [id, is_public]) {
        await change_public(id, is_public)
        dispatch("my_books_level_2", true)
    },
    async upload_img(context, [file, folder]) {
        const v = await upload_img(file, folder)
        return v
    },
    async download_img(context, folder) {
        const url = await download_img(folder)
        return url
    }
}