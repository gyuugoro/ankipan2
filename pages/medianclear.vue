<template>
  <div>
    <h1 class="title is-1">メジアンクリア</h1>
    <div class="block content">

    </div>


    <div class="block columns is-centered">
      <div class="column is-7">
        <nuxt-link to="/" class="block button is-rounded is-fullwidth is-black">ホームに戻る</nuxt-link>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "MedianClear"
    }
  },
  mounted() {
    scrollTo({ top: 0 })
    console.log("medianclear-mounted")
  },
}
</script>
