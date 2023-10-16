<template>
  <div>
    <div style="height: 48px;">

    </div>
    <div class="div1">
      <div class="div2">
        <section class="section py-5">
          <div class="container is-max-desktop">
            <div class="columns is-vcentered is-mobile">

              <slot></slot>
            </div>
          </div>
        </section>
      </div>
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
  top: 0px;
  left: 0px;
  width: 100vw;
  z-index: 100;
}

.div2 {
  position: static;
  backdrop-filter: blur(4px);
  border-bottom: solid 1px black;
}
</style>