<script setup lang="ts">
import AudioPlayer from '@/components/AudioPlayer.vue';
import IconSkipBackward from '@/components/icons/IconSkipBackward.vue';
import IconSkipForward from '@/components/icons/IconSkipForward.vue';
import PlayBtn from '@/components/PlayBtn.vue';
import SeekSlider from '@/components/SeekSlider.vue';
import VolumeControl from '@/components/VolumeControl.vue';
import type { AnimationItem } from 'lottie-web';
import Lottie from 'lottie-web';
import { onMounted, ref, useTemplateRef, watch } from 'vue';

const isPlaying = ref(false);
const playIconContainer = useTemplateRef<Element>('play-icon')
const playAnimation = ref<AnimationItem | null>(null)

onMounted(() => {
  playAnimation.value = Lottie.loadAnimation({
    container: playIconContainer.value!,
    path: '/icons/animation/pause.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
    name: "Demo Animation",
  });

  playAnimation.value.goToAndStop(14, true);
})

watch(isPlaying, (state) => {
  if(state) {
    playAnimation.value?.playSegments([14, 27], true);
  } else {
    playAnimation.value?.playSegments([0, 14], true);
  }
})
</script>

<template>
  <div class="flex justify-center">
    <AudioPlayer src="/musics/yoasobi-yuusha.mp3">
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
</template>
