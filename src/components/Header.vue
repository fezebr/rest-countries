<template>
  <header
    class="py-6 flex justify-between items-center shadow-md px-4 md:px-16 light-background"
  >
    <h1 class="text-lg font-bold">Where in the world?</h1>
    <button
      class="flex items-center gap-2 text-sm font-semibold cursor-pointer dark-text"
      @click="toggleTheme"
    >
      <font-awesome-icon :icon="theme === 'light' ? 'sun' : 'moon'" />
      <span>{{ theme === 'light' ? 'Light Mode' : 'Dark  Mode' }}</span>
    </button>
  </header>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme.composable';

const { theme, toggleTheme } = useTheme();
</script>
