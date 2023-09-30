<template>
  <div>
    <div class="block is-size-3">お疲れ様！</div>
    <div class="blcok is-size-4" v-show="allconp">オールコンプリート！おめでとう！</div>

    <img class="block" src="../../assets/undraw_completed_03xt.svg" alt="">

    <control>
      <div class="column is-half">
        <nuxt-link to="/" class="button is-fullwidth is-rounded　is-black">ホームに戻る</nuxt-link>
      </div>
      <div class="column is-half">
        <button :disabled="allconp" class="button is-fullwidth is-rounded" @click="() => $emit('next', 0)">間違い確認</button>
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