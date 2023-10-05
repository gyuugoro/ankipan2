<template>
  <div>
    <appbar>

      <div class="column my-auto">
        <progress class="progress is-success" :value="num" :max="main.length - 1"></progress>
      </div>

    </appbar>

    <transition-group name="books" tag="div">
      <first-card key="First" @next="next" v-show="card_type == 'First' && title != '読み込み中'" :title="title"
        :description="description" :disabled="disabled" />

      <yontaku-card key="Yontaku" @next="next" v-show="num % 2 == 0 && card_type == 'Yontaku'" :question="question"
        :answer="answer" :selection="selection" />
      <yontaku-card key="Yontaku2" @next="next" v-show="num % 2 == 1 && card_type == 'Yontaku'" :question="question"
        :answer="answer" :selection="selection" />

      <check-card key="Check" @next="next" v-show="num % 2 == 0 && card_type == 'Check'" :question="question"
        :answer="answer" />
      <check-card key="Check2" @next="next" v-show="num % 2 == 1 && card_type == 'Check'" :question="question"
        :answer="answer" />

      <rest-card key="Rest" @next="next" v-show="card_type == 'Rest'" />
      <finish-card key="Finish" @next="restart" v-show="card_type == 'Finish'"
        :allconp="this.miss_question.length == 0" />
    </transition-group>

  </div>
</template>

<script>
import FirstCard from '../components/cards/FirstCard.vue'
import FinishCard from '../components/cards/FinishCard.vue'
import CheckCard from '../components/cards/CheckCard.vue'
import YontakuCard from '../components/cards/YontakuCard.vue'
import RestCard from '../components/cards/RestCard.vue'
import { get_book_id } from '../firebase'


export default {

  components: { FirstCard, FinishCard, CheckCard, YontakuCard, RestCard },

  head() {
    return {
      title: this.title
    }
  },

  data() {
    return {

      data: {},

      card_type: "First",

      title: "読み込み中", //Firstで必要
      description: "",//Firstで必要
      disabled: true,//Firstで必要
      question: "",//YontakuとCheckで必要
      answer: "",//YontakuとCheckで必要
      selection: ["", "", "", ""],//Yontakuで必要

      num: 0,

      main: [],
      miss_question: [],
      miss_answer: [],
    }
  },

  methods: {
    set_data() {
      //読み込み処理開始
      console.log("読み込み処理開始")

      //最初にタイトルを入れる
      this.main.push({ type: "First", title: this.data.name, description: this.data.description })


      const karinums = []
      for (let i = 0; i < this.data.question.length; i++) {
        karinums.push(i)
      }



      const sanjutoubuneds = this.sanjutoubun(karinums)
      for (const sanjutoubuned of sanjutoubuneds) {
        const gotoubuneds = this.gotoubun(sanjutoubuned)
        for (const gotoubuned of gotoubuneds) {

          //Yontaku生成
          for (const bara of gotoubuned) {
            const sentakushies = this.sentakushi(bara % 5, gotoubuned)

            this.main.push({
              type: "Yontaku",
              question: this.data.question[bara],
              answer: this.data.answer[bara],
              selection: sentakushies.map((v) => {
                return this.data.answer[v]
              })
            })
          }

          //Check生成
          for (const bara of gotoubuned) {

            this.main.push({
              type: "Check",
              question: this.data.question[bara],
              answer: this.data.answer[bara],
            })
          }
        }

        //Rest生成
        this.main.push({
          type: "Rest"
        })
      }



      //最後にお疲れ様を入れる
      this.main.push({ type: "Finish" })

      localStorage.setItem("continue_main", JSON.stringify(this.main))



      //ロック解除
      this.disabled = false
      console.log("読み込み処理完了！＆ロック解除")

      this.read()
    },
    sanjutoubun(data) {
      //30等分
      const r = []

      //リストがいくつできるのか計算
      const ques_len = Math.ceil(data.length / 30)

      //リストの中身を取得
      for (let i = 0; i < ques_len; i++) {
        const startnum = i * 30
        let endnum = (i + 1) * 30
        if (i == ques_len - 1) {
          endnum = data.length
        }

        //仕上げ
        r.push(data.slice(startnum, endnum))
      }

      return r
    },
    gotoubun(data) {
      //５等分
      const r = []

      //やり方は３０等分と同じ
      const ques_len = Math.ceil(data.length / 5)


      for (let i = 0; i < ques_len; i++) {
        const startnum = i * 5
        let endnum = (i + 1) * 5
        if (i == ques_len - 1) {
          endnum = data.length
        }

        r.push(data.slice(startnum, endnum))
      }

      return r
    },
    sentakushi(ans_num, selections) {
      //選択肢作成
      let r = ["", "", "", ""]

      const selec = selections.concat()

      //答えを一旦抜く
      const ans = selec[ans_num]
      selec.splice(ans_num, 1)


      //不正解数を３つに揃える
      if (selec.length > 3) {
        selec.splice(Math.floor(Math.random() * selec.length), 1)
      }

      //抜いてた答えを入れる（全部で４つ）
      selec.push(ans)

      //ランダム化
      const seleclength = selec.length
      for (let i = 0; i < seleclength; i++) {
        const num = Math.floor(Math.random() * selec.length)
        r[i] = selec[num]
        selec.splice(num, 1)
      }

      return r
    },
    next(miss) {



      if (miss == 1) {
        this.miss_question.push(this.main[this.num].question)
        this.miss_answer.push(this.main[this.num].answer)

      }


      this.num += 1

      localStorage.setItem("continue_another", JSON.stringify({ num: this.num, miss_question: this.miss_question, miss_answer: this.miss_answer }))

      this.read()


    },
    read() {

      const data = this.main[this.num]

      switch (data.type) {
        case "First":
          this.card_type = "First"
          this.description = data.description
          this.title = data.title
          break;
        case "Yontaku":
          this.card_type = "Yontaku"
          this.question = data.question
          this.answer = data.answer
          this.selection = data.selection
          break;
        case "Check":
          this.card_type = "Check"
          this.question = data.question
          this.answer = data.answer
          break;
        case "Rest":
          this.card_type = "Rest"
          break;
        case "Finish":
          this.card_type = "Finish"
          break;
      }
    },
    async data_from_fb() {

      //データ取得

      console.log("データ取得開始")
      this.data = await get_book_id(this.$route.query.id)

      if (this.data == "ERR") {
        this.$router.push("/error")
      }

      console.log("データ取得完了", this.data)

    },
    restart() {

      this.main = []

      this.data = {
        question: this.miss_question,
        answer: this.miss_answer,
        name: "間違いなおし"
      }

      this.miss_question = []
      this.miss_answer = []
      this.num = 0

      this.set_data()
    }
  },

  created() {
    (async () => {
      await this.data_from_fb()
      this.set_data()
    })()
  },

}
</script>

<style scoped>
.books-enter-active,
.books-leave-active {
  transition: all 0.25s ease;
  position: absolute;
  width: 100%;
  height: 400vh !important;
}

.books-enter {
  opacity: 0;
  transform: translateX(120px);
}

.books-leave-to {
  opacity: 0;
  transform: translateX(-120px);
}
</style>
