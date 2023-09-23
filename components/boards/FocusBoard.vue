<template>
  <div class="box ">
    <!-- 最上部コントロール -->
    <div class="field is-grouped">
      <div class="control is-expanded"></div>
      <div class="countrol">
        <button class="button is-rounded" :disabled="num <= 0" @click="goUp">
          <span class="mdi mdi-chevron-up"></span>
        </button>
      </div>
      <div class="control is-expanded"></div>
      <div class="control">
        <button class="button is-rounded" @click="addUp">
          <span class="mdi mdi-plus"></span>
        </button>
      </div>
      <div class="control is-expanded"></div>
    </div>
    <!-- メインコントロール -->
    <div class="field has-addons">
      <div class="control">
        <button class="button is-static is-rounded">{{ num + 1 }}</button>
      </div>
      <div class="control is-expanded">
        <input type="text" class="input" readonly :value="'Q.' + question + ' A.' + answer" @click="editOn">
      </div>
      <div class="control">
        <button class="button is-success is-rounded" @click="notFocus" ref="notFocus">
          <span class="mdi mdi-checkbox-marked-circle"></span>
        </button>
      </div>
    </div>
    <!-- 最下部コントロール -->
    <div class="field is-grouped">
      <div class="control is-expanded"></div>
      <div class="countrol">
        <button class="button is-rounded" :disabled="num >= maxNum - 1" @click="goDown">
          <span class="mdi mdi-chevron-down"></span>
        </button>
      </div>
      <div class="control is-expanded"></div>
      <div class="control">
        <button class="button is-rounded" @click="addDown">
          <span class="mdi mdi-plus"></span>
        </button>
      </div>
      <div class="control is-expanded"></div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    num: Number,
    question: String,
    answer: String,
    maxNum: Number
  },
  methods: {
    notFocus() {
      this.$emit("notFocus")
    },
    editOn() {
      this.$emit("editOn")
    },
    addUp() {
      this.$emit("addUp")
    },
    addDown() {
      this.$emit("addDown")
    },
    goUp() {
      this.$emit("goUp")
    },
    goDown() {
      this.$emit("goDown")
    }
  },
}
</script>

<style scoped></style>