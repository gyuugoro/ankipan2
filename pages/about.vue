<template>
  <div>
    <div class="block is-size-1">About</div>
    <div class="block content">

      <p>
        このWebアプリは
        <a href="https://instagram.com/shotaro20060930">@shotaro20060930</a>
        が制作した単語帳アプリで、誰でも無料で使用することができます。
      </p>

      <p>バグなど不具合の報告は僕のInstagramにお願いします。</p>
      <a href="https://instagram.com/shotaro20060930?igshid=NzZlODBkYWE4Ng=="
        class="button is-rounded is-fullwidth block is-danger is-light is-outlined">Instagram</a>

      <p>コードはここに公開しているので、有識者の方！アドバイスをください！</p>
      <a href="https://github.com/gyuugoro/ankipan2"
        class="button is-rounded is-fullwidth block is-dark is-light is-outlined">Github</a>


      <h2>使用言語</h2>
      <p>HTML, CSS, Javascript</p>

      <h2>使用技術</h2>

      <h3>Nuxt.js</h3>
      <a href="https://v2.nuxt.com/">https://v2.nuxt.com/</a>
      <p>ブラウザでの処理は全てNuxt.js上で行っています。</p>

      <h3>Firebase</h3>
      <a href="https://firebase.google.com/">https://firebase.google.com/</a>
      <p>サーバーでの処理は全てFirebase上で行っています。無料で使わせてもらっています。感謝！</p>

      <h3>Vercel</h3>
      <a href="https://vercel.com/">https://vercel.com/</a>
      <p>ドメインを無料で使わせてもらっています。感謝！</p>

      <h3>PWA</h3>
      <a href="https://web.dev/progressive-web-apps/">https://web.dev/progressive-web-apps/</a>
      <p>ギガをくわないようにするため、オフラインでも動作するようにしました。</p>

      <h3>Bulma</h3>
      <a href="https://bulma.io/">https://bulma.io/</a>
      <p>デザインはBulmaをベースにしています。</p>

    </div>


    <nuxt-link to="/" class="block button is-rounded is-fullwidth mt-6">ホームに戻る</nuxt-link>
  </div>
</template>

<script>
export default {

}
</script>

<style></style>