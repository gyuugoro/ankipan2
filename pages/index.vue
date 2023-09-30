<template>
  <div>

    <div class="block">
      <div class="is-size-4">Welcome to</div>
      <div class="is-size-1 logo">Ankipan2</div>
    </div>

    <div class="block">
      <books name="自作単語帳一覧" :data="mydata" />

      <books name="単語帳一覧" :data="data" />

      <nuxt-link key="about" to="/about" class="block button is-rounded is-fullwidth mt-6">このアプリについて</nuxt-link>
    </div>




  </div>
</template>

<script>
import { get_all, get_mybooks } from '../firebase';

export default {
  data() {
    return {
      data: [],
      mydata: []
    }
  },
  created() {
    (() => this.getdata())()
  },
  methods: {
    async getdata() {
      const docs = await get_all()
      docs.forEach((doc) => {
        this.data.push({
          name: doc.data().name,
          id: doc.id
        })
      })


      const mydocs = await get_mybooks()
      mydocs.forEach((doc) => {
        this.mydata.push({
          name: doc.data().name,
          id: doc.id
        })
      })

    }
  },
}
</script>

<style scoped>
.logo {
  font-family: 'Russo One', sans-serif;
}
</style>