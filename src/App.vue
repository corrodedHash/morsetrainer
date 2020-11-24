<template>
  <div class="output">
    {{ typedWord }}
  </div>
  <MorseButton
    v-on:letterTyped="handleLetter"
    v-on:backspace="handleBackspace"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MorseButton from "./components/MorseButton.vue";

export default defineComponent({
  name: "App",
  data() {
    return { typedWord: "" };
  },
  components: {
    MorseButton,
  },
  methods: {
    handleLetter(letter: string) {
      const visible_space = "\u2423";
      if (
        this.typedWord.length > 0 &&
        this.typedWord[this.typedWord.length - 1] === visible_space
      ) {
        this.typedWord =
          this.typedWord.substr(0, this.typedWord.length - 1) + " ";
      }
      if (letter === " ") {
        this.typedWord += visible_space;
      } else {
        this.typedWord += letter;
      }
    },
    handleBackspace() {
      this.typedWord = this.typedWord.substr(0, this.typedWord.length - 1);
    },
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
