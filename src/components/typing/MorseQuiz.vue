<template>
  <div class="flex flex-column justify-content-center">
    <transition name="fade" mode="out-in">
    <matching-letters
      :statefulLetters="letters"
      class="shadow-1 px-3 py-1 text-center"
      :key="questionId"
    />
    </transition>
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
    return { morsedWord: "", wantedWord: "", questionId: 0 };
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
      this.questionId += 1;
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
.fade-enter-active {
  transition: all .1s ease;
}
.fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
