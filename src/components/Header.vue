<template>
  <header
    class="py-6 flex justify-between items-center shadow-md px-4 md:px-16 light-background"
  >
    <h1 class="text-sm font-bold">Where in the world?</h1>
    <button
      class="flex items-center gap-2 text-sm font-semibold cursor-pointer" 
      @click="toggleTheme"
    >
      <p v-if="theme === 'light'">🌙 Dark Mode</p>
      <p v-else>☀️ Light Mode</p>
    </button>
  </header>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme.composable';


const {theme , toggleTheme} = useTheme()
</script>
