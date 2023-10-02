<template>
  <div class="notification is-danger is-light">
    <h3 class="is-size-3 block">ERROR</h3>
    <div class="block">申し訳ありませんエラーが発生しました。</div>
    <div class="block">エラーコード：{{ error.statusCode }}</div>
    <div class="block">{{ error.message }}</div>
    <nuxt-link to="/" class="button is-fullwidth is-rounded block is-danger">ホームに戻る</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: Object
  }
}
</script>

<style></style>