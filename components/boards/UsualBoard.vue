<template>
  <div class="field has-addons px-5 " @click="checked">
    <div class="control">
      <button class="button is-static is-rounded">{{ num + 1 }}</button>
    </div>
    <div class="control is-expanded">
      <input type="text" class="input is-rounded" readonly :value="'Q.' + question + ' A.' + answer">
    </div>
    <!-- <div class="control">
      <button class="button is-rounded">
        <span class="mdi mdi-checkbox-marked-circle-outline"></span>
      </button>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    num: Number,
    question: String,
    answer: String
  },
  methods: {
    checked() {
      this.$emit("focusNum", this.num)
    }
  }
}
</script>

<style scoped></style>