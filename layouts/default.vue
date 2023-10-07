<template>
  <div>
    <transition name="logo">
      <div class="loading" v-if="loading">
        <div class="block">
          <h3 class="subtitle is-4">Welcome to</h3>
          <h1 class="title is-1">Ankipan2</h1>
        </div>

      </div>
    </transition>

    <section class="section">
      <div class="container is-max-desktop">
        <Nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    this.loading = false
  }
}
</script>

<style scoped>
.loading {
  position: fixed;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 100;
}

.loading div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.title {
  font-family: 'Russo One', sans-serif;
}

.logo-leave-active {
  transition: opacity 1s 1s;
}

.logo-leave-to {
  opacity: 0;
}
</style>