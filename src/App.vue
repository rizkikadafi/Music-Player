<script setup lang="ts">
import { shallowRef } from 'vue';
import ThemeController from './components/common/ThemeController.vue';
import IconBack from './components/icons/IconBack.vue';
import SongView from './views/SongView.vue';

const songView = shallowRef(SongView)
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <nav class="flex flex-none justify-between my-3 mx-3 h-16 relative border-b border-b-base-100">
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
      <!-- <KeepAlive> -->
      <!--   <component :is="songView"></component> -->
      <!-- </KeepAlive> -->
      <SongView />
    </div>
  </div>
</template>
