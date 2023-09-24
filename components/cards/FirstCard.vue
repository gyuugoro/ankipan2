<template>
  <div>
    <div class="block is-size-3">{{ title }}</div>

    <div class="block">{{ description }}</div>

    <img class="block" src="../../assets/undraw_flying_drone_u3r2.svg" alt="">



    <control>
      <div class="column is-one-third">
        <button v-if="favorited" class="button is-fullwidth is-rounded is-warning" @click="remove_favorite"
          :disabled="this.$route.params.bookid == 'continue'">
          お気に入り解除
        </button>
        <button v-else class="button is-fullwidth is-rounded is-warning is-light is-outlined" @click="add_favorite"
          :disabled="this.$route.params.bookid == 'continue'">
          お気に入り登録
        </button>
      </div>
      <div class="column is-one-third">
        <button class="button is-fullwidth is-rounded" :class="disabled ? 'is-loading' : ''"
          @click="() => $emit('next', 0)">始める</button>
      </div>
      <div class="column is-one-third">
        <nuxt-link to="/" class="button is-fullwidth is-rounded">ホームに戻る</nuxt-link>
      </div>

    </control>

  </div>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    disabled: Boolean
  },
  data() {
    return {
      favorited: false,
      favorites: {}
    }
  },
  mounted() {
    if (localStorage.getItem("favorites") === null) {
      localStorage.setItem("favorites", JSON.stringify({}))
    }

    this.favorites = JSON.parse(localStorage.getItem("favorites"))

    if (this.favorites[this.$route.params.bookid]) {
      this.favorited = true
    } else {
      this.favorited = false
    }
  },
  methods: {
    add_favorite() {
      this.favorites[this.$route.params.bookid] = this.title

      localStorage.setItem("favorites", JSON.stringify(this.favorites))

      if (this.favorites[this.$route.params.bookid]) {
        this.favorited = true
      } else {
        this.favorited = false
      }
    },
    remove_favorite() {
      delete this.favorites[this.$route.params.bookid]

      localStorage.setItem("favorites", JSON.stringify(this.favorites))

      if (this.favorites[this.$route.params.bookid]) {
        this.favorited = true
      } else {
        this.favorited = false
      }
    }
  }
}
</script>

<style></style>