<template>
  <div>
    <div class="block is-size-3">
      確認問題
    </div>

    <div class="block">
      {{ question }}
    </div>

    <div v-show="show_answer">
      <div class="block is-size-3">
        答え
      </div>

      <div class="block">
        {{ answer }}
      </div>
    </div>

    <Control>

      <div class="column is-one-third">
        <button class="button is-fullwidth is-rounded" @click="() => show_answer = true"
          :disabled="show_answer">答え合わせ</button>
      </div>

      <div class="column is-one-third">
        <button class="button is-fullwidth is-rounded is-success is-light is-outlined" :disabled="!show_answer"
          @click="succeed">正解</button>
      </div>

      <div class="column is-one-third">
        <button class="button is-fullwidth is-rounded is-danger is-light is-outlined" :disabled="!show_answer"
          @click="not_succeed">不正解</button>
      </div>

    </Control>
  </div>
</template>

<script>
export default {
  props: {
    question: String,
    answer: String
  },
  data() {
    return {
      show_answer: false,
    }
  },
  methods: {
    succeed() {
      this.$emit("next", 0)
    },
    not_succeed() {
      this.$emit("next", 1)
    }
  }
}
</script>

<style></style>