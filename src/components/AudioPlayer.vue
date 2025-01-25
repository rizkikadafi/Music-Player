<script setup lang="ts">
import { useTemplateRef, ref, provide } from 'vue'
import { type AudioContext, AudioContextKey } from '@/composables/audioContext'
import SeekSlider from '@/components/SeekSlider.vue'

const { controls } = defineProps({
  controls: {
    type: Boolean,
    default: false,
  }
});

const play = ref(false)
const mute = ref(false)
const duration = ref(0)
const currentTime = ref(0)
const volume = ref(100)

const audioElement = useTemplateRef<HTMLMediaElement>('audio')

const audioContext: AudioContext = {
  audioElement,
  play,
  mute,
  currentTime,
  duration,
  volume
}

provide(AudioContextKey, audioContext);

// const bufferedAmount = audioElement.value?.buffered.end(audioElement.value?.buffered.length - 1);
// const seekableAmount = audioElement.value?.seekable.end(audioElement.value?.seekable.length - 1);

</script>

<template>
  <div id="audio-player-container">
    <p>Audio Player</p>
    <audio ref="audio" src="/musics/yoasobi-yuusha.mp3" preload="metadata" loop />

    <slot>
      <SeekSlider v-if="controls" />
    </slot>

  </div>
</template>
