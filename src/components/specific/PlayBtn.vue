<!-- <script setup lang="ts">
import { inject } from 'vue';
import { AudioContextKey } from '@/composables/audioContext';
import IconPause from '@/components/icons/IconPause.vue';
import IconPlay from '@/components/icons/IconPlay.vue';

const audioContext = inject(AudioContextKey)

if (!audioContext) {
  throw new Error('AudioContext is not provided');
}

function tooglePlay() {
  if (audioContext?.isPlaying.value) {
    audioContext?.pause()
  } else {
    audioContext?.play()
  }
}
</script>

<template>
  <button @click.stop="tooglePlay" class="btn btn-primary">
    <slot name="icon">
      <span v-if="audioContext.isPlaying.value">
        <IconPlay />
      </span>
      <span v-else>
        <IconPause />
      </span>
    </slot>
  </button>
</template> -->

<script setup lang="ts">
import { ref } from 'vue';
import IconPause from '@/components/icons/IconPause.vue';
import IconPlay from '@/components/icons/IconPlay.vue';
import AudioBtn from '../common/AudioBtn.vue';

const play = ref(false);

function toggle() {
  play.value = !play.value;
}
</script>

<template>
  <AudioBtn action="togglePlay" @click.stop="toggle" class="btn btn-primary">
    <template #default="{ isPlaying }">
      <span v-if="isPlaying">
        <IconPause />
      </span>
      <span v-else>
        <IconPlay />
      </span>
    </template>
  </AudioBtn>
</template>
