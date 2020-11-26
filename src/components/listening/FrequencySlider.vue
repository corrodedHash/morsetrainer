<template>
  <input
    type="range"
    :min="Math.floor(Math.log(40) * 1000)"
    :max="Math.floor(Math.log(4000) * 1000)"
    v-model="logFrequency"
    @input="updateFrequency"
  />
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "FrequencySlider",
  props: {
    modelValue: { type: Number, default: 440 },
  },
  data() {
    return { logFrequency: Math.floor(Math.log(this.modelValue) * 1000) };
  },
  emits: ["update:modelValue"],
  watch: {
    modelValue(new_value) {
      this.logFrequency = Math.floor(Math.log(new_value) * 1000);
      console.log(new_value);
    },
  },
  computed: {
    frequency(): number {
      return Math.pow(Math.E, this.logFrequency / 1000);
    },
  },
  methods: {
    updateFrequency() {
      this.$emit("update:modelValue", this.frequency);
    },
  },
});
</script>
