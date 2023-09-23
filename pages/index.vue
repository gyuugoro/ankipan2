<template>
  <div>

    <div class="block">
      <div class="is-size-4">Welcome to</div>
      <div class="is-size-1 logo">Ankipan2</div>
    </div>

    <nuxt-link :to="'/Books/' + v.id" v-for="v in data" :key="v.id" class="block button is-rounded is-fullwidth">{{ v.name
    }}</nuxt-link>

    <a href="https://instagram.com/myaaawunder?igshid=YTQwZjQ0NmI0OA=="
      class="button is-rounded is-fullwidth block is-success is-light">製作者と連絡を取る</a>

  </div>
</template>

<script>
import { get_all } from '../firebase';

export default {
  data() {
    return {
      data: []
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
  }
}
</script>

<style scoped>
.logo {
  font-family: 'Russo One', sans-serif;
}
</style>