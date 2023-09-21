<template>
  <div>
    <div class="block is-size-3">{{ title }}</div>

    <img class="block" src="../../assets/undraw_flying_drone_u3r2.svg" alt="">

    <control>
      <div class="column is-full">
        <button class="button is-fullwidth is-rounded" @click="() => $emit('next', 0)">始める</button>
      </div>
    </control>

  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style></style>