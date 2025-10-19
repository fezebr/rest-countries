<template>
  <button
    @click="$emit('click')"
    class="flex items-center gap-2 px-6 py-2 bg-white dark:bg-dark-blue rounded shadow hover:shadow-lg transition"
  >
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
    Back
  </button>
</template>

<script setup lang="ts">
defineEmits(["click"]);
</script>
