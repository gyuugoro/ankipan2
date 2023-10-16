export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  // target: 'static',
  // ssr: false,
  ssr: false,

  target: "static",


  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Ankipan2',
    title: "Home",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Welcome to Ankipan2!. Ankipan2は@shotaro20060930(インスタ)が制作した単語帳アプリで、誰でも無料で使用することができます。' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "./assets/main.css",
    "bulma/css/bulma.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "./plugins/firebase.client.js"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/router'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ja',
      theme_color: "#ffffff",
      start_url: "/",
    },
    meta: {
      ogHost: "https://ankipan2.vercel.app/",
      twitterCard: "summary",
      twitterSite: "@sho1216_",
      twitterCreator: "@sho1216_",
      mobileAppIOS: true
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  env: {
    fb_api_key: process.env.FB_API_KEY,
    fb_auth_domain: process.env.FB_AUTH_DOMAIN,
    fb_project_id: process.env.FB_PROJECT_ID,
    fb_storage_bucket: process.env.FB_STORAGE_BUCKET,
    fb_messaging_sender_id: process.env.FB_MESSAGING_SENDER_ID,
    fb_app_id: process.env.FB_APP_ID,
    fb_measurement_id: process.env.FB_MEASUREMENT_ID
  },

  loading: {
    color: 'black',
    height: '5px'
  },
  loadingIndicator: {
    name: 'cube-grid',
    color: 'black',
    background: 'white'
  },

  generate: {
    routes: [
      '/'
    ]
  }
}
