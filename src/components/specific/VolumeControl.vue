<script setup lang="ts">
import { AudioContextKey } from '@/composables/audioContext';
import type { AnimationItem } from 'lottie-web';
import Lottie from 'lottie-web';
import { inject, onMounted, ref, useTemplateRef } from 'vue';

const muteIconContainer = useTemplateRef<Element>('mute-icon')
const volumeSliderElement = useTemplateRef<HTMLInputElement>('volume-slider')
const muteAnimation = ref<AnimationItem | null>(null)

const audioContext = inject(AudioContextKey)

if (!audioContext) {
  throw new Error('AudioContext is not provided');
}

onMounted(() => {

  muteAnimation.value = Lottie.loadAnimation({
    container: muteIconContainer.value!,
    path: '/icons/animation/mute.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
    name: "Mute Animation",
  });
})

function volumeHandler() {
  audioContext!.volume.value = Number(volumeSliderElement.value!.value)
  audioContext!.audioElement.value!.volume = audioContext!.volume.value / 100
}

function toogleMute() {
  if (audioContext!.mute.value) {
    audioContext!.audioElement.value!.muted = false
    muteAnimation.value?.playSegments([15, 25], true);
  } else {
    audioContext!.audioElement.value!.muted = true
    muteAnimation.value?.playSegments([0, 15], true);
  }
  audioContext!.mute.value = !audioContext!.mute.value
}
</script>

<template>
  <div class="flex justify-between items-center">
    <button @click="toogleMute" class="btn btn-primary btn-md">
      <div ref="mute-icon" class="w-10"></div>
    </button>
    <input class="range range-sm mx-3 my-8" @input="volumeHandler" type="range" ref="volume-slider" max="100" value="100">
    <output id="volume-output" class="px-3">{{ audioContext!.volume }}%</output>
  </div>
</template>
