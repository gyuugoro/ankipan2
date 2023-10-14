<template>
  <div>
    <h1 class="title is-1">管理</h1>
    <div class="block content">

      <div v-if="this.$store.state.user == ''" class="block mt-6">
        <h3>サインイン</h3>
        <p>単語帳を作成するにはサインインする必要があります。</p>
        <p>Googleに比べて匿名アカウントはかなり不安なため。あらかじめご了承ください。</p>
        <div class="columns block is-multiline is-centered">
          <div class="column is-7">
            <button class="button is-fullwidth is-rounded" @click="sign_in_with_google">Googleで続ける</button>
          </div>
          <div class="column is-7">
            <button class="button is-fullwidth is-rounded" @click="sign_in_anonymously">匿名で続ける</button>
          </div>
        </div>

      </div>

      <div v-else-if="this.$store.state.user == 'Google'" class="block mt-6">
        <h3>Googleでログイン中</h3>
        <div class="columns block is-multiline is-centered">
          <div class="column is-7">
            <button class="button is-rounded is-fullwidth" @click="sign_out">サインアウト</button>
          </div>
        </div>
      </div>

      <div v-else-if="this.$store.state.user == '匿名'" class="block mt-6">
        <h3>匿名でログイン中</h3>

        <div class="columns block is-multiline is-centered">
          <div class="column is-7">
            <button class="button is-fullwidth is-rounded" @click="link_with_google">Googleに接続</button>
          </div>
          <div class="column is-7">
            <button class="button is-fullwidth is-rounded is-danger" @click="remove_user">アカウント削除</button>
          </div>
        </div>


      </div>

      <div v-show="this.$store.state.user != ''">

        <h3 class="mt-6">自作単語帳</h3>

        <div class="block columns is-centered">
          <div class="column is-7">
            <nuxt-link to="/make"
              class="block button is-rounded is-fullwidth is-success is-light is-outlined">単語帳を作成</nuxt-link>
          </div>
        </div>


        <p v-show="this.$store.state.my_books.length != 0">一番右のボタンで公開と非公開を切り替えれます。</p>
        <p v-show="this.$store.state.my_books.length != 0">編集ボタンで単語帳の内容を変えることができます。編集を開始すると自動的に非公開になります。</p>



        <div class="field has-addons" v-for="v in this.$store.state.my_books" :key="v.id">
          <div class="control is-expanded">
            <input class="input is-rounded" type="text" :value="v.name" readonly
              @click="$router.push(`/books?id=${v.id}`)">
          </div>
          <div class="control">
            <nuxt-link :to="'/make?id=' + v.id" class="button is-rounded">
              編集
            </nuxt-link>
          </div>
          <div class="control">
            <button class="button is-rounded is-light is-outlined" :class="v.is_public ? 'is-success' : 'is-danger'"
              @click="change_public(v.id, !v.is_public)">
              {{ v.is_public ? '公開中' : '非公開' }}
            </button>
          </div>
        </div>
      </div>

    </div>
    <div class="block">

    </div>
    <div class="block columns is-centered mt-6">
      <div class="column is-7">
        <nuxt-link to="/" class="block button is-rounded is-fullwidth is-black">ホームに戻る</nuxt-link>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Manage"
    }
  },
  mounted() {
    scrollTo({ top: 0 })
  },
  created() {
    this.$store.dispatch("on_change_user", (() => {
      this.$store.dispatch("get_my_books")
    }))
  },
  methods: {
    async sign_in_with_google() {
      await this.$store.dispatch("sign_in_with_google")
    },
    async link_with_google() {
      await this.$store.dispatch("link_with_google")
    },
    async sign_in_anonymously() {
      await this.$store.dispatch("sign_in_anonymously")
    },
    async sign_out() {
      await this.$store.dispatch("sign_out")
    },
    async change_public(id, is_public) {
      await this.$store.dispatch("change_public", [id, is_public])
    },
    async remove_user() {
      await this.$store.dispatch("remove_user")
    }
  },
}
</script>

<style></style>