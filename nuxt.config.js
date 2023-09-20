export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ankipan2',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css" },
      { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/@mdi/font@7.2.96/css/materialdesignicons.min.css" }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ja'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  runtimeConfig: {
    public: {
      FB_API_KEY: process.env.FB_API_KEY || "",
      FB_AUTH_DOMAIN: process.env.FB_AUTH_DOMAIN || "",
      FB_PROJECT_ID: process.env.FB_PROJECT_ID || "",
      FB_STORAGE_BUCKET: process.env.FB_STORAGE_BUCKET || "",
      FB_MESSAGING_SENDER_ID: process.env.FB_MESSAGING_SENDER_ID || "",
      FB_APP_ID: process.env.FB_APP_ID || "",
      FB_MEASUREMENT_ID: process.env.FB_MEASUREMENT_ID || "",
    },
  },
}
