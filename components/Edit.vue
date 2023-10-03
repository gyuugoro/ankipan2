<template>
  <div>
    <transition-group tag="div" name="edits" mode="out-in" class="block">
      <div v-for="(v, i) in question" :key="'wow' + question[i] + answer[i] + i" class="block">
        <usual-board v-if="fcs != i" @clickme="focuson(i)" :value="[question[i], answer[i]]" />


        <focus-board v-else v-model="set_data" @close="closing" @delete="remove" @enter="enter" />


      </div>


    </transition-group>

    <button @click="newone" class="button is-success is-light is-outlined is-rounded is-fullwidth">+</button>
  </div>
</template>

<script>
import FocusBoard from './boards/FocusBoard'
import UsualBoard from './boards/UsualBoard'
export default {
  components: { FocusBoard, UsualBoard },
  props: {
    question: Array,
    answer: Array
  },
  data() {
    return {
      fcs: -1
    }
  },
  methods: {
    focuson(i) {
      this.fcs = i
    },
    enter() {
      if (this.fcs + 1 == this.question.length) {
        this.newone()
      } else {
        this.closing()
      }
    },


    remove() {
      this.$emit("remove", [this.fcs])

      this.closing()
    },
    newone() {
      this.$emit("add")

      this.fcs = this.question.length - 1
    },
    closing() {
      this.fcs = -1
    },
  },
  computed: {
    set_data: {
      get() {
        return [this.question[this.fcs], this.answer[this.fcs]]
      },
      set(v) {
        this.$emit("update", [this.fcs, v[0], v[1]])
      }
    }
  }
}
</script>

<style scoped>
.edits-enter-active,
.edits-move {
  transition: all 0.25s ease;
}

.edits-enter {
  opacity: 0;
}

.edits-enter {
  transform: translateX(20px);
}
</style>