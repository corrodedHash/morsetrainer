<template>
  <div>
    <Menubar :model="quizzes" />
    <div class="p-mt-2">
      <morse-quiz-box v-if="selectedQuiz === 'w'" />
      <listen-quiz v-else-if="selectedQuiz === 'l'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MorseQuizBox from "@/components/typing/MorseQuizBox.vue";
import ListenQuiz from "./components/listening/ListenQuiz.vue";
import Toolbar from "primevue/toolbar";
import Menubar from "primevue/menubar";

export default defineComponent({
  name: "App",
  components: {
    MorseQuizBox,
    ListenQuiz,
    Toolbar,
    Menubar,
  },
  data() {
    return {
      quizzes: [] as { [key: string]: any }[],
      selectedQuiz: "w",
    };
  },
  mounted() {
    this.quizzes = [
      {
        label: "Trainer",
        items: [
          {
            label: "Write",
            command: () => {
              this.selectedQuiz = "w";
            },
          },
          {
            label: "Listen",
            command: () => {
              this.selectedQuiz = "l";
            },
          },
        ],
      },
    ];
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
