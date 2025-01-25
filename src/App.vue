<script setup lang="ts">
import AudioPlayer from '@/components/AudioPlayer.vue';
import SeekSlider from '@/components/SeekSlider.vue';
import VolumeControl from '@/components/VolumeControl.vue';
</script>

<template>
  <AudioPlayer controls>
    <VolumeControl />
    <SeekSlider />
  </AudioPlayer>
</template>

<style scoped></style>
