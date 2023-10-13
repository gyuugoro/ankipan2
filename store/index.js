import { get_all, get_mybooks, get_all_little, get_mybooks_little } from '../firebase';

export const state = () => ({
    books: [],
    myBooks:[],
    loading:0
})

export const mutations = {
    setBooks(state, data){
        state.books = []
        state.books = data
    },
    setMyBooks(state, data){
        state.mybooks = []
        state.mybooks = data
    },
    addProgress(state, num){
        state.loading += num
    }
}

export const actions = {
    async books_little_load({commit, dispatch}){
        const data = await get_all_little()
        commit("setBooks", data)

        commit("addProgress", 1)

        dispatch("books_load")
    },
    async books_load({commit}){
        const data = await get_all()
        commit("setBooks", data)

        commit("addProgress",3)
    },
    async mybooks_little_load({commit, dispatch}){
        const data = await get_mybooks()
        commit("setMyBooks", data)

        commit("addProgress", 1)

        dispatch("mybooks_load")
    },
    async mybooks_load({commit}){
        const data = await get_mybooks_little()
        commit("setMyBooks", data)

        commit("addProgress", 2)
    },
    async load({dispatch}){
        dispatch("mybooks_little_load")
        dispatch("books_little_load")
    }
}