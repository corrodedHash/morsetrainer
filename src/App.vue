<template>
  <div>
    <select v-model="selectedQuiz">
      <option value="write">Write</option>
      <option value="listen">Listen</option>
    </select>
    <morse-quiz-box v-if="selectedQuiz === 'write'" />
    <listen-quiz v-else-if="selectedQuiz === 'listen'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MorseQuizBox from "@/components/typing/MorseQuizBox.vue";
import ListenQuiz from "./components/listening/ListenQuiz.vue";

export default defineComponent({
  name: "App",
  components: {
    MorseQuizBox,
    ListenQuiz,
  },
  data() {
    return { selectedQuiz: "write" };
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
