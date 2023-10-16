<template>
  <div class="box" ref="title" v-show="data != 0">
    <h3 class="title is-3 has-text-centered">{{ name }}</h3>

    <transition-group name="books" mode="out-in" tag="div" class="block">
      <div class="block" v-for="(v, i) in (!is_open ? data.id.slice(0, 10) : data.id)" :key="v">
        <nuxt-link :to="'/books/?id=' + v" class="button is-rounded is-fullwidth is-success is-inverted">{{
          data.name[i]
        }}</nuxt-link>
      </div>

    </transition-group>

    <div class="block" key="last button 2" v-if="data.id.length > 10">
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
    }
  },
  props: {
    name: String,
    data: Object,
  },
  methods: {
    click() {
      this.is_open = !this.is_open
    },
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