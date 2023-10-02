<template>
  <div class="block box">

    <!-- 最上段 -->
    <div class="field has-addons">
      <p class="control">
        <a class="button is-rounded is-static">
          Q
        </a>
      </p>
      <p class="control is-expanded">
        <input class="input is-rounded" type="text" placeholder="問題文" v-model="ques" @keydown.enter="godown" ref="up">
      </p>
    </div>

    <!-- 中段 -->
    <div class="field has-addons">
      <p class="control">
        <a class="button is-rounded is-static">
          A
        </a>
      </p>
      <p class="control is-expanded">
        <input class="input is-rounded" type="text" placeholder="答え" v-model="ans" @keydown.enter="enter" ref="down">
      </p>
    </div>

    <!-- 最下段 -->
    <div class=" field is-grouped">
      <p class="control">
        <button class="button is-danger is-light is-rounded" @click="remove">削除</button>
      </p>
      <p class="control is-expanded"></p>
      <p class="control">
        <button class="button is-rounded" @click="closing">閉じる</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Array
  },
  mounted() {
    this.$refs.up.focus()
  },
  data() {
    return {
      ques: this.value[0],
      ans: this.value[1]
    }
  },
  methods: {
    closing() {

      if (this.ques == "" && this.ans == "") {
        this.remove()
      } else {
        this.$emit('close')
      }
    },
    remove() {
      this.$emit('delete')
    },
    enter(e) {
      if (e.keyCode == 13) {
        if (this.ques == "" && this.ans == "") {
          this.remove()
        } else {
          this.$emit("enter")
        }
      }
    },
    godown(e) {
      if (e.keyCode == 13) {
        this.$refs.down.focus()
      }
    }
  },
  watch: {
    ques() {
      this.$emit("input", [this.ques, this.ans])
    },
    ans() {
      this.$emit("input", [this.ques, this.ans])
    }
  }
}
</script>

<style></style>