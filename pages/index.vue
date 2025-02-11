<template>
  <div>

    <div class="columns block is-vcentered is-centered is-multiline">

      <div class=" column is-7">
        <h3 class="subtitle is-4">Welcome to</h3>
        <h1 class="title is-1 logotitle">Ankipan2</h1>
      </div>


      <div class="column is-7" v-show="important_msg != ''">
        <article class="message is-danger">
          <div class="message-header">
            <p>重要な通知</p>
          </div>
          <div class="message-body content" v-html="important_msg">
          </div>
        </article>
      </div>

      <div class="column is-7" v-show="msg != ''">
        <article class="message">
          <div class="message-header">
            <p>割とどうでも良い通知</p>
          </div>
          <div class="message-body content" v-html="msg">
          </div>
        </article>
      </div>

      <transition name="main">
        <lazy-books key="単語帳一覧" name="単語帳一覧" :data="this.$store.state.books" class="column is-7" />
      </transition>


      <div class="column is-7">
        <h3 class="title is-3 has-text-centered">共有＆リンク</h3>
      </div>
      <div class="column is-7">
        <share />
      </div>

      <div class="column is-7"> <nuxt-link to="/medianclear"
          class="button is-fullwidth is-rounded is-dark is-outlined is-light">メジアンクリア</nuxt-link>
      </div>

      <div class="column is-7"> <nuxt-link to="/make"
          class="button is-fullwidth is-rounded is-success is-light is-outlined">単語帳を作成</nuxt-link>
      </div>
      <div class="column is-7"> <nuxt-link to="/manage"
          class="button is-fullwidth is-rounded is-info is-light is-outlined">単語帳を管理</nuxt-link>
      </div>
      <div class="column is-7"> <a href="https://instagram.com/sho.taro0930" target="_blank"
          class="button is-fullwidth is-rounded is-danger is-light is-outlined">製作者と連絡を取る</a>
      </div>
      <div class="column is-7"> <nuxt-link to="/about"
          class="button is-fullwidth is-rounded is-dark is-outlined is-light">このアプリについて</nuxt-link>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Home",
      link: [
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Russo+One&display=swap&text=Ankipan2" },
      ]
    }
  },
  data() {
    return {
      important_msg: "",
      msg: "",
    }
  },
  created() {
    this.$store.dispatch("get_msg").then((msg) => {
      this.msg = msg[0]
      this.important_msg = msg[1]
    })
  },
  mounted() {
    scrollTo({ top: 0 })
    console.log("index-mounted")
  },
}
</script>

<style scoped>
.logotitle {
  font-family: 'Russo One', sans-serif;
}
</style>
