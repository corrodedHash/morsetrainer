<template>
  <div id="letters">
    <span
      v-for="[index, char, css] in letterStates"
      v-bind:class="css"
      v-bind:key="index"
      >{{ char }}</span
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MatchingLetters",
  props: ["statefulLetters"],
  data() {
    return { myLetters: [] };
  },
  watch: {
    statefulLetters() {
      this.myLetters = this.statefulLetters;
    },
  },
  computed: {
    letterStates() {
      let result: Array<[number, string, string]> = [];
      const stateMap = (state: number) => {
        switch (state) {
          case 1:
            return "quizCharacterCorrect";
          case 2:
            return "quizCharacterWrong";
          case 0:
            return "quizCharacterUntouched";
          default:
            return "";
        }
      };
      let i = 0;
      for (const [char, state] of this.myLetters) {
        result.push([i, char, stateMap(state)]);
        i += 1;
      }
      return result;
    },
  },
});
</script>
<style scoped>
.quizCharacterCorrect {
  color: blue;
}

.quizCharacterWrong {
  color: red;
}

.quizCharacterUntouched {
  color: black;
}
</style>
