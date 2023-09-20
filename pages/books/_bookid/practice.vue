<template>
  <div>
    <appbar>
      <button class=" button is-ghost">中断</button>

      <div class="column my-auto">
        <progress class="progress" value="15" max="30"></progress>
      </div>

      <div class="is-size-5">15/30</div>
    </appbar>

    <yontaku v-if="practice" question="あいうえお？" answer="か" :selection="['か', 'き', 'く', 'け']"
      @next="() => practice = !practice" />

    <check question="あいうえお？" answer="か" v-else @next="() => practice = !practice" />


  </div>
</template>

<script>
export default {
  data() {
    return {
      practice: true,
      book: {
        question: [
          "問題1",
          "問題2",
          "問題3",
          "問題4",
          "問題5",
          "問題6",
          "問題7",
          "問題8",
          "問題9",
          "問題10",
          "問題11",
          "問題12",
          "問題13",
          "問題14",
          "問題15",
          "問題16",
          "問題17",
          "問題18",
          "問題19",
          "問題20",
          "問題21",
          "問題22",
          "問題23",
          "問題24",
          "問題25",
          "問題26",
          "問題27",
          "問題28",
          "問題29",
          "問題30"
        ],
        answer: [
          "答え1",
          "答え2",
          "答え3",
          "答え4",
          "答え5",
          "答え6",
          "答え7",
          "答え8",
          "答え9",
          "答え10",
          "答え11",
          "答え12",
          "答え13",
          "答え14",
          "答え15",
          "答え16",
          "答え17",
          "答え18",
          "答え19",
          "答え20",
          "答え21",
          "答え22",
          "答え23",
          "答え24",
          "答え25",
          "答え26",
          "答え27",
          "答え29",
          "答え30",
        ]
      }
    }
  }
}
</script>

<style></style>