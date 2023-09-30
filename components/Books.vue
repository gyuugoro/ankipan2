<template>
  <div class="block" v-show="data.length != 0">

    <div class=" block has-text-centered" key="一覧">{{ name }}</div>

    <button class="block button is-rounded is-fullwidth is-ghost" @click="() => isOpen = !isOpen">{{ isOpen ? '閉じる' : '開く'
    }}</button>

    <transition name="books" mode="out-in">

      <div class="block" v-show="isOpen">

        <nuxt-link :to="'/Books/' + v.id" v-for="v in data" :key="v.id" class="block button is-rounded is-fullwidth">{{
          v.name
        }}</nuxt-link>
      </div>

    </transition>

  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    name: String
  },
  data() {
    return {
      isOpen: true
    }
  }
}
</script>

<style scoped>
.books-enter-active,
.books-leave-active {
  transition: opacity 0.5s ease;
}

.books-enter,
.books-leave-to {
  opacity: 0;
}

.books-leave-active {
  position: absolute;
  width: 100%;
}
</style>