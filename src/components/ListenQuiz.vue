<template>
  <div>
    <div>
      <input type="checkbox" v-model="autoplayWord" />
      <button v-on:click="playWord">Play!</button>
    </div>
    <input
      type="text"
      v-bind:class="{ wrong: enteredWrong }"
      v-model="enteredWord"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MorsePlayer from "@/components/MorsePlayer.vue";
import playWords from "@/beeper";
import randomEnglishWord from "@/englishWords";
export default defineComponent({
  name: "ListenQuiz",
  data() {
    return {
      enteredWord: "",
      wantedWord: randomEnglishWord(),
      autoplayWord: false,
    };
  },
  watch: {
    enteredWord(new_word: string, old_word: string) {
      if (new_word.toLowerCase() === this.wantedWord.toLowerCase()) {
        this.handleSolve();
      }
    },
  },
  computed: {
    enteredWrong(): boolean {
      return !this.wantedWord
        .toLowerCase()
        .startsWith(this.enteredWord.toLowerCase());
    },
  },
  methods: {
    playWord() {
      playWords(this.wantedWord, 440, 0.1);
    },
    handleSolve() {
      this.enteredWord = "";
      this.wantedWord = randomEnglishWord();
      if (this.autoplayWord) {
        this.playWord();
      }
    },
  },
});
</script>
<style scoped>
.wrong {
  background-color: red;
}
</style>
