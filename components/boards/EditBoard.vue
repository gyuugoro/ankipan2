<template>
  <div class="box ">
    <!-- ボタン -->
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-static is-rounded">{{ num + 1 }}</button>
      </div>
      <div class="control">
        <button class="button is-danger is-light is-rounded" @click="remove">
          <span class="mdi mdi-delete"></span>
        </button>
      </div>
      <div class="control is-expanded"></div>
      <div class="control" @click="save">
        <button class="button is-rounded">保存</button>
      </div>
    </div>
    <!-- Question -->
    <div class="field has-addons">
      <div class="control">
        <button class="button is-static is-rounded">Q</button>
      </div>
      <div class="control is-expanded">
        <input class="input is-rounded" type="text" placeholder="問題" v-model="ques_input"
          @keydown.enter="keyCheckQuestion" ref="question">
      </div>
    </div>
    <!-- Answer -->
    <div class="field has-addons">
      <div class="control">
        <button class="button is-static is-rounded">A</button>
      </div>
      <div class="control is-expanded">
        <input class="input is-rounded" type="text" placeholder="答え" v-model="ans_input" @keydown.enter="keyCheckAnswer"
          ref="answer">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    num: Number,
    question: String,
    answer: String
  },
  data() {
    return {
      ques_input: this.question,
      ans_input: this.answer
    }
  },
  methods: {
    save() {
      this.$emit("editEnd")
    },
    keyCheckQuestion(e) {
      if (e.keyCode == 13) {
        this.$refs.answer.focus()
      }
    },
    keyCheckAnswer(e) {
      if (e.keyCode == 13) {
        this.$emit("editEnd")
      }
    },
    remove() {
      this.ques_input = ""
      this.ans_input = ""
      this.$emit("editEnd")
    }
  },
  mounted() {
    this.$refs.question.focus()
  },
  beforeDestroy() {
    this.$emit("save", [this.ques_input, this.ans_input])
  },
}
</script>

<style scoped></style>