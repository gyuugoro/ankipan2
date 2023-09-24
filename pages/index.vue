<template>
  <div>

    <div class="block">
      <div class="is-size-4">Welcome to</div>
      <div class="is-size-1 logo">Ankipan2</div>
    </div>
    <div class="block">

      <transition-group name="home" tag="div" mode="out-in" appear>

        <div key="続きから" class="block has-text-centered" v-if="continue_name != ''">前回の続きから</div>
        <nuxt-link key="続きボタン" to="/books/continue" class="button block is-fullwidth is-rounded"
          v-if="continue_name != ''">{{
            continue_name
          }}</nuxt-link>

        <div key="お気に入り" class="block has-text-centered" v-if="Object.keys(favorites).length != 0">お気に入りたち</div>

        <nuxt-link :to="'/books/' + id" v-for="(title, id) in favorites" :key="'お気に入り' + id"
          class="button block is-fullwidth is-rounded is-warning is-light is-outlined">{{ title }}</nuxt-link>

        <div class="block has-text-centered" key="一覧">単語帳一覧</div>


        <div class="block has-text-centered" v-show="data.length == 0" key="読み込み中">読み込み中...</div>

        <nuxt-link :to="'/Books/' + v.id" v-for="v in data" :key="v.id" class="block button is-rounded is-fullwidth">{{
          v.name
        }}</nuxt-link>

        <div class="block has-text-centered" key="単語帳を作ろう">単語帳を作る</div>

        <nuxt-link key="単語帳を作る" to="/create"
          class="block button is-rounded is-fullwidth is-success is-outlined is-light">作る</nuxt-link>

        <div key="Links" class="block has-text-centered">リンク</div>

        <a key="連絡を取る" href="https://instagram.com/shotaro20060930?igshid=NzZlODBkYWE4Ng=="
          class="button is-rounded is-fullwidth block is-danger is-light is-outlined">Instagram</a>

        <a key="セキュリティの弱点を探したい人はここで" href="https://github.com/gyuugoro/ankipan2"
          class="button is-rounded is-fullwidth block is-dark is-light is-outlined">Github</a>
      </transition-group>
    </div>




  </div>
</template>

<script>
import { get_all } from '../firebase';

export default {
  data() {
    return {
      data: [],
      continue_name: "",
      favorites: {}
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
  },
  mounted() {
    if (localStorage.getItem("continue_another") !== null) {
      this.continue_name = JSON.parse(localStorage.getItem("continue_main"))[0].title
    }
    if (localStorage.getItem("favorites") !== null) {
      this.favorites = JSON.parse(localStorage.getItem("favorites"))
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