<template>
  <div>
    <div class="block is-size-3">
      単語帳制作ページ
    </div>
    <div class="block">
      <transition-group name="list" tag="div">
        <div v-show="data.length == 0" class="block" is-size-5 key="letsadd">単語を追加しよう
        </div>


        <div class="block" v-for="(v, i) in data" :key="v.id" :class="focus == i ? 'focused' : ''">

          <transition name="inlist">

            <edit-board v-if="focus == i && edit" :num="i" :question="v.question" :answer="v.answer" @save="save"
              @editEnd="editEnd" />

            <focus-board v-else-if="focus == i" :num="i" :question="v.question" :answer="v.answer" :maxNum="data.length"
              @notFocus="notFocus" @editOn="editOn" @addUp="addNew(i)" @addDown="addNew(i + 1)" @goUp="goUp"
              @goDown="goDown" />

            <usual-board v-else :question="v.question" :answer="v.answer" :num="i" @focusNum="focusNum" />
          </transition>
        </div>
      </transition-group>
    </div>


    <control>
      <div class="column is-half">
        <button class="button is-fullwidth is-rounded" @click="addNew(data.length)">
          <span class="mdi mdi-plus"></span>
        </button>
      </div>
      <div class="column is-half">
        <nuxt-link to="/create/release" class="button is-rounded is-fullwidth">次へ</nuxt-link>
      </div>
    </control>
  </div>
</template>

<script>
import EditBoard from '../../components/boards/EditBoard.vue'
import FocusBoard from '../../components/boards/FocusBoard.vue'
import UsualBoard from '../../components/boards/UsualBoard.vue'
export default {
  components: { UsualBoard, EditBoard, FocusBoard },
  data() {
    return {
      data: [{
        question: "問題１",
        answer: "答え１",
        id: 1
      },
      {
        question: "問題2",
        answer: "答え2",
        id: 2
      },
      {
        question: "問題3",
        answer: "答え3",
        id: 3
      },
      ],
      focus: null,
      edit: false,
      supermode: false
    }
  },
  methods: {
    focusNum(num) {

      this.focus = num
      this.edit = false
    },
    notFocus() {
      this.focus = null
    },
    editOn() {
      this.edit = true
      this.supermode = false
    },
    save([v_ques, v_ans]) {

      if (v_ques == "" && v_ans == "") {
        this.remove()
      } else {
        this.data[this.focus].question = v_ques
        this.data[this.focus].answer = v_ans

        if (this.supermode) {
          this.addNew(this.focus + 1, true)
        } else {
          this.focus = null
        }
      }

    },
    addNew(num) {

      this.data.splice(num, 0, { question: "", answer: "", id: Date.now() })
      this.offline()

      this.supermode = true

      this.focus = num
      this.edit = true
    },
    remove() {
      this.data.splice(this.focus, 1)
      this.offline()

      this.edit = false
      this.focus = null
    },
    goUp() {

      const d = this.data[this.focus - 1]

      this.data[this.focus - 1] = this.data[this.focus]
      this.data[this.focus] = d

      this.offline()

      this.focus -= 1

      scrollBy(0, -64);
    },
    goDown() {
      const d = this.data[this.focus + 1]

      this.data[this.focus + 1] = this.data[this.focus]
      this.data[this.focus] = d

      this.offline()

      this.focus += 1

      scrollBy(0, 64);
    },
    editEnd() {
      this.edit = false
    },
    offline() {
      localStorage.setItem("create", JSON.stringify(this.data))
    }
  },
  created() {
    if (JSON.parse(localStorage.getItem('create')) !== null) {
      this.data = JSON.parse(localStorage.getItem('create'));
    } else {
      this.offline()
    }
  }
}
</script>

<style scoped>
.list-move,
/* 移動する要素にトランジションを適用 */
.list-enter-active,
.list-leave-active {
  transition: all 0.25s ease;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* leave する項目をレイアウトフローから外すことで
   アニメーションが正しく計算されるようになる */
.list-leave-active {
  position: absolute !important;
  width: 100%;
}

.focused {
  position: relative;
  z-index: 10;
}

.inlist-enter-active,
.inlist-leave-active {
  transition: all 0.25s ease;
}

.inlist-enter,
.inlist-leave-to {
  transform: scaleY(0);
  opacity: 0;
}


.inlist-leave-active {
  position: absolute !important;
  width: 100%;
}
</style>