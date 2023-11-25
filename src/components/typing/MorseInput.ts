import { defineComponent } from "vue";
import MorseButton from "@/components/typing/MorseButton.vue";

export default defineComponent({
  name: "MorseInput",
  props: ["modelValue"],
  emits: ["update:modelValue"],
  data() {
    return { typedWord: "" };
  },
  mounted() {
    this.typedWord = this.modelValue;
  },
  components: {
    MorseButton,
  },
  computed: {
    formattedWord(): string {
      const visible_space = "\u2423";
      if (
        this.typedWord.length > 0 &&
        this.typedWord[this.typedWord.length - 1] === " "
      ) {
        return (
          this.typedWord.substr(0, this.typedWord.length - 1) + visible_space
        );
      }
      return this.typedWord;
    },
  },
  watch: {
    modelValue(new_value: string, _: string) {
      this.typedWord = new_value;
    },
  },
  methods: {
    handleLetter(letter: string) {
      this.typedWord += letter;
      this.$emit("update:modelValue", this.typedWord);
    },
    handleBackspace() {
      this.typedWord = this.typedWord.substr(0, this.typedWord.length - 1);
      this.$emit("update:modelValue", this.typedWord);
    },
    handleEndword() {
      if (this.typedWord.length > 0) {
        this.typedWord += " ";
        this.$emit("update:modelValue", this.typedWord);
      }
    },
  },
});
