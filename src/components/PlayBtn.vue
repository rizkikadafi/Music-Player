<script setup lang="ts">
import { inject } from 'vue';
import { AudioContextKey } from '@/composables/audioContext';
import { ref } from 'vue';
import IconPause from './icons/IconPause.vue';
import IconPlay from './icons/IconPlay.vue';

const audioContext = inject(AudioContextKey)
const play = ref(false)
const model = defineModel()

if (!audioContext) {
  throw new Error('AudioContext is not provided');
}

function tooglePlay() {
  model.value = !model.value
  if (play.value) {
    audioContext!.audioElement.value?.pause()
  } else {
    audioContext!.audioElement.value?.play()
  }
  play.value = !play.value
}
</script>

<template>
  <button @click="tooglePlay" class="btn btn-primary">
    <slot name="icon">
      <span v-if="play">
        <IconPlay />
      </span>
      <span v-else>
        <IconPause />
      </span>
    </slot>
  </button>
</template>
