<template>
  <div class="box" ref="title" v-show="data != 0">
    <h3 class="title is-3 has-text-centered">{{ name }}</h3>

    <transition-group name="books" mode="out-in" tag="div" class="block">
      <div class="block" v-for="v in (!isOpen ? data.slice(0, 5) : data)" :key="v.id">
        <nuxt-link :to="'/books/?id=' + v.id" class="button is-rounded is-fullwidth is-success is-inverted">{{
          v.name
        }}</nuxt-link>
      </div>


      <div class="block" key="last button" v-if="data.length > 5">
        <button key="control button" class="is-fullwidth button is-rounded" @click="click">{{
          isOpen
          ?
          '閉じる' : '開く'
        }}</button>
      </div>
    </transition-group>


  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  props: {
    name: String,
    data: Array,
  },
  methods: {
    click() {
      this.isOpen = !this.isOpen
    }
  },
}
</script>



<style scoped>
.books-enter-active,
.books-leave-active {
  transition: all 0.25s ease;
}

.books-enter {
  opacity: 0;
  transform: translateX(20px);
}

.books-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>