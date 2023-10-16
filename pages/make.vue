<template>
  <div>
    <h1 class="title is-1">単語帳編集</h1>

    <div class="content">
      <p>単語帳の作成または編集をするページです。</p>

      <!-- タイトル -->
      <div class="content block">
        <h4>タイトル（必須）</h4>
        <p>わかりやすいタイトルをつけてください。</p>
        <input type="text" class=" input is-rounded is-fullwidth" placeholder="タイトル" v-model="name"
          :class="toolong ? 'is-danger' : ''" />
        <p v-show="toolong" class="help is-danger">文字数を減らしてください。スマホで表示しきれません。</p>
      </div>

      メイン
      <div class="content block">
        <h4>単語集</h4>
        <edit @add="add" @remove="remove" @update="update" :answer="answer" :question="question" :img="img" />
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
        <button class="block button is-rounded is-fullwidth" :disabled="is_saved" @click="save">{{ is_saved ? '保存済み' :
          '保存'
        }}</button>
      </div>


      <nuxt-link to="/manage" class="button is-rounded is-fullwidth block is-info is-light is-outlined">単語帳を管理</nuxt-link>
      <nuxt-link to="/" class="block button is-rounded is-fullwidth is-black">ホームに戻る</nuxt-link>

    </div>
  </div>
</template>

<script>

export default {
  head() {
    return {
      title: "Making"
    }
  },
  data() {
    return {
      is_saved: true,
      question: [],
      answer: [],
      img: [],
      name: "",
      description: "",
      secret: "",
      id: null,
      timer_id: null
    }
  },
  mounted() {

    scrollTo({ top: 0 })

    this.$store.dispatch("on_change_user", (user) => {
      if (!user) {
        this.$router.push("/manage")
      }
    })

    if (this.$route.query.id) {
      this.get_data()
    }

    this.timer_id = setInterval(async () => {
      if (!this.is_saved) {
        console.log("保存します。")

        await this.save()
      } else {
        console.log("保存する必要はありません。")
      }
    }, 60000);
  },
  methods: {
    async get_data() {
      const data = await this.$store.dispatch("get_book_id", this.$route.query.id)

      if (data == "ERR") {
        this.$router.push("/error")
      }

      this.question = data.question
      this.img = data.img
      this.answer = data.answer
      this.name = data.name
      this.description = data.description
      this.secret = data.secret
      this.id = this.$route.query.id

      this.$nextTick(() => this.is_saved = true)
    },
    async save() {
      const id = await this.$store.dispatch("change_all", [this.id, this.question, this.answer, this.name, this.description, this.secret, this.img])
      this.id = id
      this.is_saved = true
    },
    add() {
      this.answer.push("")
      this.question.push("")
      this.img.push("")

      this.is_saved = false
    },
    remove([i]) {
      this.answer.splice(i, 1)
      this.question.splice(i, 1)
      this.img.splice(i, 1)

      this.is_saved = false
    },
    update([i, question, answer, img]) {
      this.answer[i] = answer
      this.question[i] = question
      this.img[i] = img

      this.is_saved = false
    }
  },
  watch: {
    description() {
      this.is_saved = false
    },
    secret() {
      this.is_saved = false
    },
    name() {
      this.is_saved = false
    },
  },
  async beforeDestroy() {
    if (!this.is_saved) {
      console.log("最期なので保存")
      await this.save()
    }
    console.log("自動保存停止")
    clearInterval(this.timer_id)
  },
  computed: {
    toolong() {
      if (this.name.length < 20) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style></style>