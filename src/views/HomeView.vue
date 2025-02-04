<script setup lang="ts">
const items = [
  {
    title: "Title 1",
    description: "Description 1",
    img: "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
  },
  {
    title: "Title 1",
    description: "Description 1",
    img: "/image/thumb.jpg",
  },
  {
    title: "Title 1",
    description: "Description 1",
    img: "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
  },
  {
    title: "Title 1",
    description: "Description 1",
    img: "/image/thumb.jpg",
  },
  {
    title: "Title 1",
    description: "Description 1",
    img: "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
  },
  {
    title: "Title 1",
    description: "Description 1",
    img: "/image/thumb.jpg",
  },
  {
    title: "Title 1",
    description: "Description 1",
    img: "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
  },
  {
    title: "Title 1",
    description: "Description 1",
    img: "/image/thumb.jpg",
  },
  {
    title: "Title 1",
    description: "Description 1",
    img: "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
  },
  {
    title: "Title 1",
    description: "Description 1",
    img: "/image/thumb.jpg",
  },
]
</script>

<template>
  <div class="px-5 h-full overflow-auto">
    <div v-for="(item, index) in items" :key="index" class="mb-3 card card-side shadow-xl bg-base-200">
      <figure class="aspect-square w-1/3 overflow-hidden">
        <img
          :src="item.img"
          :alt="item.title"
          class="h-full object-cover"
          />
      </figure>
      <div class="card-body h-fit">
        <h2 class="card-title">{{ item.title }}</h2>
        <p>{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
