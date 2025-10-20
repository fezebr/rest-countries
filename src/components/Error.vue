<template>
  <section class="text-center text-rose-600">
    {{ message }}
  </section>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>
