<script setup lang="ts">
import { useTemplateRef, ref, provide } from 'vue'
import { type AudioContext, AudioContextKey } from '@/composables/audioContext'
import SeekSlider from '@/components/specific/SeekSlider.vue'
import VolumeControl from '@/components/specific/VolumeControl.vue';
import MusicThumbnail from '@/components/specific/MusicThumbnail.vue';

defineProps({
  controls: Boolean,
  src: String
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


// onMounted(() => {
//   const bufferedAmount = audioElement.value?.buffered.end(audioElement.value?.buffered.length - 1);
//   console.log(bufferedAmount)
// })
// const seekableAmount = audioElement.value?.seekable.end(audioElement.value?.seekable.length - 1);

</script>

<template>
  <div id="audio-player-container" class="px-8 md:px-0 md:w-2/6">
    <audio ref="audio" :src="src" preload="metadata" loop />
    <slot>
      <MusicThumbnail />
    </slot>
    <slot name="controls">
      <SeekSlider v-if="controls" />
      <VolumeControl v-if="controls" />
    </slot>
  </div>
</template>
