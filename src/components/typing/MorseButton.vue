<template>
  <button
    class="morse_button"
    v-on:keydown="handleKeydown"
    v-on:keyup="handleKeyup"
    v-on:touchstart="handleKeydown"
    v-on:touchend="handleKeyup"
    v-on:touchmove="handleTouchmove"
    autofocus
  >
    {{ currentDots }}
  </button>
</template>

<script lang="ts" src="./MorseButton.ts" />

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.morse_button {
  min-height: 200px;
  min-width: 200px;
  width: 10vh;
  height: 10vh;
  max-height: 200vh;
  max-width: 10vw;

  border-style: inset;
  border-width: 4px;
  border-radius: 20px;
  border-color: gray;
  font-size: x-large;
  font-weight: bold;
  background-color: rgb(150, 118, 118);
}
.morse_button:focus {
  border-color: rgb(71, 71, 235);
}
</style>
