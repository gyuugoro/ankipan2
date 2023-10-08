<template>
  <div>

    <div class="columns block is-vcentered is-centered is-multiline">

      <div class=" column is-7">
        <h3 class="subtitle is-4">Welcome to</h3>
        <h1 class="title is-1 logotitle">Ankipan2</h1>
      </div>


      <transition name="books" mode="out-in">

        <div key="ローディング" class="column is-7" v-if="loading">

          <h3 class="title is-3 has-text-centered shake-rotate shake-constant">
            LOADING
          </h3>
        </div>

        <div v-else class="column is-7">

          <lazy-books key="トピック" :name="topic_name" :data="topics" />

          <lazy-books key="自作単語帳一覧" name="You made" :data="myBooks" />

          <lazy-books key="単語帳一覧" name="Public" :data="data" />


        </div>

      </transition>


      <div class="column is-7">
        <h3 class="title is-3 has-text-centered">リンク</h3>
      </div>


      <div class="column is-7">
        <share />
      </div>

      <div class="column is-7"> <nuxt-link to="/make"
          class="button is-fullwidth is-rounded is-success is-light is-outlined">単語帳を作成</nuxt-link>
      </div>
      <div class="column is-7"> <nuxt-link to="/manage"
          class="button is-fullwidth is-rounded is-info is-light is-outlined">単語帳を管理</nuxt-link>
      </div>
      <div class="column is-7"> <a href="https://instagram.com/shotaro20060930?igshid=NzZlODBkYWE4Ng==" target="_blank"
          class="button is-fullwidth is-rounded is-danger is-light is-outlined">Instagram</a>
      </div>
      <div class="column is-7"> <nuxt-link to="/about"
          class="button is-fullwidth is-rounded is-dark is-outlined is-light">このアプリについて</nuxt-link>
      </div>

    </div>
  </div>
</template>

<script>
import { get_all, get_mybooks, get_topic, get_all_little, get_mybooks_little } from '../firebase';

export default {
  head() {
    return {
      title: "Home"
    }
  },
  data() {
    return {
      data: [],
      myBooks: [],
      topics: [],
      topic_name: "",
      loading: true,
    }
  },
  created() {
    this.getdata();
  },
  methods: {
    async getdata() {
      const docs = await get_all_little()

      if (docs) {
        this.data = []

        docs.forEach((doc) => {
          this.data.push({
            name: doc.data().name,
            id: doc.id
          })
        })
      }


      const mydocs = await get_mybooks_little()

      if (mydocs) {
        this.myBooks = []

        mydocs.forEach((doc) => {
          this.myBooks.push({
            name: doc.data().name,
            id: doc.id,
          })
        })
      }

      const str_mytopics = await get_topic()

      if (str_mytopics) {

        const mytopics = JSON.parse(str_mytopics)

        this.topics = mytopics.content

        this.topic_name = mytopics.name


      }

      this.loading = false


      const docs2 = await get_all()

      if (docs2) {
        this.data = []

        docs2.forEach((doc) => {
          this.data.push({
            name: doc.data().name,
            id: doc.id
          })
        })
      }

      const mydocs2 = await get_mybooks()

      if (mydocs2) {
        this.myBooks = []

        mydocs2.forEach((doc) => {
          this.myBooks.push({
            name: doc.data().name,
            id: doc.id,
          })
        })
      }
    },
  },
  mounted() {
    scrollTo({ top: 0 })
  }
}
</script>

<style scoped>
.books-enter-active,
.books-leave-active {
  transition: all 0.25s;
}

.books-leave-to {
  /* transform: scaleX(0); */
  opacity: 0;
}

.books-enter {
  transform: scaleX(0);
  /* opacity: 0; */
}

.logotitle {
  font-family: 'Russo One', sans-serif;
}
</style>