<template>
  <div class="box" ref="title" v-show="data != 0">
    <h3 class="title is-3 has-text-centered">{{ name }}</h3>

    <transition-group name="books" mode="out-in" tag="div" class="block">

      <nuxt-link :to="'/books/?id=' + v.id" v-for="v in (isOpen ? data : data.slice(0, 4))" :key="v.id"
        class="block button is-rounded is-fullwidth is-success is-inverted">{{
          v.name
        }}</nuxt-link>
    </transition-group>


    <button v-show="data.length > 4" key="control button" class="block is-fullwidth button is-rounded" @click="click">{{
      isOpen
      ?
      'CLOSE' : '他' + (data.length - 4) + '件'
    }}</button>

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
      // this.$refs.title.scrollIntoView(true)
    }
  }
}
</script>



<style scoped>
.books-enter-active,
.books-leave-active,
.books-move {
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