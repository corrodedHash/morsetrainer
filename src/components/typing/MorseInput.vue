<template>
  <div class="morseInput">
    <div class="output">
      {{ formattedWord }}
    </div>
    <morse-button
      v-on:letterTyped="handleLetter"
      v-on:backspace="handleBackspace"
      v-on:wordEnded="handleEndword"
    />
  </div>
</template>

<script lang="ts" src="./MorseInput.ts" />

<style scoped>
.morseInput {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.output {
  background-color: lightblue;
  font-size: x-large;
  width: max-content;
  display: inline-block;
  padding-left: 5px;
  padding-right: 5px;
  min-height: 2em;
  line-height: 2;
}
.output:empty {
  background-color: transparent;
}
</style>
