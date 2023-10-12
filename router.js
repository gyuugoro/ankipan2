import Vue from 'vue'
import Router from 'vue-router'

import HomePage from './pages/index.vue'

Vue.use(Router)

const dynamically = (promise) => {
  console.log("ページの読み込み")
  return promise.then(v => v.default || v)
}

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: HomePage
      },
      {
        path: '/about',
        component: () => dynamically(import("./pages/about.vue"))
      },
      {
        path: '/make',
        component: () => dynamically(import("./pages/make.vue"))
      },
      {
        path: '/manage',
        component: () => dynamically(import("./pages/manage.vue"))
      },
      {
        path: '/books',
        component: () => dynamically(import("./pages/books.vue"))
      }
    ]
  })
}