<template>
  <InputNumber
    v-model.number="frequency"
    suffix=" Hz"
    inputClass="p-text-center"
    :min="frequencyRange[0]"
    :max="frequencyRange[1]"
  /><br />
  <input
    type="range"
    v-model="logFrequency"
    :min="Math.floor(Math.log(frequencyRange[0]) * 1000)"
    :max="Math.floor(Math.log(frequencyRange[1]) * 1000)"
  />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Slider from "primevue/slider";
import InputNumber from "primevue/inputnumber";
export default defineComponent({
  name: "FrequencySlider",
  components: {
    Slider,
    InputNumber,
  },
  props: {
    modelValue: { type: Number, required: true },
    frequencyRange: { type: Array, default: [40, 4000] },
  },
  data() {
    return { frequency: this.modelValue };
  },
  emits: ["update:modelValue"],
  watch: {
    modelValue(new_value) {
      this.frequency = new_value;
    },
    frequency(new_value) {
      this.$emit("update:modelValue", new_value);
    },
  },
  computed: {
    logFrequency: {
      get: function(): number {
        return Math.floor(Math.log(this.frequency) * 1000);
      },
      set: function(newValue: number) {
        this.frequency = Math.floor(Math.pow(Math.E, newValue / 1000));
      },
    },
  },
});
</script>

<style scoped>
.frequencyText {
  width: 3em;
}
.frequencyUnit {
  margin-left: 10px;
  position: relative;
}
</style>
