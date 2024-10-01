<template>
  <div class="notification is-danger is-light">
    <h3 class="is-size-3 block">ERROR</h3>
    <div class="block">申し訳ありませんエラーが発生しました。</div>
    <div class="block">エラーコード：{{ error.statusCode }}</div>
    <div class="block">{{ error.message }}</div>
    <nuxt-link to="/" class="button is-fullwidth is-rounded block is-danger">ホームに戻る</nuxt-link>
    <button class="button is-fullwidth is-rounded block is-danger is-light is-outlined"
      @click="$router.back()">前のページに戻る</button>
    <button class="button is-fullwidth is-rounded block is-danger is-light is-outlined"
      @click="$router.go({ path: $router.currentRoute.path, force: true })">再読み込みする</button>
    <a class="button is-fullwidth is-rounded block is-danger is-light is-outlined"
      href="https://instagram.com/sho.taro0930" target="_blank">制作者に連絡を取る</a>
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