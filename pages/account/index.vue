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


      <trigger name="非公開">
        <p v-show="nonpublics.length == 0">0コ</p>



      </trigger>

      <trigger name="公開">
        <p v-show="publics.length == 0">0コ</p>

      </trigger>
    </div>

    <div class="block">
      <nuxt-link to="/" class="block button is-rounded is-fullwidth is-black">ホームに戻る</nuxt-link>

    </div>

  </div>
</template>

<script>

import { onSignIn, signInGoogle, get_mybooks } from '../../firebase'

export default {
  data() {
    return {
      isSignined: false,
      nonpublics: [],
      publics: []
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

        mydocs[0].forEach((doc) => {
          this.nonpublics.push({
            name: doc.data().name,
            id: doc.id
          })
        })

        mydocs[1].forEach((doc) => {
          this.publics.push({
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