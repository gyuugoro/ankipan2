<template>
  <div>

    <div class="block mb-6">
      {{ question }}
    </div>

    <div style="height: 234px;"></div>

    <control>
      <div class="columns">
        <div class="column is-one-quarter">
          <button class="button is-fullwidth is-rounded">{{ selection[0] }}</button>
        </div>

        <div class="column is-one-quarter">
          <button class="button is-fullwidth is-rounded">{{ selection[1] }}</button>
        </div>

        <div class="column is-one-quarter">
          <button class="button is-fullwidth is-rounded">{{ selection[2] }}</button>
        </div>

        <div class="column is-one-quarter">
          <button class="button is-fullwidth is-rounded">{{ selection[3] }}</button>
        </div>




      </div>
    </control>

  </div>
</template>

<script>
export default {
  props: {
    question: String,
    selection: Array,
    answer: Number
  },
  data: () => ({
    lock: false,
    yournum: -1
  })
}
</script>

<style scoped></style>