<script setup lang="ts">
import { AudioContextKey } from '@/composables/audioContext';
import { inject, useTemplateRef } from 'vue';

const volumeSliderElement = useTemplateRef<HTMLInputElement>('volume-slider')

const audioContext = inject(AudioContextKey)

if (!audioContext) {
  throw new Error('AudioContext is not provided');
}

function volumeHandler() {
  audioContext!.setVolume(Number(volumeSliderElement.value!.value) / 100)
}
</script>

<template>
  <div class="flex justify-between items-center">
    <input v-bind="$attrs" class="range" @input="volumeHandler" type="range" ref="volume-slider" max="100" value="100">
  </div>
</template>
