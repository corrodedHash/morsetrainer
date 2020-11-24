<template>
  <div class="output">
    {{ typedWord }}
  </div>
  <MorseButton v-on:letterTyped="handleLetter" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MorseButton from "./components/MorseButton.vue";

export default defineComponent({
  name: "MorseInput",
  data() {
    return { typedWord: "" };
  },
  components: {
    MorseButton,
  },
  methods: {
    handleLetter(letter: string) {
      this.typedWord += letter;
    },
  },
});
</script>
