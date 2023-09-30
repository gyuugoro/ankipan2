<template>
  <div>
    <div class="block is-size-2">単語帳管理</div>
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


      <h4>作り途中</h4>
      <p v-show="creatingdata.length == 0">0コ</p>

      <h4>あなたが作った単語帳</h4>
      <p v-show="mydata.length == 0">0コ</p>
    </div>





    <div class="block">
      <nuxt-link to="/" class="block button is-rounded is-fullwidth is-black">ホームに戻る</nuxt-link>

    </div>

  </div>
</template>

<script>

import { onSignIn, signInGoogle, get_mybooks, get_creatings } from '../../firebase'

export default {
  data() {
    return {
      isSignined: false,
      mydata: [],
      creatingdata: []
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

        this.mydata = []

        mydocs.forEach((doc) => {
          this.mydata.push({
            name: doc.data().name,
            id: doc.id
          })
        })
      }

      const creatingdoc = await get_creatings()

      if (creatingdoc) {

        this.creatingdata = []

        creatingdoc.forEach((doc) => {
          this.creatingdata.push({
            name: doc.data().name,
            id: doc.id
          })
        })
      }

    }
  },
}
</script>

<style></style>