<template>
  <div>
    <div class="block is-size-1">休憩</div>
    <div class="block is-size-4">スマホから目を離そう</div>
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