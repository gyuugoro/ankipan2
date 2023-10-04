<template>
  <div>


    <div class="block">
      <h3 class="subtitle is-4">Welcome to</h3>
      <h1 class="title is-1">Ankipan2</h1>
    </div>

    <transition name="books" tag="div" class="block" mode="out-in">

    <h3 key="ローディング" v-if="loading" class="title is-3 has-text-centered block">Loading</h3>

    <div v-else class="block">


    <books key="自作単語帳一覧" name="You made" :data="myBooks" />

    <books key="単語帳一覧" name="Public" :data="data" />

    </div>

    </transition>

    <h3 class="title is-3 has-text-centered">Links</h3>

    <div class="columns block is-vcentered is-centered is-multiline">

      <div class="column is-7"> <a href="https://instagram.com/shotaro20060930?igshid=NzZlODBkYWE4Ng==" target="_blank"
          class="button is-fullwidth is-rounded is-danger is-light is-outlined">Instagram</a>
      </div>
      <div class="column is-7"> <nuxt-link to="/make"
          class="button is-fullwidth is-rounded is-success is-light is-outlined">単語帳を作成</nuxt-link>
      </div>
      <div class="column is-7"> <nuxt-link to="/manage"
          class="button is-fullwidth is-rounded is-info is-light is-outlined">単語帳を管理</nuxt-link>
      </div>
      <div class="column is-7"> <nuxt-link to="/about"
          class="button is-fullwidth is-rounded is-dark is-outlined is-light">このアプリについて</nuxt-link>
      </div>

    </div>
  </div>
</template>

<script>
import { get_all, get_mybooks } from '../firebase';

export default {
  data() {
    return {
      data: [],
      myBooks: [],
      loading:true
    }
  },
  created() {
    this.getdata()
  },
  methods: {
    async getdata() {
      const docs = await get_all()

      if (docs) {
        this.data = []

        docs.forEach((doc) => {
          this.data.push({
            name: doc.data().name,
            id: doc.id
          })
        })
      }


      const mydocs = await get_mybooks()

      if (mydocs) {
        this.myBooks = []

        mydocs.forEach((doc) => {
          this.myBooks.push({
            name: doc.data().name,
            id: doc.id,
            isPublic: doc.public
          })
        })
      }

      this.loading = false

    }
  },
}
</script>

<style scoped>
.books-enter-active,
.books-leave-active{
  transition: all 0.25s ease;
}

.books-leave-to{
  transform:translateX(-20px);
  opacity:0;
}

.books-enter{
  transform:scaleX(0px);
}
</style>