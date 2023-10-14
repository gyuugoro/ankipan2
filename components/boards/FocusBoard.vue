<template>
  <div class="block box">


    <!-- 画像 -->
    <figure class="image" v-show="img != ''">
      <img :src="url">
    </figure>

    <!-- //最最上段 -->
    <div class="field is-grouped">
      <p class="control is-expanded">
        <button class="button is-rounded is-static">{{ value[3] + 1 }}</button>
      </p>
      <p class="control file is-light is-fullwidth">
        <label class="file-label">
          <input class="file-input" accept="image/*" type="file" name="resume" @change="upload">
          <span class="file-cta">
            <span class="file-label">
              {{ url == "" ? '画像を入れる' : "画像を変える" }}
            </span>
          </span>
        </label>
      </p>

      <p class="control">
        <button class="button is-rounded is-danger is-light" v-show="url == ''" @click="delete_img">画像を削除</button>
      </p>
    </div>

    <!-- 最上段 -->
    <div class="field has-addons">
      <p class="control">
        <a class="button is-rounded is-static">
          Q
        </a>
      </p>
      <p class="control is-expanded">
        <input class="input is-rounded" type="text" placeholder="問題文" v-model="ques" @keydown.enter="godown" ref="up"
          @keydown.shift.down="ardown">
      </p>
    </div>

    <!-- 中段 -->
    <div class="field has-addons">
      <div class="control">
        <a class="button is-rounded is-static">
          A
        </a>
      </div>
      <div class="control is-expanded">
        <input class="input is-rounded" type="text" placeholder="答え" v-model="ans" @keydown.enter="enter" ref="down"
          :class="toolong ? 'is-danger' : ''" @keydown.shift.up="arup">
      </div>
    </div>
    <p v-show="toolong" class="help is-danger">文字数を減らしてください。スマホで表示しきれません。</p>

    <!-- 最下段 -->
    <div class=" field is-grouped">
      <p class="control">
        <button class="button is-danger is-rounded" @click="remove">単語を削除</button>
      </p>
      <p class="control is-expanded"></p>
      <p class="control">
        <button class="button is-rounded" @click="closing">閉じる</button>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    value: Array
  },
  mounted() {
    this.$refs.up.focus();
    this.download()
  },
  data() {
    return {
      ques: this.value[0],
      ans: this.value[1],
      img: this.value[2],
      url: ""
    }
  },
  methods: {
    closing() {

      if (this.ques == "" && this.ans == "" && this.img == "") {
        this.remove()
      } else {
        this.$emit('close')
      }
    },
    remove() {
      this.$emit('delete')
    },
    enter(e) {
      if (e.keyCode == 13) {
        if (this.ques == "" && this.ans == "" && this.img == "") {
          this.remove()
        } else {
          this.$emit("enter")
        }
      }
    },
    godown(e) {
      if (e.keyCode == 13) {
        this.$refs.down.focus()
      }
    },
    delete_img() {
      this.img = ""
    },
    async upload(e) {

      const now = Date.now()

      const image = e.target.files[0]
      const path = await this.$store.dispatch("upload_img", [image, now])
      console.log(path.ref._location.path)
      this.img = path.ref._location.path
    },
    async download() {
      if (this.img != "") {
        this.url = await this.$store.dispatch("download_img", this.img)
      }
    },
    arup() {
      this.$refs.up.focus();
    },
    ardown() {
      this.$refs.down.focus();
    }
  },
  watch: {
    ques() {
      this.$emit("input", [this.ques, this.ans, this.img])
    },
    ans() {
      this.$emit("input", [this.ques, this.ans, this.img])
    },
    img() {
      this.$emit("input", [this.ques, this.ans, this.img])
      this.download()
    }
  },
  computed: {
    toolong() {
      if (this.ans.length < 20) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style></style>