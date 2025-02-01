<script setup lang="ts">
import AudioPlayer from '@/components/specific/AudioPlayer.vue';
import IconSkipBackward from '@/components/icons/IconSkipBackward.vue';
import IconSkipForward from '@/components/icons/IconSkipForward.vue';
import PlayBtn from '@/components/specific/PlayBtn.vue';
import SeekSlider from '@/components/specific/SeekSlider.vue';
import VolumeControl from '@/components/specific/VolumeControl.vue';
import type { AnimationItem } from 'lottie-web';
import Lottie from 'lottie-web';
import { onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue';
import IconMinimize from '@/components/icons/IconMinimize.vue';
import MusicThumbnail from '@/components/specific/MusicThumbnail.vue';

const isPlaying = ref(false);
const playIconContainer = useTemplateRef<Element>('play-icon')
const playAnimation = ref<AnimationItem | null>(null)

const isExpanded = ref(false)

onMounted(() => {
  playAnimation.value = Lottie.loadAnimation({
    container: playIconContainer.value!,
    path: '/icons/animation/pause.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
    name: "Play Animation",
  });

  playAnimation.value.goToAndStop(14, true);
})

onUnmounted(() => {
  if (playAnimation.value) {
    playAnimation.value.destroy();
  }
});

watch(isPlaying, (state) => {
  if (state) {
    playAnimation.value?.playSegments([14, 27], true);
  } else {
    playAnimation.value?.playSegments([0, 14], true);
  }
})

function toogleExpand() {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <Transition name="slide-up">
    <div v-show="isExpanded" class="absolute z-10 top-0 bg-base-100 h-screen">
      <AudioPlayer class="h-full flex flex-col justify-center" src="/musics/yoasobi-yuusha.mp3">
        <div class="flex justify-center mb-8">
          <button @click="toogleExpand">
            <IconMinimize />
          </button>
          <h2 class="mx-3">Now Playing</h2>
        </div>
        <MusicThumbnail />
        <template #controls>
          <div class="flex justify-center items-center mb-4">
            <IconSkipBackward class="mx-8" />
            <PlayBtn v-model="isPlaying">
              <template #icon>
                <div ref="play-icon" class="w-10"></div>
              </template>
            </PlayBtn>
            <IconSkipForward class="mx-8" />
          </div>
          <SeekSlider />
          <VolumeControl />
        </template>
      </AudioPlayer>
    </div>
  </Transition>


  <button @click="toogleExpand" class="h-16 block w-full bg-base-200">
    <p>Music</p>
  </button>
</template>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
