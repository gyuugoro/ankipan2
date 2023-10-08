<template>
  <div class="block field has-addons columns is-gapless is-mobile">
    <p class="control is-4 column">
      <button class="button input share has-text-weight-bold is-rounded" @click="share" readonly>
        {{ text }}
      </button>
    </p>
    <p class="control is-4 column">
      <a class="button input line has-text-weight-bold is-rounded"
        :href="`http://line.me/R/msg/text/?https://ankipan2.vercel.app${$route.fullPath}%0a${title}`" target="_blank"
        rel="nofollow noopener" readonly>LINE</a>
    </p>
    <p class="control is-4 column">
      <a class="button input twitter has-text-weight-bold is-rounded"
        :href="`https://twitter.com/share?url=https://ankipan2.vercel.app${$route.fullPath}&text=${title}&via=sho1216_`"
        rel="nofollow noopener" target="_blank" readonly>TWITTER
      </a>
    </p>

  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "単語帳アプリ - Ankipan2",
      text: "SHARE"
    }
  },
  methods: {
    async share() {
      if ('share' in navigator) {
        await navigator.share({
          title: this.title,
          url: `https://ankipan2.vercel.app${this.$route.fullPath}`
        }).catch((err) => console.log("シェアエラー", err.message))
      } else {
        await navigator.clipboard.writeText(`https://ankipan2.vercel.app${this.$route.fullPath}`).catch((err) => console.log("コピーエラー", err.message))

        this.text = "COPIED"
        setTimeout(() => {
          this.text = "SHARE"
        }, 5000)
      }
    },
  },
}
</script>

<style scoped>
.share {
  color: #78909C !important;
}

.twitter {
  color: #1DA1F2 !important;

}

.line {
  color: #06c755 !important;
}
</style>