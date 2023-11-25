<template>
  <InputNumber
    v-model.number="frequency"
    suffix=" Hz"
    inputClass="text-center"
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
<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import InputNumber from "primevue/inputnumber";

const props = withDefaults(
  defineProps<{ modelValue: number; frequencyRange?: [number, number] }>(),
  { frequencyRange: () => [40, 4000] }
);
const frequency = ref(props.modelValue);
const emits = defineEmits<{ (e: "update:modelValue", value: number): void }>();
watch(frequency, (v) => emits("update:modelValue", v));
watch(
  () => props.modelValue,
  (m) => (frequency.value = m)
);
const logFrequency = computed({
  get: () => Math.floor(Math.log(frequency.value) * 1000),
  set: (v) => (frequency.value = Math.floor(Math.pow(Math.E, v / 1000))),
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
