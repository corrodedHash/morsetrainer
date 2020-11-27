<template>
  <div class="p-d-flex p-flex-column p-ai-center">
    <div>
      <div class="p-d-flex p-jc-center p-mb-2">
        <SplitButton
          :label="buttonText[0]"
          :icon="buttonText[1]"
          @click="handlePlayClick"
          :model="playItems"
          class="p-mr-1"
        />
        <Button
          @click="optionsVisible = true"
          v-tooltip="'Options'"
          icon="pi pi-cog"
          id="options_button"
        />
        <Sidebar
          v-model:visible="optionsVisible"
          position="bottom"
          :showCloseIcon="false"
          style="overflow: scroll;"
        >
          <h3>Beep Length</h3>
          <InputNumber v-model="unit_time" suffix="ms" :max="2000" :min="10" />
          <h3>Tone Frequency</h3>
          <frequency-slider v-model="frequency" />
        </Sidebar>
      </div>
    </div>
    <span class="p-input-icon-right p-mt-1">
      <i v-if="enteredWrong" class="pi pi-spin pi-times" />
      <InputText type="text" v-model="enteredWord" style="width:20em" />
    </span>
  </div>
</template>

<script lang="ts" src="./ListenQuiz.ts" />
<style scoped></style>
