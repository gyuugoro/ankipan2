<template>
  <div>
    <h1 class="title is-1">メジアンクリア</h1>
    <div class="block content">
      <p>
        ボタンを押すと、メジアンとクリアーの全問題からランダムで一題を選び、その問題番号を表示します。
      </p>
      <h3 class="title is-3 has-text-centered my-6">{{ text }}</h3>
      <div class="block columns is-centered">
        <div class="column is-7">
          <button class="button is-fullwidth is-rounded" @click="push_button">シャッフル</button>
        </div>
      </div>
    </div>


    <div class="columns block is-vcentered is-centered is-multiline">
      <div class="column is-7">
        <share />
      </div>
      <div class="column is-7">
        <nuxt-link to="/" class="block button is-rounded is-fullwidth is-black">ホームに戻る</nuxt-link>
      </div>
    </div>

  </div>
</template>

<script>
import Share from '../components/Share.vue'
export default {
  components: { Share },
  data() {
    return {
      text: ""
    }
  },
  head() {
    return {
      title: "MedianClear"
    }
  },
  mounted() {
    scrollTo({ top: 0 })
    console.log("medianclear-mounted")
    this.push_button()
  },
  methods: {
    push_button() {

      this.text = "熟考中..."

      let after_text = ""

      const cle = {
        "問題": 180,
        "Example": 33,
        "Practice": 33
      }
      const med = {
        "問題": 374,
        "例題": 52,
        "Check": 52
      }

      const two = Math.floor(Math.random() * 2)

      if (two == 0) {
        const num = Math.floor(Math.random() * (cle["問題"] + cle["Example"] + cle["Practice"]));

        if (0 <= num && num < 180) {
          after_text = `クリアー 問題 No.${num + 1}`
        }
        else if (180 <= num && num < 180 + 33) {
          after_text = `クリアー Example No.${num - 180 + 1}`
        }
        else if (213 <= num && num < 213 + 33) {
          after_text = `クリアー Practice No.${num - 213 + 1}`
        }
      } else {
        const num = Math.floor(Math.random() * (med["問題"] + med["例題"] + med["Check"]));

        if (0 <= num && num < 374) {
          after_text = `メジアン 問題 No.${num + 1}`
        }
        else if (374 <= num && num < 374 + 52) {
          after_text = `メジアン 例題 No.${num - 374 + 1}`
        }
        else if (426 <= num && num < 426 + 52) {
          after_text = `メジアン Check No.${num - 426 + 1}`
        }
      }

      setTimeout(() => {
        this.text = after_text
      }, 700)

    }
  }
}
</script>
