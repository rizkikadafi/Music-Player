<script setup lang="ts">
import AudioPlayer from '@/components/specific/AudioPlayer.vue';
import IconSkipBackward from '@/components/icons/IconSkipBackward.vue';
import IconSkipForward from '@/components/icons/IconSkipForward.vue';
import SeekSlider from '@/components/specific/SeekSlider.vue';
import { onMounted, ref, useTemplateRef, watch, inject } from 'vue';
import IconMinimize from '@/components/icons/IconMinimize.vue';
import MusicThumbnail from '@/components/specific/MusicThumbnail.vue';
import ThemeController from '@/components/common/ThemeController.vue';
import { useLottie } from '@/composables/lottie';
import { AudioContextKey } from '@/composables/audioContext';
import AudioBtn from '@/components/common/AudioBtn.vue';
import VolumeSlider from '@/components/specific/VolumeSlider.vue';

const audioContext = inject(AudioContextKey)

if (!audioContext) {
  throw new Error('AudioContext is not provided');
}

const expandPlayIconContainer = useTemplateRef<Element>('expand-play-icon')
const miniPlayIconContainer = useTemplateRef<Element>('mini-play-icon')
const expandMuteIconContainer = useTemplateRef<Element>('expand-mute-icon')
const miniMuteIconContainer = useTemplateRef<Element>('mini-mute-icon')

const isExpanded = ref(false)

const playLottie = useLottie('/icons/animation/pause.json', {
  loop: false,
  autoplay: false,
  startFrame: 14
});

const muteLottie = useLottie('/icons/animation/mute.json', {
  loop: false,
  autoplay: false,
  startFrame: 0
});

onMounted(() => {
  playLottie.mountAnimation(expandPlayIconContainer.value!);
  playLottie.mountAnimation(miniPlayIconContainer.value!);
  muteLottie.mountAnimation(expandMuteIconContainer.value!);
  muteLottie.mountAnimation(miniMuteIconContainer.value!)
})

watch(audioContext.isPlaying, (state) => {
  if (state) {
    playLottie.playSegments(14, 27);
  } else {
    playLottie.playSegments(0, 14);
  }
})

watch(audioContext.isMuted, (state) => {
  if (state) {
    muteLottie.playSegments(0, 15);
  } else {
    muteLottie.playSegments(15, 25);
  }
})

function toogleExpand() {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <Transition name="slide-up">
    <div v-show="isExpanded" class="flex flex-col absolute z-10 top-0 bg-base-100 h-svh">
      <nav class="flex flex-none justify-between my-3 mx-3 h-16 relative border-b border-b-neutral">
        <button @click="toogleExpand" class="btn btn-square flex justify-center items-center">
          <IconMinimize />
        </button>
        <h1 class="p-4 text-center font-bold text-lg">VMusic</h1>
        <ThemeController />
      </nav>

        <AudioPlayer class="flex flex-auto flex-col justify-center">
          <h2 class="mb-8 font-bold text-center">Now Playing</h2>
          <MusicThumbnail />
          <template #controls>
            <div class="flex justify-center items-center mb-4">
              <IconSkipBackward class="mx-8" />
              <AudioBtn action="togglePlay" class="btn btn-primary">
                <div ref="expand-play-icon" class="w-10"></div>
              </AudioBtn>
              <IconSkipForward class="mx-8" />
            </div>
            <SeekSlider class="range-sm" />
            <div class="hidden">
              <AudioBtn action="toggleMute" class="btn btn-primary">
                <div ref="expand-mute-icon" class="w-10"></div>
              </AudioBtn>
              <VolumeSlider />
            </div>
          </template>
        </AudioPlayer>
    </div>
  </Transition>

  <button @click="toogleExpand" class="block w-full bg-base-200 pt-5">
    <AudioPlayer>
      <template #controls>
        <div class="flex justify-between items-center mb-4">
          <div class="flex items-center">
            <img src="/image/thumb.jpg" alt="song thumb" width="80" height="80">
            <h2 class="font-bold mx-3">Song title</h2>
          </div>
          <AudioBtn action="togglePlay" class="btn btn-primary">
            <div ref="mini-play-icon" class="w-10"></div>
          </AudioBtn>
        </div>
      </template>
    </AudioPlayer>
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
