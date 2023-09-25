<template>
  <div>

    <div class="block">
      <div class="is-size-4">Welcome to</div>
      <div class="is-size-1 logo">Ankipan2</div>
    </div>

    <div class="block">
      <div class="block has-text-centered" key="一覧">単語帳一覧</div>

      <nuxt-link :to="'/Books/' + v.id" v-for="v in data" :key="v.id" class="block button is-rounded is-fullwidth">{{
        v.name
      }}</nuxt-link>

      <nuxt-link key="about" to="/about" class="block button is-rounded is-fullwidth mt-6">このアプリについて</nuxt-link>
    </div>




  </div>
</template>

<script>
import { get_all } from '../firebase';

export default {
  data() {
    return {
      data: [],
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

    }
  },
}
</script>

<style scoped>
.logo {
  font-family: 'Russo One', sans-serif;
}
</style>