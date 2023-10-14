<template>
  <div>

    <figure class="image" v-show="img != ''">
      <img :src="url">
    </figure>

    <div class="block is-size-3">
      問題
    </div>

    <div class="block">
      {{ question }}
    </div>


    <control>
      <div class="column is-full">
        <button class="button is-fullwidth is-rounded can-scroll" :class="q[0] ? 'is-danger' : ''" @click="tap(0)">{{
          selection[0] }}</button>
      </div>

      <div class="column is-full">
        <button class="button is-fullwidth is-rounded can-scroll" :class="q[1] ? 'is-danger' : ''" @click="tap(1)">{{
          selection[1]
        }}</button>
      </div>

      <div class="column is-full">
        <button class="button is-fullwidth is-rounded can-scroll" :class="q[2] ? 'is-danger' : ''" @click="tap(2)">{{
          selection[2]
        }}</button>
      </div>

      <div class="column is-full">
        <button class="button is-fullwidth is-rounded can-scroll" :class="q[3] ? 'is-danger' : ''" @click="tap(3)">{{
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
    answer: String,
    img: String
  },
  data() {
    return {
      q: [false, false, false, false],
      url: ""
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
  }
}
</script>

<style scoped></style>