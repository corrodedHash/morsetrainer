import { defineComponent } from "vue";
import MorseHandler from "@/morseHandler";

function eventToString(event: KeyboardEvent | TouchEvent): string {
  if (window.TouchEvent && event instanceof TouchEvent) {
    return "touch";
  }
  event = event as KeyboardEvent;
  return event.key.toLowerCase();
}

export default defineComponent({
  name: "MorseButton",
  emits: ["letterTyped", "backspace"],
  props: {
    allowedKeys: { type: Array, default: [] },
  },
  data() {
    return {
      morseHandler: new MorseHandler(),
      timeoutId: 0,
      isDown: null as string | null,
    };
  },
  methods: {
    handleKeydown(event: KeyboardEvent | TouchEvent) {
      if (this.isDown !== null) {
        return;
      }
      if (eventToString(event) === "backspace") {
        this.$emit("backspace");
        return;
      }
      if (
        this.allowedKeys.length !== 0 &&
        !this.allowedKeys.includes(eventToString(event))
      ) {
        return;
      }
      this.isDown = eventToString(event);
      clearTimeout(this.timeoutId);
      this.morseHandler.buttonDown();
    },
    handleKeyup(event: KeyboardEvent | TouchEvent) {
      if (this.isDown !== eventToString(event)) {
        return;
      }
      this.isDown = null;
      this.morseHandler.buttonUp();
      const spaceHandler = () => {
        this.$emit("letterTyped", " ");
      };
      const letterHandler = () => {
        this.$emit("letterTyped", this.morseHandler.terminateLetter());
        this.timeoutId = setTimeout(
          spaceHandler,
          MorseHandler.spaceLength - MorseHandler.breakLength
        );
      };
      this.timeoutId = setTimeout(letterHandler, MorseHandler.breakLength);
    },
  },
  computed: {
    currentDots(): string {
      return this.morseHandler.currentDots;
    },
  },
});
