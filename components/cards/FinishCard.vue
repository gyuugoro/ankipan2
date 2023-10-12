<template>
  <div>
    <div class="block is-size-3">お疲れ様！</div>
    <div class="block is-size-4" v-show="allconp">オールコンプリート！おめでとう！</div>

    <control>
      <div class="column is-one-third">
        <button :disabled="allconp" class="button is-fullwidth is-rounded" @click="() => $emit('next', 0)">間違い確認</button>
      </div>

      <share class="column is-one-third mb-0" />

      <div class=" column is-one-third">
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