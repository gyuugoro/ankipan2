<template>
  <div>

    <figure class="image" v-show="img != ''">
      <img :src="url">
    </figure>

    <div class="block is-size-3">
      確認問題
    </div>

    <div class="block">
      {{ question }}
    </div>

    <transition name="answer">
      <div v-show="show_answer" ref>
        <div class="block is-size-3">
          答え
        </div>

        <div class="block">
          {{ answer }}
        </div>
      </div>
    </transition>

    <Control>

      <div class="column is-full" v-show="!show_answer">
        <button class="button is-fullwidth is-rounded" @click="() => {show_answer = true; $refs.answer.scrollIntoView();}">答え合わせ</button>
      </div>

      <div class="column is-full" v-show="show_answer">
        <button class="button is-fullwidth is-rounded is-success" @click="() => show_answer ? succeed() : ''">正解</button>
      </div>

      <div class="column is-full" v-show="show_answer">
        <button class="button is-fullwidth is-rounded is-danger"
          @click="() => show_answer ? not_succeed() : ''">不正解</button>
      </div>

    </Control>
  </div>
</template>

<script>

export default {
  props: {
    question: String,
    answer: String,
    img: String
  },
  data() {
    return {
      show_answer: false,
      url: ""
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
    },
    async download() {
      if (this.img != "") {
        this.url = await this.$store.dispatch("download_img", this.img)
      }
    }
  },
  watch: {
    img: {
      handler() {
        this.download()
      },
      immediate: true
    }
  },
  mounted(){
    scrollTo({ top: 0 })
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
