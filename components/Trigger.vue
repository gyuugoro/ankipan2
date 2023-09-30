<template>
  <div>
    <div class="columns is-mobile is-vcentered">
      <span class="column is-size-5">{{ name }}</span>
      <button class="button is-rounded is-danger is-light" @click="() => isOpen = !isOpen">{{ isOpen ? '閉じる' : '開く'
      }}</button>
    </div>

    <transition name="books" mode="out-in">
      <div class="block" v-show="isOpen" key="main">

        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: true,
    }
  },
  props: {
    name: String
  }
}
</script>


<style scoped>
.books-enter-active {
  transition: opacity 0.25s ease;
}

.books-enter {
  opacity: 0;
}
</style>