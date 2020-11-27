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
  emits: ["letterTyped", "backspace", "wordEnded"],
  props: {
    allowedKeys: { type: Array, default: [] },
  },
  data() {
    return {
      morseHandler: new MorseHandler(),
      timeoutId: 0,
      isDown: null as string | null,
      touchStart: null as null | [number, number],
    };
  },
  methods: {
    handleTouchmove(event: TouchEvent) {
      if (this.touchStart === null) {
        return;
      }
      const maxAngle = 20;

      const xDiff = this.touchStart[0] - event.touches[0].clientX;
      const yDiff = this.touchStart[1] - event.touches[0].clientY;
      const maxYLength =
        (xDiff / Math.sin((180 - 90 - 20 * Math.PI) / 180)) *
        Math.sin((maxAngle * Math.PI) / 180);
      if (xDiff > 20 && yDiff < maxYLength) {
        this.touchStart = null;
        this.$emit("backspace");
        clearTimeout(this.timeoutId);
        this.isDown = null;
      }
    },
    handleKeydown(event: KeyboardEvent | TouchEvent) {
      if (this.isDown !== null) {
        return;
      }
      if (window.TouchEvent && event instanceof TouchEvent) {
        console.log(event.touches);
        this.touchStart = [event.touches[0].clientX, event.touches[0].clientY];
      }
      if (eventToString(event) === "backspace" && this.morseHandler.empty) {
        this.$emit("backspace");
        clearTimeout(this.timeoutId);
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
        this.$emit("wordEnded");
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
