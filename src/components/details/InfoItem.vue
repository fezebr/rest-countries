<template>
  <p>
    <span class="font-semibold">{{ label }}:</span>
    {{ value || '—' }}
  </p>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  value?: string | number | null;
}>();
</script>
