<template>
  <div>
    <Menubar :model="quizzes" />
    <div class="mt-2">
      <morse-quiz-box v-if="selectedQuiz === 'w'" />
      <listen-quiz
        v-else-if="selectedQuiz === 'l'"
        :frequency="frequency"
        :unitTime="unitTime"
      />
    </div>
  </div>
  <option-bar
    v-model:frequency="frequency"
    v-model:unitTime="unitTime"
    v-model:visible="optionsVisible"
  />

  <Dialog v-model:visible="lmDict" :dismissableMask="true" :modal="true">
    <template #header> <h3>How to Morse</h3> </template>
    <card>
      <template #title>Timing</template>
      <template #content>
        <ul style="list-style-type: none">
          <li>
            Dot (.) is morsed by holding the button for
            <span class="font-bold">one</span> time unit.
          </li>
          <li>
            Dash (-) is morsed by holding the button for
            <span class="font-bold">three</span> time units.
          </li>
        </ul>
        <ul style="list-style-type: none">
          <li>
            The time between signals in a letter is
            <span class="font-bold">one</span> time unit.
          </li>
          <li>
            The time between letters in a word is
            <span class="font-bold">three</span> time units.
          </li>
          <li>
            The time between words (a space) is
            <span class="font-bold">seven</span> time units.
          </li>
        </ul>
      </template>
    </card>
    <card>
      <template #title>Dictionary</template>
      <template #content>
        <table>
          <tr v-for="entry of lmDictTable" :key="entry.letter">
            <td>
              <span class="px-1">{{ entry.letter.toUpperCase() }}</span>
            </td>
            <td>
              <span class="px-1 text-bold">{{ entry.code }}</span>
            </td>
          </tr>
        </table>
      </template>
    </card>
  </Dialog>
  <Dialog
    v-if="selectedQuiz === 'w'"
    v-model:visible="usage"
    :dismissableMask="true"
    :modal="true"
  >
    <template #header><h3>Usage</h3></template> Backspace or swipe to left to
    delete last character.<br />

    When on desktop, make sure to click the gray area once to put the morse
    button into focus, then press any key.<br />

    When on mobile, just press the button.<br />
  </Dialog>
  <Dialog
    v-if="selectedQuiz === 'l'"
    v-model:visible="usage"
    :dismissableMask="true"
    :modal="true"
  >
    <template #header><h3>Usage</h3></template>

    <p>
      Press Play to start receiving the morse code When some correct characters
      were already entered, pressing play again will result in just the
      remaining characters to be sent again. To listen to the entire message,
      use the drop down menu and click "Play whole"
    </p>
    <p>
      The pause between signals, as well as the signal frequency, can be
      adjusted in the settings.
    </p>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MorseQuizBox from "@/components/typing/MorseQuizBox.vue";
import ListenQuiz from "@/components/listening/ListenQuiz.vue";
import OptionBar from "@/components/options/OptionBar.vue";
import Menubar from "primevue/menubar";
import Dialog from "primevue/dialog";
import Card from "primevue/card";
import { letterMap, dotMap } from "@/morseDict";

export default defineComponent({
  name: "App",
  components: {
    Dialog,
    MorseQuizBox,
    ListenQuiz,
    Menubar,
    Card,
    OptionBar,
  },
  data() {
    return {
      quizzes: [] as { [key: string]: any }[],
      selectedQuiz: "w",
      optionsVisible: false,
      frequency: 440,
      unitTime: 100,
      lmDict: false,
      usage: false,
    };
  },
  computed: {
    lmDictTable() {
      let result: { code: string; letter: string }[] = [];
      Object.entries(dotMap).forEach(([key, value]) => {
        result.push({ code: key, letter: value });
      });
      return result;
    },
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
      {
        label: "Settings",
        command: () => {
          this.optionsVisible = true;
        },
      },
      {
        label: "Help",
        items: [
          {
            label: "How to Morse",
            command: () => {
              this.lmDict = true;
            },
          },
          {
            label: "Usage",
            command: () => {
              this.usage = true;
            },
          },
        ],
      },
    ];
  },
});
</script>

<style scoped>
table {
  border: none;
  border-collapse: collapse;
}

table td {
  border-left: 1px solid #000;
  border-right: 1px solid #000;
}

table td:first-child {
  border-left: none;
}

table td:last-child {
  border-right: none;
}
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
