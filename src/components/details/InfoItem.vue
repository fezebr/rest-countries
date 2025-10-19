<template>
  <p class="light-text">
    <span class="font-semibold dark-text">{{ label }}:</span>
    {{ value || '—' }}
  </p>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  value?: string | number | null;
}>();
</script>
