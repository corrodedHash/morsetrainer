<template>
  <div class="flex flex-column align-items-center">
    <div>
      <div class="flex justify-content-center mb-2">
        <SplitButton
          :label="buttonText[0]"
          :icon="buttonText[1]"
          @click="handlePlayClick"
          :model="playItems"
          class="mr-1"
        />
      </div>
    </div>
    <span class="input-icon-right mt-1">
      <i v-if="enteredWrong" class="pi pi-spin pi-times" />
      <InputText type="text" v-model="enteredWord" style="width:20em" />
    </span>
  </div>
</template>

<script lang="ts" src="./ListenQuiz.ts" />
<style scoped></style>
