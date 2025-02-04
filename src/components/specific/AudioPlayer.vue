<script setup lang="ts">
import SeekSlider from '@/components/specific/SeekSlider.vue'

defineProps({
  controls: Boolean,
});

// onMounted(() => {
//   const bufferedAmount = audioElement.value?.buffered.end(audioElement.value?.buffered.length - 1);
//   console.log(bufferedAmount)
// })
// const seekableAmount = audioElement.value?.seekable.end(audioElement.value?.seekable.length - 1);

</script>

<template>
  <div id="audio-player-container" class="px-8 md:px-0 md:w-2/6">
    <slot />
    <slot name="controls">
      <SeekSlider v-if="controls" />
      <VolumeControl v-if="controls" />
    </slot>
  </div>
</template>
