import { defineComponent } from "vue";
import playWords from "@/beeper";
import { Beeper } from "@/beeper";
import randomEnglishWord from "@/englishWords";
import FrequencySlider from "@/components/listening/FrequencySlider.vue";
import Button from "primevue/button";
import SplitButton from "primevue/splitbutton";
import Tooltip from "primevue/tooltip";
import InputText from "primevue/inputtext";
import ToggleButton from "primevue/togglebutton";
import OverlayPanel from "primevue/overlaypanel";
import Sidebar from "primevue/sidebar";
import InputNumber from "primevue/inputnumber";

export default defineComponent({
  name: "ListenQuiz",
  components: {
    FrequencySlider,
    Button,
    InputText,
    ToggleButton,
    OverlayPanel,
    Sidebar,
    SplitButton,
    InputNumber,
  },

  directives: {
    tooltip: Tooltip,
  },
  data() {
    return {
      enteredWord: "",
      wantedWord: randomEnglishWord(),
      autoplayWord: false,
      frequency: 440,
      unit_time: 100,
      beeping: null as null | Beeper,
      optionsVisible: false,
      playItems: [] as {
        label: string;
        icon: string;
        visible?: boolean;
        command?: any;
        style?: string;
      }[],
    };
  },
  mounted() {
    this.playItems = [
      {
        label: "Play whole",
        icon: "pi pi-caret-right",
        visible: true,
        command: this.playWord.bind(this),
      },
      {
        label: "Play rest",
        icon: "pi pi-step-forward",
        command: this.playRestWord.bind(this),
      },
      {
        label: "Autoplay",
        icon: "pi pi-replay",
        visible: (this.shouldNotAutoplay.bind(this) as unknown) as undefined,
        command: () => {
          this.autoplayWord = true;
        },
      },
      {
        label: "Autoplay",
        icon: "pi pi-replay",
        style: "text-decoration: line-through",
        visible: (this.shouldAutoplay.bind(this) as unknown) as undefined,
        command: () => {
          this.autoplayWord = false;
        },
      },
    ];
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
    buttonText() {
      if (this.beeping === null) {
        return ["Play", "pi pi-step-forward"];
      }
      return ["Stop", "pi pi-times"];
    },
  },
  methods: {
    shouldAutoplay(): boolean {
      return this.autoplayWord;
    },
    shouldNotAutoplay(): boolean {
      return !this.autoplayWord;
    },
    setBeep(beep: null | Beeper = null) {
      if (this.beeping !== null) {
        this.beeping.cancel();
      }
      this.beeping = beep;
      if (beep === null) {
        for (const item of this.playItems) {
          if (item.label === "Play whole") {
            item.visible = true;
          } else if (item.label === "Play rest") {
            item.visible = true;
          }
        }
      } else {
        for (const item of this.playItems) {
          if (item.label === "Play whole") {
            item.visible = false;
          } else if (item.label === "Play rest") {
            item.visible = false;
          }
        }
      }
    },
    playWord() {
      console.log("Playing");
      this.setBeep(
        playWords(
          this.wantedWord,
          this.frequency,
          this.unit_time / 1000,
          this.handleTextStop.bind(this)
        )
      );
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
          this.unit_time / 1000,
          this.handleTextStop.bind(this)
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
    handleTextStop() {
      this.setBeep();
    },
    handlePlayClick() {
      if (this.beeping !== null) {
        this.setBeep();
      } else {
        this.playRestWord();
      }
    },
  },
});
