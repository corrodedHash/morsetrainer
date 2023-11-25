<template>
  <Sidebar
    v-model:visible="optionsVisible"
    position="right"
    :showCloseIcon="false"
    style="overflow: scroll;"
  >
    <h3>Beep Length</h3>
    <InputNumber v-model="internalUnitTime" suffix="ms" :min="10" :max="2000" />
    <h3>Tone Frequency</h3>
    <frequency-slider v-model="internalFrequency" />
  </Sidebar>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import FrequencySlider from "@/components/options/FrequencySlider.vue";
import InputNumber from "primevue/inputnumber";
import Sidebar from "primevue/sidebar";

export default defineComponent({
  props: {
    frequency: { required: true, type: Number },
    unitTime: { required: true, type: Number },
    visible: { required: true, type: Boolean },
  },
  data() {
    return { optionsVisible: false };
  },
  watch: {
    visible(new_value) {
      this.optionsVisible = new_value;
    },
    optionsVisible(new_value) {
      this.$emit("update:visible", new_value);
    },
  },
  emits: ["update:frequency", "update:unitTime", "update:visible"],
  components: { FrequencySlider, InputNumber, Sidebar },
  computed: {
    internalFrequency: {
      get(): number {
        return this.frequency;
      },
      set(new_value: number) {
        this.$emit("update:frequency", new_value);
      },
    },
    internalUnitTime: {
      get(): number {
        return this.unitTime;
      },
      set(new_value: number) {
        this.$emit("update:unitTime", new_value);
      },
    },
  },
});
</script>
<style scoped></style>
