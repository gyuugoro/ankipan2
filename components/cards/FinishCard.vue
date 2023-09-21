<template>
  <div>
    <div class="block is-size-3">お疲れ様！</div>

    <img class="block" src="../../assets/undraw_completed_03xt.svg" alt="">

    <control>
      <div class="column is-half">
        <nuxt-link to="/" class="button is-fullwidth is-rounded" @click="() => $emit('next', 0)">ホームに戻る</nuxt-link>
      </div>
      <div class="column is-half">
        <button class="button is-fullwidth is-rounded" @click="() => $emit('next', 0)">間違い確認</button>
      </div>
    </control>

  </div>
</template>

<script>
export default {
  props: {
  }
}
</script>

<style></style>