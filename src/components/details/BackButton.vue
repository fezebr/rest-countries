<template>
  <button
    @click="$emit('click')"
    class="light-background flex items-center gap-2 px-6 py-2 rounded shadow hover:shadow-lg transition dark-text"
  >
    <font-awesome-icon icon="arrow-left" />
    Back
  </button>
</template>

<script setup lang="ts">
defineEmits(['click']);
</script>
