<template>
  <div>
    <div class="block is-size-3">{{ title }}</div>


    <div class="block">{{ description }}</div>

    <control>
      <div class="column is-full">
        <button class="button is-fullwidth is-rounded" :class="disabled ? 'is-loading' : ''"
          @click="() => $emit('continue', 0)">続きから</button>
      </div>
      
      <div class="column is-full">
        <button class="button is-fullwidth is-rounded" :class="disabled ? 'is-loading' : ''"
          @click="() => $emit('next', 0)">始める</button>
      </div>

      <share class="column is-full mb-0" />

      <div class="column is-full">
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
    disabled: Boolean,
    continue:Boolean
  },
}
</script>

<style></style>
