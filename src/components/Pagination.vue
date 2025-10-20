<template>
  <div class="flex justify-center items-center gap-4 py-8">
    <button
      @click="$emit('update:currentPage', currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 rounded shadow light-background light-text disabled:opacity-50"
    >
      Previous
    </button>
    
    <span class="text-sm">
      Page {{ currentPage }} of {{ totalPages }}
    </span>
    
    <button
      @click="$emit('update:currentPage', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 rounded shadow light-background light-text disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentPage: number;
  totalPages: number;
}>();

defineEmits<{
  'update:currentPage': [page: number];
}>();
</script>