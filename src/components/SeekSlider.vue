<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted } from 'vue';
import { AudioContextKey } from '@/composables/audioContext';
import { ref, useTemplateRef } from 'vue';
import calculateTime from '@/utils/calculateTime';
// import type { AnimationItem } from 'lottie-web';
// import Lottie from 'lottie-web';

const audioContext = inject(AudioContextKey)
const seekSliderElement = useTemplateRef<HTMLInputElement>('seek-slider')
// const playIconContainer = useTemplateRef<Element>('play-icon')
// const play = ref(false)
// const playAnimation = ref<AnimationItem | null>(null)

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
  audioContext!.audioElement.value?.addEventListener('loadedmetadata', () => {
    seekSliderElement.value!.max = Math.floor(audioContext!.audioElement.value?.duration || 0).toString();
    audioContext!.duration.value = Math.floor(audioContext!.audioElement.value?.duration || 0)
  });

  audioContext!.audioElement.value?.addEventListener('timeupdate', updateTimeHandler)

  // playAnimation.value = Lottie.loadAnimation({
  //   container: playIconContainer.value!,
  //   path: '/icons/animation/pause.json',
  //   renderer: 'svg',
  //   loop: false,
  //   autoplay: false,
  //   name: "Demo Animation",
  // });

  // playAnimation.value.goToAndStop(14, true);
})

onUnmounted(() => {
  audioContext?.audioElement?.value?.removeEventListener('timeupdate', updateTimeHandler);
});

function currentTimeHandler() {
  audioContext!.currentTime.value = Number(seekSliderElement.value!.value)
}

function seekHandler() {
  audioContext!.audioElement.value!.currentTime = Number(seekSliderElement.value!.value)
}

function updateTimeHandler() {
  seekSliderElement.value!.value = Math.floor(audioContext!.audioElement.value!.currentTime).toString();
  currentTimeHandler()
}

// function tooglePlay() {
//   if (play.value) {
//     audioContext!.audioElement.value?.pause()
//     playAnimation.value?.playSegments([0, 14], true);
//   } else {
//     audioContext!.audioElement.value?.play()
//     playAnimation.value?.playSegments([14, 27], true);
//   }
//   play.value = !play.value
// }
</script>

<template>
  <div class="flex items-center justify-between">
    <!-- <button @click="tooglePlay" class="btn btn-primary">
      <div ref="play-icon" class="w-10"></div>
    </button> -->
    <span id="current-time" class="time px-4 box-border w-fit">{{ parsedCurrentTime }}</span>
    <input class="range" id="seek-slider" @change="seekHandler" @input="currentTimeHandler" type="range" ref="seek-slider" max="100"
      value="0">
    <span id="duration" class="time px-4">{{ parsedDuration }}</span>
  </div>

</template>
