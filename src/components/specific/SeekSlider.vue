<script setup lang="ts">
import { computed, inject, onMounted, watch } from 'vue';
import { AudioContextKey } from '@/composables/audioContext';
import { useTemplateRef } from 'vue';
import calculateTime from '@/utils/calculateTime';

const audioContext = inject(AudioContextKey)
const seekSliderElement = useTemplateRef<HTMLInputElement>('seek-slider')

if (!audioContext) {
  throw new Error('AudioContext is not provided');
}

const parsedCurrentTime = computed(() => {
  return calculateTime(audioContext!.currentTime.value)
})

const parsedDuration = computed(() => {
  return calculateTime(audioContext!.duration.value)
})

onMounted(() => {
  audioContext.audioElement!.value?.addEventListener('loadedmetadata', () => {
    seekSliderElement.value!.max = Math.floor(audioContext!.duration.value).toString();
  })
})

watch(audioContext!.currentTime, (currentTime) => {
  console.log(Math.floor(currentTime).toString())
  seekSliderElement.value!.value = Math.floor(currentTime).toString()
});

function seekHandler() {
  audioContext!.seek(Number(seekSliderElement.value!.value));
}
</script>

<template>
  <div class="flex items-center justify-between">
    <span id="current-time" class="time px-4 box-border w-fit">{{ parsedCurrentTime }}</span>
    <input v-bind="$attrs" class="range" id="seek-slider" @change="seekHandler" type="range" ref="seek-slider" max="100" value="0">
    <span id="duration" class="time px-4">{{ parsedDuration }}</span>
  </div>

</template>
