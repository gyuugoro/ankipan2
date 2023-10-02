<template>
  <div>
    <h1 class="title is-1">管理</h1>
    <div class="block content">


      <div v-if="isSignined" class="block">
        <div class="notification is-primary has-text-centered is-light">
          <p>サインイン成功！</p>
        </div>
      </div>
      <div v-else class="block">
        <p>Googleアカウントを利用してサインインすると別のデバイスと同期できます。</p>
        <button class="button is-rounded is-fullwidth" @click="signIn">
          Googleでサインイン
        </button>
      </div>
      <p v-show="myBooks.length != 0">一番右のボタンで公開と非公開を切り替えれます。</p>
      <p v-show="myBooks.length != 0">編集ボタンで単語帳の内容を変えることができます。編集を開始すると自動的に非公開になります。</p>
    </div>



    <div class="field has-addons" v-for="v in myBooks" :key="v.id">
      <div class="control is-expanded">
        <input class="input is-rounded" type="text" :value="v.name" readonly>
      </div>
      <div class="control">
        <nuxt-link :to="'/make?id=' + v.id" class="button is-rounded">
          編集
        </nuxt-link>
      </div>
      <div class="control">
        <button class="button is-rounded is-light is-outlined" :class="v.isPublic ? 'is-success' : 'is-danger'"
          @click="changePublic(v.id, !v.isPublic)">
          {{ v.isPublic ? '公開中' : '非公開' }}
        </button>
      </div>
    </div>

    <div class="block">
      <nuxt-link to="/" class="block button is-rounded is-fullwidth is-black">ホームに戻る</nuxt-link>
    </div>

  </div>
</template>

<script>

import { onSignIn, signInGoogle, get_mybooks, change_public } from '../firebase'

export default {
  data() {
    return {
      isSignined: false,
      myBooks: []
    }
  },
  mounted() {

    onSignIn((user) => {
      if (user) {
        this.isSignined = !user.isAnonymous
        this.getdata()
      }
    })
  },
  methods: {
    async signIn() {
      await signInGoogle()
    },
    async getdata() {
      const mydocs = await get_mybooks()

      if (mydocs) {

        this.myBooks = []

        mydocs.forEach((doc) => {
          this.myBooks.push({
            name: doc.data().name,
            id: doc.id,
            isPublic: doc.data().public
          })
        })

      }
    },
    async changePublic(id, ispublic) {
      await change_public(id, ispublic)
      await this.getdata()
    }
  },
}
</script>

<style></style>