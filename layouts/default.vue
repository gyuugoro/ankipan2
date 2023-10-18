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
    this.$store.dispatch("get_books")
  },
  mounted() {
    console.log("default-mounted")
  }
}
</script>