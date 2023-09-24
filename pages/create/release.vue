<template>
  <div>

    <div class="block is-size-3">
      公開ページ
    </div>

    <nuxt-link to="/create" class="block button is-rounded is-fullwidth">戻る</nuxt-link>


    <div class="block content">
      <h2>注意点</h2>
      <p>「タイトル」には</p>
      <ol>
        <li>
          教科
        </li>
        <li>
          参照元の名前
        </li>
        <li>
          ページ数や単語番号など範囲がわかるもの
        </li>
      </ol>
      <p>の３つを入れてください。</p>
      <p>例↓</p>
      <ul>
        <li>英語 解体英熟語 p10~80</li>
        <li>日本史 山Tプリント No.10</li>
      </ul>
      <p>「補足説明」と「アプリ開発者に伝えたいこと」は何をかいてもOK<br><b>※こちらの都合で改行は無効化されます！</b></p>
    </div>

    <div class="field">
      <label class="label">タイトル</label>
      <div class="control">
        <input :disabled="disabled" class="input is-rounded" placeholder="例：英語 Vintage p1~100" v-model="title">
      </div>
    </div>
    <div class="field">
      <label class="label">補足説明（省略可）</label>
      <div class="control">
        <textarea :disabled="disabled" class="textarea" placeholder="例：最後らへんむずいぞ" v-model="desc"></textarea>
      </div>
    </div>
    <div class="field">
      <label class="label">アプリ管理者に伝えたいこと（省略可・公開されません）</label>
      <div class="control">
        <textarea :disabled="disabled" class="textarea" placeholder="例:こんな機能追加してほしい" v-model="secret"></textarea>
      </div>
    </div>
    <div class="block">
      <button :disabled="title.length < 5 || disabled" class="button is-rounded is-fullwidth" @click="release">公開</button>
    </div>
    <nuxt-link :disabled="id == ''" :to="'/books/' + id" class="button block is-rounded is-fullwidth">早速やってみる</nuxt-link>
  </div>
</template>

<script>
import { add_book } from '../../firebase'

export default {
  data() {
    return {
      title: "",
      desc: "",
      secret: "",
      data: [],
      public: true,
      disabled: false,
      id: ""
    }
  },
  methods: {
    async release() {

      this.disabled = true

      const r = {
        question: [],
        answer: [],
        name: this.title,
        description: this.desc,
        secret: this.secret,
        now: Date.now(),
        public: true
      }

      for (const v of this.data) {
        r.question.push(v.question)
        r.answer.push(v.answer)
      }

      console.log(r)

      const id = await add_book(r)

      localStorage.removeItem("create")

      this.id = id
    }
  },
  created() {

    if (JSON.parse(localStorage.getItem('create')) == null) {
      this.$router.push('/create')
    } else {
      this.data = JSON.parse(localStorage.getItem('create'));
    }
  },
}
</script>

<style></style>