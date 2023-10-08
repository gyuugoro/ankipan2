<template>
  <div>
    <h1 class="title is-1">About</h1>
    <div class="block content">

      <p>
        このWebアプリは
        <a href="https://instagram.com/shotaro20060930" target="_blank">@shotaro20060930</a>
        が制作した単語帳アプリで、誰でも無料で使用することができます。
      </p>

      <p>バグなど不具合の報告は僕のInstagramにお願いします。</p>
      <div class="block columns is-centered">
        <div class="column is-7">
          <a href="https://instagram.com/shotaro20060930?igshid=NzZlODBkYWE4Ng==" target="_blank"
            class="button is-rounded is-fullwidth block is-danger is-light is-outlined">Instagram</a>
        </div>
      </div>

      <p>コードはここに公開しているので、有識者の方！アドバイスをください！</p>
      <div class="block columns is-centered">
        <div class="column is-7">
          <a href="https://github.com/gyuugoro/ankipan2" target="_blank"
            class="button is-rounded is-fullwidth block is-dark is-light is-outlined">Github</a>
        </div>
      </div>

      <p>単語帳はここから誰でも追加できます。単語帳を非公開にして自分だけが利用することもできます。</p>
      <div class="block columns is-centered">
        <div class="column is-7">
          <nuxt-link to="/make"
            class="button is-rounded is-fullwidth block is-success is-light is-outlined">単語帳を作成</nuxt-link>
        </div>
      </div>

      <p>作った単語帳はここで管理できます。</p>
      <div class="block columns is-centered">
        <div class="column is-7">
          <nuxt-link to="/manage"
            class="button is-rounded is-fullwidth block is-info is-light is-outlined">単語帳を管理</nuxt-link>

        </div>
      </div>

      <h2>使用言語</h2>
      <p>HTML, CSS, Javascript</p>

      <h2>使用技術</h2>

      <h3>Nuxt.js</h3>
      <a href="https://v2.nuxt.com/" target="_blank">https://v2.nuxt.com/</a>
      <p>ブラウザでの処理は全てNuxt.js上で行っています。</p>

      <h3>Firebase</h3>
      <a href="https://firebase.google.com/" target="_blank">https://firebase.google.com/</a>
      <p>サーバーでの処理は全てFirebase上で行っています。無料で使わせてもらっています。感謝！</p>

      <h3>Vercel</h3>
      <a href="https://vercel.com/" target="_blank">https://vercel.com/</a>
      <p>ドメインを無料で使わせてもらっています。感謝！</p>

      <h3>PWA</h3>
      <a href="https://web.dev/progressive-web-apps/" target="_blank">https://web.dev/progressive-web-apps/</a>
      <p>最新技術を使用しオフラインでも動作するようにしました。</p>

      <h3>Bulma</h3>
      <a href="https://bulma.io/" target="_blank">https://bulma.io/</a>
      <p>デザインはBulmaをベースにしています。</p>

    </div>


    <div class="block columns is-centered">
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
      title: "About"
    }
  },
  mounted() {
    scrollTo({ top: 0 })
  }
}
</script>
