<template>
  <div>

    <div class="div1">
      <div class="div2">
        <section class="section py-5">
          <div class="container is-max-desktop ">
            <div class="columns is-multiline">

              <slot></slot>
            </div>
          </div>
        </section>
      </div>
    </div>

    <div style="height: 281px;"></div>
  </div>
</template>

<script scoped>
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