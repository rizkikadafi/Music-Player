<script setup lang="ts">
import ThemeController from './components/common/ThemeController.vue';
import IconBack from './components/icons/IconBack.vue';
import SongView from './views/SongView.vue';
import AudioProvider from './components/specific/AudioProvider.vue';

</script>

<template>
  <div class="flex flex-col h-svh">
    <nav class="flex flex-none justify-between my-3 mx-3 h-16 relative border-b border-b-neutral">
      <button class="btn btn-square flex justify-center items-center">
        <IconBack />
      </button>
      <h1 class="self-center font-bold text-lg absolute left-1/2 -translate-x-1/2">VMusic</h1>
      <ThemeController />
    </nav>
    <main class="overflow-x-hidden flex flex-auto flex-col justify-center">
      <RouterView />
    </main>
    <div class="music-control flex-none">
      <AudioProvider>
        <SongView />
      </AudioProvider>
    </div>
  </div>
</template>
