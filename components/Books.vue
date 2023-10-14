<template>
  <div class="box" ref="title" v-show="data != 0">
    <h3 class="title is-3 has-text-centered">{{ name }}</h3>

    <transition-group name="books" mode="out-in" tag="div" class="block">
      <div class="block" v-for="v in (!is_open ? data.slice(0, 5) : data)" :key="v.id">
        <nuxt-link :to="'/books/?id=' + v.id" class="button is-rounded is-fullwidth is-success is-inverted">{{
          v.name
        }}</nuxt-link>
      </div>

    </transition-group>
    <div class="block" key="last button" v-if="is_little">
      <button key="control button" class="is-fullwidth button is-rounded" @click="load"
        :class="is_laoding ? 'is-loading' : ''">更に読み込む</button>
    </div>

    <div class="block" key="last button 2" v-else-if="data.length > 5">
      <button key="control button" class="is-fullwidth button is-rounded" @click="click">{{
        is_open
        ?
        '閉じる' : '開く'
      }}</button>
    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      is_open: false,
      is_laoding: false
    }
  },
  props: {
    name: String,
    data: Array,
    is_little: Boolean
  },
  methods: {
    click() {
      this.is_open = !this.is_open
    },
    load() {
      this.$emit("load")
      this.is_laoding = true
      this.is_open = true
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