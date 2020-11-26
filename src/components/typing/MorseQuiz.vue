<template>
  <div class="morseQuiz">
    <matching-letters v-bind:statefulLetters="letters" />
    <morse-input v-model="morsedWord" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MorseInput from "@/components/typing/MorseInput.vue";
import MatchingLetters from "@/components/typing/MatchingLetters.vue";

export default defineComponent({
  name: "MorseQuiz",
  data() {
    return { morsedWord: "", wantedWord: "" };
  },
  mounted() {
    this.wantedWord = this.value;
  },
  emits: ["enteredWord"],
  props: { value: { type: String, required: true } },
  components: { MorseInput, MatchingLetters },
  watch: {
    morsedWord(new_word: string, old_word: string) {
      if (new_word.toLowerCase() === this.wantedWord.toLowerCase()) {
        this.$emit("enteredWord");
        this.morsedWord = "";
      }
    },
    value(new_value: string, old_value: string) {
      this.wantedWord = new_value;
    },
  },
  computed: {
    letters() {
      let result = [];
      for (let index = 0; index < this.wantedWord.length; index++) {
        const element: string = this.wantedWord[index];
        let result_state = 2;
        if (this.morsedWord.length <= index) {
          result_state = 0;
        } else if (
          this.morsedWord[index].toLowerCase() === element.toLowerCase()
        ) {
          result_state = 1;
        }
        result.push([element, result_state]);
      }
      return result;
    },
  },
});
</script>

<style scoped>
.morseQuiz {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
