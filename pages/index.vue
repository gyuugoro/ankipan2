<template>
  <div>

    <div class="block">
      <div class="is-size-4">Welcome to</div>
      <div class="is-size-1 logo">Ankipan2</div>
    </div>
    <div class="block">

      <transition-group name="home" tag="div" mode="out-in" appear>

        <div v-show="data.length == 0" key="読み込み中">読み込み中...</div>

        <nuxt-link :to="'/Books/' + v.id" v-for="v in data" :key="v.id" class="block button is-rounded is-fullwidth">{{
          v.name
        }}</nuxt-link>

        <nuxt-link key="単語帳を作る" to="/create" class="block button is-rounded is-fullwidth">単語帳を作る</nuxt-link>

        <a key="連絡を取る" href="https://instagram.com/myaaawunder?igshid=YTQwZjQ0NmI0OA=="
          class="button is-rounded is-fullwidth block is-success is-light">製作者と連絡を取る</a>
      </transition-group>
    </div>




  </div>
</template>

<script>
import { get_all } from '../firebase';

export default {
  data() {
    return {
      data: []
    }
  },
  created() {
    (() => this.getdata())()
  },
  methods: {
    async getdata() {
      const docs = await get_all()
      docs.forEach((doc) => {
        this.data.push({
          name: doc.data().name,
          id: doc.id
        })
      })

    }
  }
}
</script>

<style scoped>
.logo {
  font-family: 'Russo One', sans-serif;
}

.home-move,
/* 移動する要素にトランジションを適用 */
.home-enter-active,
.home-leave-active {
  transition: all 0.25s ease;
}

.home-enter,
.home-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* leave する項目をレイアウトフローから外すことで
   アニメーションが正しく計算されるようになる */
.home-leave-active {
  position: absolute !important;
  width: 100%;
}
</style>