<template>
  <div>

    <div class="columns block is-vcentered is-centered is-multiline">

      <div class=" column is-7">
        <h3 class="subtitle is-4">Welcome to</h3>
        <h1 class="title is-1 logotitle">Ankipan2</h1>
      </div>


      <transition name="books" mode="out-in">

        <div key="プログレス" v-if="progress != 3" class="block column is-7">
          <progress class=" progress is-primary block" :value="progress" max="3"></progress>
          <h3 class="block title is-3 has-text-centered">
            NOW LOADING...
          </h3>
        </div>


        <div key="読み込み結果" v-else class="block column is-7">

          <div class="block" v-show="important_msg != ''">
            <article class="message is-danger">
              <div class="message-header">
                <p>重要な通知</p>
              </div>
              <div class="message-body content" v-html="important_msg">
              </div>
            </article>
          </div>


          <div class="block" v-show="msg != ''">
            <article class="message">
              <div class="message-header">
                <p>割とどうでも良い通知</p>
              </div>
              <div class="message-body content" v-html="msg">
              </div>
            </article>
          </div>


          <lazy-books key=" 自作単語帳一覧" name="You made" :data="this.$store.state.my_books"
            :is_little="this.$store.state.my_books_level <= 1" @load="load_my_books" />

          <lazy-books key="単語帳一覧" name="Public" :data="this.$store.state.books"
            :is_little="this.$store.state.books_level <= 1" @load="load_books" />

          <div class="block">
            <h3 class="title is-3 has-text-centered">More</h3>
          </div>


          <div class="block">
            <share />
          </div>

          <div class="block"> <nuxt-link to="/make"
              class="button is-fullwidth is-rounded is-success is-light is-outlined">単語帳を作成</nuxt-link>
          </div>
          <div class="block"> <nuxt-link to="/manage"
              class="button is-fullwidth is-rounded is-info is-light is-outlined">単語帳を管理</nuxt-link>
          </div>
          <div class="block"> <a href="https://instagram.com/shotaro20060930?igshid=NzZlODBkYWE4Ng==" target="_blank"
              class="button is-fullwidth is-rounded is-danger is-light is-outlined">製作者と連絡を取る</a>
          </div>
          <div class="block"> <nuxt-link to="/about"
              class="button is-fullwidth is-rounded is-dark is-outlined is-light">このアプリについて</nuxt-link>
          </div>

        </div>

      </transition>



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
      progress: 0
    }
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {

      this.progress = 1

      this.$store.dispatch("get_msg").then((msg) => {
        this.msg = msg[0]
        this.important_msg = msg[1]
        this.progress += 1
      })


      this.$store.dispatch("books_level_1", false).then(() => {
        this.progress += 1
      })

      this.$store.dispatch("my_books_level_1", false)

    },
    async load_books() {
      await this.$store.dispatch("books_level_2", false)
      this.data = this.$store.state.books
    },
    async load_my_books() {
      await this.$store.dispatch("my_books_level_2", false)
      this.my_books = this.$store.state.my_books

    }
  },
  mounted() {
    scrollTo({ top: 0 })
  }
}
</script>

<style scoped>
.books-enter-active,
.books-leave-active,
.books-move {
  transition: all 0.25s;
}

.books-leave-to {
  /* transform: scaleX(0); */
  opacity: 0;
}

.books-enter {
  opacity: 0;
  /* opacity: 0; */
}

.logotitle {
  font-family: 'Russo One', sans-serif;
}
</style>
