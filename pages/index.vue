<template>
  <div>

    <div class="block">
      <div class="is-size-4">Welcome to</div>
      <div class="is-size-1">Ankipan2</div>
    </div>

    <div class="block" v-show="!(continuation.length == 0)">
      <div class="block is-size-4">続きから</div>
      <NuxtLink class="block button is-rounded is-fullwidth" to="books">test</NuxtLink>
    </div>

    <div class="block" v-show="!(favorites.length == 0)">
      <div class="block is-size-4">お気に入り</div>
      <NuxtLink class="block button is-rounded is-fullwidth" to="books">test</NuxtLink>
    </div>


    <NuxtLink to="/create" class="button is-rounded is-fullwidth block">カードを作る</NuxtLink>

    <a href="https://instagram.com/myaaawunder?igshid=YTQwZjQ0NmI0OA=="
      class="button is-rounded is-fullwidth block">Contact me</a>

  </div>
</template>

<script>
export default {
  data: () => ({
    continuation: [],
    favorites: [],
  })
}
</script>

<style scoped></style>