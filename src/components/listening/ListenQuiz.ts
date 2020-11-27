import { defineComponent } from "vue";
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
      beeping: null as null | Beeper,
    };
  },
  watch: {
    enteredWord(new_word: string, old_word: string) {
      if (new_word.toLowerCase() === this.wantedWord.toLowerCase()) {
        this.handleSolve();
      }
    },
    frequency(new_freq) {
      if (this.beeping !== null) {
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
    setBeep(beep: null | Beeper = null) {
      if (this.beeping !== null) {
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
