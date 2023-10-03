<template>
  <div>
    <h1 class="title is-1">単語帳編集</h1>

    <div class="content">
      <p>単語帳の作成または編集をするページです。</p>

      <!-- タイトル -->
      <div class="content block">
        <h4>タイトル（必須）</h4>
        <p>わかりやすいタイトルをつけてください。</p>
        <input type="text" class="block input is-rounded is-fullwidth" placeholder="タイトル" v-model="name" />
      </div>

      メイン
      <div class="content block">
        <h4>単語帳メイン</h4>
        <edit @add="add" @remove="remove" @update="update" :answer="answer" :question="question" />
      </div>

      <!-- 説明 -->
      <div class="content block">
        <h4>説明（省略可）</h4>
        <p>ここで補足説明ができます。</p>
        <input type="text" class="block input is-rounded is-fullwidth" placeholder="例：最後らへんむずいぞ" v-model="description" />
      </div>

      <!-- 管理者向けメッセージ -->
      <div class="block content">
        <h4>アプリ管理者に伝えておきたいこと（省略可）</h4>
        <p>ここに書かれたことは公開されません。</p>
        <input type="text" class="block input is-rounded is-fullwidth" placeholder="例：こんな機能追加してほしい" v-model="secret" />
      </div>

      <!-- 保存ボタン -->
      <div class="block content">

        <p>作業は１分ごとに自動保存されますが、この保存ボタンを押すことで手動保存することもできます。</p>
        <button class="block button is-rounded is-fullwidth" :disabled="isSaved" @click="save">{{ isSaved ? '保存済み' : '保存'
        }}</button>
      </div>


      <nuxt-link to="/manage" class="button is-rounded is-fullwidth block is-info is-light is-outlined">単語帳を管理</nuxt-link>
      <nuxt-link to="/" class="block button is-rounded is-fullwidth is-black">ホームに戻る</nuxt-link>

    </div>
  </div>
</template>

<script>

import { get_book_id, change_all, onSignIn } from '../firebase';

export default {
  data() {
    return {
      isSaved: true,
      question: [],
      answer: [],
      name: "",
      description: "",
      secret: "",
      id: null,
    }
  },
  mounted() {

    onSignIn((user) => {
      if (!user) {
        console.log("なぜだあ", user)
        this.$router.push("/manage")
      }
    })

    if (this.$route.query.id) {
      this.get_data()
    }

    const a = setInterval(async () => {
      if (!this.isSaved) {
        console.log("保存します。")

        await this.save()
      } else {
        console.log("保存する必要はありません。")
      }
    }, 60000);
  },
  methods: {
    async get_data() {
      console.log("データ取得開始")
      const data = await get_book_id(this.$route.query.id)

      if (data == "ERR") {
        this.$router.push("/error")
      }

      this.question = data.question
      this.answer = data.answer
      this.name = data.name
      this.description = data.description
      this.secret = data.secret
      this.id = this.$route.query.id

      console.log("データ取得完了", data)

      this.$nextTick(() => this.isSaved = true)
    },
    async save() {
      const id = await change_all(this.id, [this.question, this.answer, this.name, this.description, this.secret])
      this.id = id
      this.isSaved = true
    },
    add() {
      this.answer.push("")
      this.question.push("")

      this.isSaved = false
    },
    remove([i]) {
      this.answer.splice(i, 1)
      this.question.splice(i, 1)

      this.isSaved = false
    },
    update([i, question, answer]) {
      this.answer[i] = answer
      this.question[i] = question

      this.isSaved = false
    }
  },
  watch: {
    description() {
      this.isSaved = false
    },
    secret() {
      this.isSaved = false
    },
    name() {
      this.isSaved = false
    },
  }
}
</script>

<style></style>