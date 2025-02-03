<script setup lang="ts">
import { createAudioContext, AudioContextKey } from '@/composables/audioContext'
import { provide } from 'vue';

const audioContext = createAudioContext('/musics/yoasobi-yuusha.mp3')

provide(AudioContextKey, audioContext)
</script>

<template>
  <slot />
</template>
