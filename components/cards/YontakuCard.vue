<template>
  <div>

    <div class="block is-size-3">
      問題
    </div>

    <div class="block">
      {{ question }}
    </div>


    <control>
      <div class="column is-full">
        <button class="button is-fullwidth is-rounded can-scroll" :disabled="q[0]" :class="q[0] ? 'is-danger' : ''"
          @click="tap(0)">{{
            selection[0] }}</button>
      </div>

      <div class="column is-full">
        <button class="button is-fullwidth is-rounded can-scroll" :disabled="q[1]" :class="q[1] ? 'is-danger' : ''"
          @click="tap(1)">{{
            selection[1]
          }}</button>
      </div>

      <div class="column is-full">
        <button class="button is-fullwidth is-rounded can-scroll" :disabled="q[2]" :class="q[2] ? 'is-danger' : ''"
          @click="tap(2)">{{
            selection[2]
          }}</button>
      </div>

      <div class="column is-full">
        <button class="button is-fullwidth is-rounded can-scroll" :disabled="q[3]" :class="q[3] ? 'is-danger' : ''"
          @click="tap(3)">{{
            selection[3]
          }}</button>
      </div>


    </control>

  </div>
</template>

<script>
export default {
  props: {
    question: String,
    selection: Array,
    answer: String
  },
  data() {
    return {
      q: [false, false, false, false]
    }
  },
  methods: {
    tap(num) {

      if (this.selection[num] == this.answer) {
        this.q = [false, false, false, false]
        this.$emit("next", 0)
      } else {
        this.q.splice(num, 1, true)
      }
    }
  },
}
</script>

<style scoped></style>