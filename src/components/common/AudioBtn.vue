<script setup lang="ts">
import { inject } from 'vue';
import { AudioContextKey } from '@/composables/audioContext';

const audioContext = inject(AudioContextKey);

if (!audioContext) {
  throw new Error('AudioContext is not provided');
}

const {action} = defineProps<{
  action: 'play' | 'pause' | 'mute' | 'unmute' | 'togglePlay' | 'toggleMute';
}>();

function handleClick() {
  switch (action) {
    case 'play':
      audioContext!.play();
      break;
    case 'pause':
      audioContext!.pause();
      break;
    case 'mute':
      audioContext!.mute();
      break;
    case 'unmute':
      audioContext!.unmute();
      break;
    case 'togglePlay':
      audioContext!.togglePlay();
      break;
    case 'toggleMute':
      audioContext!.toggleMute();
      break;
  }
}
</script>

<template>
  <button @click.stop="handleClick">
    <slot />
  </button>
</template>
