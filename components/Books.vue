<template>
  <div class="block" v-show="data.length != 0">

    <trigger :name="name">
      <nuxt-link :to="'/Books/' + v.id" v-for="v in data" :key="v.id"
        class="block button is-rounded is-fullwidth is-success is-inverted">{{
          v.name
        }}</nuxt-link>
    </trigger>

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