<template>
  <div>
    <div class="block is-size-3">お疲れ様！</div>
    <div class="block is-size-4" v-show="allconp">オールコンプリート！おめでとう！</div>

    <control>
      <div class="column is-full" v-show="!allconp">
        <button class="button is-fullwidth is-rounded" @click="() => $emit('next', 0)">間違い確認</button>
      </div>

      <share class="column is-full mb-0" />

      <div class=" column is-full">
        <nuxt-link to="/" class="button is-fullwidth is-rounded is-black">ホームに戻る</nuxt-link>
      </div>


    </control>

  </div>
</template>

<script>
export default {
  props: {
    allconp: Boolean
  }
}
</script>

<style></style>