<template>
  <section class="section">
    <div class="container is-max-desktop">
      <Nuxt />
    </div>
  </section>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("created")
  }
}
</script>