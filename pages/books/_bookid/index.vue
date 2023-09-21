<template>
  <div>
    {{ text }}
  </div>
</template>

<script>
import { get_book_id } from "../../../firebase"

export default {
  data() {
    return {
      text: "失敗"
    }
  },
  created() {
    (async () => {
      const data = await get_book_id("owirttFmsMyrs7F2MKoo")

      this.text = data.name
    })()
  }
}
</script>

<style></style>