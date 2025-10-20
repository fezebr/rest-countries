<template>
  <p class="light-text">
    <span class="font-semibold dark-text">{{ label }}:</span>
    {{ value || '—' }}
  </p>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  value?: string | number | null;
}

defineProps<Props>();
</script>
