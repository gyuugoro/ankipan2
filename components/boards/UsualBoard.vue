<template>
  <input :value="'Q:' + value[0] + ' A:' + value[1]" class="block button is-fullwidth is-rounded" readonly
    @click="click" />
</template>

<script>
export default {
  props: {
    value: Array
  },
  methods: {
    click() {
      this.$emit("clickme")
    }
  }
}
</script>
<style></style >


