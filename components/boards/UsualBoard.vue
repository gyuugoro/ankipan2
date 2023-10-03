<template>
  <div class="field has-addons">
    <p class="control">
      <button class="button is-rounded is-static">{{ i + 1 }}</button>
    </p>
    <p class="control is-expanded">
      <input :value="'Q:' + question + ' A:' + answer" class="block button is-fullwidth is-rounded" readonly
        @click="click" />
    </p>
  </div>
</template>

<script>
export default {
  props: {
    question: String,
    answer: String,
    i: Number
  },
  methods: {
    click() {
      this.$emit("clickme")
    }
  }
}
</script>
<style></style >


