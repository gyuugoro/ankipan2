<template>
  <div>
    <div class="block is-size-3">
      確認問題
    </div>

    <div class="block">
      {{ question }}
    </div>

    <transition name="answer">
      <div v-show="show_answer">
        <div class="block is-size-3">
          答え
        </div>

        <div class="block">
          {{ answer }}
        </div>
      </div>
    </transition>

    <Control>

      <div class="column is-one-third">
        <button class="button is-fullwidth is-rounded" @click="() => show_answer = true"
          :disabled="show_answer">答え合わせ</button>
      </div>

      <div class="column is-one-third">
        <button class="button is-fullwidth is-rounded is-success " :disabled="!show_answer"
          @click="() => show_answer ? succeed() : ''">正解</button>
      </div>

      <div class="column is-one-third">
        <button class="button is-fullwidth is-rounded is-danger " :disabled="!show_answer"
          @click="() => show_answer ? not_succeed() : ''">不正解</button>
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
      this.show_answer = false
      this.$emit("next", 0)
    },
    not_succeed() {
      this.show_answer = false
      this.$emit("next", 1)
    }
  }
}
</script>

<style scoped>
.answer-enter-active {
  transition: opacity 0.25s;
}

.answer-enter {
  opacity: 0;
}
</style>