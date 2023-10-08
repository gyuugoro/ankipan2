<template>
  <div>
    <transition-group tag="div" name="edits" mode="out-in" class="block">
      <div v-for="(v, i) in question" :key="'wow' + question[i] + answer[i] + i" class="block">
        <boards-usual-board v-if="fcs != i" @clickme="focuson(i)" :question="question[i]" :answer="answer[i]"
          :img="img[i] != ''" :i="i" />


        <boards-focus-board v-else v-model="set_data" @close="closing" @delete="remove" @enter="enter" />


      </div>


    </transition-group>

    <button @click="newone" class="button is-success is-light is-outlined is-rounded is-fullwidth">+</button>
  </div>
</template>

<script>
export default {
  props: {
    question: Array,
    answer: Array,
    img: Array
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
        return [this.question[this.fcs], this.answer[this.fcs], this.img[this.fcs], this.fcs]
      },
      set(v) {
        this.$emit("update", [this.fcs, v[0], v[1], v[2]])
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