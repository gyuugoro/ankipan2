<template>
  <div>


    <div class="block">
      <h3 class="subtitle is-4">Welcome to</h3>
      <h1 class="title is-1">Ankipan2</h1>
    </div>

    <books key="自作単語帳一覧" name="Made by you" :data="myBooks" />

    <books key="単語帳一覧" name="Public" :data="data" />

    <h3 class="title is-3 has-text-centered">リンク</h3>

    <a href="https://instagram.com/shotaro20060930?igshid=NzZlODBkYWE4Ng==" target="_blank"
      class="button is-rounded is-fullwidth block is-danger is-light is-outlined">Instagram</a>
    <nuxt-link to="/make" class="button is-rounded is-fullwidth block is-success is-light is-outlined">単語帳を作成</nuxt-link>
    <nuxt-link to="/manage" class="button is-rounded is-fullwidth block is-info is-light is-outlined">単語帳を管理</nuxt-link>
    <nuxt-link to="/about" class="block button is-rounded is-fullwidth is-dark is-outlined is-light">このアプリについて</nuxt-link>

  </div>
</template>

<script>
import { get_all, get_mybooks } from '../firebase';

export default {
  data() {
    return {
      data: [],
      myBooks: []
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

    }
  },
}
</script>