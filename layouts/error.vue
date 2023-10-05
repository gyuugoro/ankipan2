<template>
  <div class="notification is-danger is-light">
    <h3 class="is-size-3 block">ERROR</h3>
    <div class="block">申し訳ありませんエラーが発生しました。</div>
    <div class="block">エラーコード：{{ error.statusCode }}</div>
    <div class="block">{{ error.message }}</div>
    <nuxt-link to="/" class="button is-fullwidth is-rounded block is-danger">ホームに戻る</nuxt-link>
    <button class="button is-fullwidth is-rounded block is-danger is-light is-outlined"
      @click="$router.back()">一つ戻る</button>
    <button class="button is-fullwidth is-rounded block is-danger is-light is-outlined"
      @click="$router.go({ path: $router.currentRoute.path, force: true })">再読み込み</button>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "ERR"
    }
  },
  props: {
    error: Object
  },
}
</script>

<style></style>