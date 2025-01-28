<script setup lang="ts">
import ThemeController from './components/ThemeController.vue';
import IconBack from './components/icons/IconBack.vue';
</script>

<template>
  <div class="h-screen">
    <nav class="flex justify-between my-3 mx-3 h-16">
      <button class="btn btn-square flex justify-center items-center">
        <IconBack />
      </button>
      <ThemeController />
    </nav>

    <main class="overflow-x-hidden">
      <RouterView />
    </main>
  </div>
</template>
