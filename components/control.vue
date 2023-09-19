<template>
  <div class="div1">
    <div class="div2">
      <section class="section py-5">
        <div class="container is-max-desktop">
          <slot></slot>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.div1 {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100vw;
}

.div2 {
  position: static;
  backdrop-filter: blur(4px);
  border-top: solid 1px black;
}
</style>