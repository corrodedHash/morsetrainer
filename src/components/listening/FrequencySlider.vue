<template>
  <input
    type="range"
    :min="Math.floor(Math.log(40) * 1000)"
    :max="Math.floor(Math.log(4000) * 1000)"
    v-model="logFrequency"
    @input="updateFrequency"
  />
  <input type="text" v-model="frequency" class="frequencyText" /><span
    class="frequencyUnit"
    >Hz</span
  >
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
    },
  },
  computed: {
    frequency: {
      get: function(): number {
        return Math.floor(Math.pow(Math.E, this.logFrequency / 1000));
      },
      set: function(newValue: number) {
        this.logFrequency = Math.floor(Math.log(newValue) * 1000);
      },
    },
  },
  methods: {
    updateFrequency() {
      this.$emit("update:modelValue", this.frequency);
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
