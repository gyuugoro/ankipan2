<template>
  <div>
    <h1 class="title is-1">管理</h1>
    <div class="block content">

      <div v-if="signin == ''" class="block mt-6">
        <h3>サインイン</h3>
        <p>単語帳を作成するにはサインインする必要があります。</p>
        <p>Googleに比べて匿名アカウントは<strong>かなり不安定</strong>なため。あらかじめご了承ください。</p>
        <div class="columns block is-multiline is-centered">
          <div class="column is-7">
            <button class="button is-fullwidth is-rounded" @click="signInWithGoogle">Googleで続ける</button>
          </div>
          <div class="column is-7">
            <button class="button is-fullwidth is-rounded" @click="signInWithAnonymous">匿名で続ける</button>
          </div>
        </div>

      </div>

      <div v-else-if="signin == 'Google'" class="block mt-6">
        <h3>Googleでログイン中</h3>
        <div class="columns block is-multiline is-centered">
          <div class="column is-7">
            <button class="button is-rounded is-fullwidth" @click="signOut">サインアウト</button>
          </div>
        </div>
      </div>

      <div v-else-if="signin == '匿名'" class="block mt-6">
        <h3>匿名でログイン中</h3>

        <div class="columns block is-multiline is-centered">
          <div class="column is-7">
            <button class="button is-fullwidth is-rounded" @click="linkWithGoogle">Googleに接続</button>
          </div>
          <div class="column is-7">
            <button class="button is-fullwidth is-rounded is-danger" @click="deleteUser">アカウント削除</button>
          </div>
        </div>


      </div>

      <div v-show="signin != ''">

        <h3 class="mt-6">自作単語帳</h3>

        <div class="block columns is-centered">
          <div class="column is-7">
            <nuxt-link to="/make"
              class="block button is-rounded is-fullwidth is-success is-light is-outlined">単語帳を作成</nuxt-link>
          </div>
        </div>


        <p v-show="myBooks.length != 0">一番右のボタンで公開と非公開を切り替えれます。</p>
        <p v-show="myBooks.length != 0">編集ボタンで単語帳の内容を変えることができます。編集を開始すると自動的に非公開になります。</p>



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

import { onSignIn, signInGoogle, linkGoogle, signInAnonymous, signOutAll, get_mybooks, change_public, removeUser } from '../firebase'

export default {
  head() {
    return {
      title: "Manage"
    }
  },
  data() {
    return {
      signin: "",
      myBooks: []
    }
  },
  mounted() {

    scrollTo({ top: 0 })

    onSignIn((user) => {
      if (user) {
        if (user.isAnonymous) {
          this.signin = "匿名"
        } else {
          this.signin = "Google"
        }

        this.getdata()
      } else {
        this.signin = ""
      }
    })
  },
  methods: {
    async signInWithGoogle() {
      await signInGoogle()
    },
    async linkWithGoogle() {
      await linkGoogle()
    },
    async signInWithAnonymous() {
      await signInAnonymous()
    },
    async signOut() {
      await signOutAll()
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
    },
    async deleteUser() {
      await removeUser()
    }
  },
}
</script>

<style></style>