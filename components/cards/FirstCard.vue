<template>
  <div>
    <div class="block is-size-3">{{ title }}</div>


    <div class="block">{{ description }}</div>

    <control>
      <div class="column is-one-third">
        <button class="button is-fullwidth is-rounded" :class="disabled ? 'is-loading' : ''"
          @click="() => $emit('next', 0)">始める</button>
      </div>

      <share class="column is-one-third mb-0" />

      <div class="column is-one-third">
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