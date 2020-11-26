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
      v-bind:class="{ wrong: enteredWrong }"
      v-model="enteredWord"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MorsePlayer from "@/components/MorsePlayer.vue";
import playWords from "@/beeper";
import { Beeper } from "@/beeper";
import randomEnglishWord from "@/englishWords";
import FrequencySlider from "@/components/listening/FrequencySlider.vue";
export default defineComponent({
  name: "ListenQuiz",
  components: {
    FrequencySlider,
  },
  data() {
    return {
      enteredWord: "",
      wantedWord: randomEnglishWord(),
      autoplayWord: false,
      frequency: 440,
      beeping: undefined as undefined | Beeper,
    };
  },
  watch: {
    enteredWord(new_word: string, old_word: string) {
      if (new_word.toLowerCase() === this.wantedWord.toLowerCase()) {
        this.handleSolve();
      }
    },
    frequency(new_freq) {
      if (this.beeping !== undefined) {
        this.beeping.frequency = new_freq;
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
    setBeep(beep: undefined | Beeper = undefined) {
      if (this.beeping !== undefined) {
        this.beeping.cancel();
      }
      this.beeping = beep;
    },
    playWord() {
      this.setBeep(playWords(this.wantedWord, this.frequency, 0.1));
    },
    playRestWord() {
      if (this.enteredWrong) {
        this.playWord();
        return;
      }
      this.setBeep(
        playWords(
          this.wantedWord.substr(this.enteredWord.length),
          this.frequency,
          0.1
        )
      );
    },
    handleSolve() {
      this.setBeep();
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
.listenQuiz {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
