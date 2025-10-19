<template>
  <header
    class="py-6 flex justify-between items-center shadow-md px-4 md:px-16 bg-white"
  >
    <h1 class="text-sm font-extrabold">Where in the world?</h1>
    <button
      class="flex items-center gap-2 text-sm font-semibold cursor-pointer"
    >
      <span v-if="theme === 'light'">🌙 Dark Mode</span>
      <span v-else>☀️ Light Mode</span>
    </button>
  </header>
</template>

<script setup lang="ts">
const theme = "light";
</script>
