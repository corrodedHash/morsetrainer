<template>
  <morse-quiz v-bind:value="askedWord" v-on:enteredWord="handleWord" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MorseQuiz from "@/components/MorseQuiz.vue";
import randomEnglishWord from "@/englishWords";

export default defineComponent({
  name: "MorseQuizBox",
  components: {
    MorseQuiz,
  },
  data() {
    return { askedWord: randomEnglishWord() };
  },
  methods: {
    handleWord() {
      this.askedWord = randomEnglishWord();
    },
  },
});
</script>
