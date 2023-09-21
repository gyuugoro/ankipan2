<template>
  <div>
    <appbar>

      <div class="column my-auto">
        <progress class="progress is-success" value="15" max="30"></progress>
      </div>

    </appbar>


    <first-card title="タイトル" />
    <yontaku-card question="問題" answer="答え" :selection="['選択肢１', '選択肢2', '選択肢3', '答え']" />
    <check-card question="問題" answer="答え" />
    <rest-card />
    <finish-card />

  </div>
</template>

<script>
import FirstCard from '../../../components/cards/FirstCard.vue'
import FinishCard from '../../../components/cards/FinishCard.vue'
import CheckCard from '../../../components/cards/CheckCard.vue'
import YontakuCard from '../../../components/cards/YontakuCard.vue'
import RestCard from '../../../components/cards/RestCard.vue'


export default {
  components: { FirstCard, FinishCard, CheckCard, YontakuCard, RestCard }
}
</script>

<style></style>