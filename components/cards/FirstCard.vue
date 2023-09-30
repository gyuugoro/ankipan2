<template>
  <div>
    <div class="block is-size-3">{{ title }}</div>

    <div class="block">{{ description }}</div>

    <img class="block" src="../../assets/undraw_flying_drone_u3r2.svg" alt="">



    <control>
      <div class="column is-half">
        <button class="button is-fullwidth is-rounded" :class="disabled ? 'is-loading' : ''"
          @click="() => $emit('next', 0)">始める</button>
      </div>
      <div class="column is-half">
        <nuxt-link to="/" class="button is-fullwidth is-rounded is-black">ホームに戻る</nuxt-link>
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
}
</script>

<style></style>