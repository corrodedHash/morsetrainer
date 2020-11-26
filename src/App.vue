<template>
  <MorseQuiz v-bind:value="askedWord" v-on:enteredWord="handleWord" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MorseQuiz from "@/components/MorseQuiz.vue";

export default defineComponent({
  name: "App",
  components: {
    MorseQuiz,
  },
  data() {
    return { askedWord: "hehe " };
  },
  methods: {
    handleWord() {
      console.log("Did it");
      this.askedWord = "blabla";
    },
  },
});
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
