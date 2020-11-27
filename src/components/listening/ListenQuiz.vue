<template>
  <div class="listenQuiz">
    <div>
      <input type="checkbox" v-model="autoplayWord" />
      <button v-on:click="playWord">Play!</button
      ><button v-on:click="playRestWord">Play rest</button><br />
      <frequency-slider v-model="frequency" />
      <br />
    </div>
    <input
      type="text"
      class="answerBox"
      v-bind:class="{ wrong: enteredWrong }"
      v-model="enteredWord"
    />
  </div>
</template>

<script lang="ts" src="./ListenQuiz.ts" />
<style scoped>
.answerBox {
  position: relative;
}
.wrong {
  background-color: red;
}
.listenQuiz {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
</style>
