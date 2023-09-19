<template>
  <div>

    <div class="block mb-6">
      {{ question }}
    </div>

    <div style="height: 106px;"></div>


    <control>

      <div class="block">
        <button class="button is-fullwidth is-rounded is-success is-light is-outlined">わかる</button>
      </div>

      <div class="block">
        <button class="button is-fullwidth is-rounded is-danger is-light is-outlined">わからない</button>
      </div>

    </control>
  </div>
</template>

<script>
export default {
  props: {
    question: String
  }
}
</script>

<style></style>