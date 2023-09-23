<template>
  <div>
    <div class="block is-size-1">休憩</div>
    <img class="block" src="./../../assets/undraw_coffee_break_h3uu.svg" alt="">
    <control>
      <div class="column is-full">
        <button class="button is-fullwidth is-rounded" @click="() => $emit('next', 0)">続きを始める</button>
      </div>
    </control>
  </div>
</template>

<script>
export default {
}
</script>

<style></style>