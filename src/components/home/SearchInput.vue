<template>
  <div class="relative w-full md:w-96">
    <font-awesome-icon
      icon="search"
      class="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-gray dark:text-very-light-gray"
    />
    <input
      :value="modelValue"
      @input="
        $emit(
          'update:modelValue',
          ($event.target as HTMLInputElement).value.trim()
        )
      "
      type="text"
      placeholder="Search for a country..."
      class="w-full px-6 pl-12 py-4 rounded shadow text-sm bg-white placeholder-dark-gray dark:placeholder-very-light-gray focus:outline-none light-background"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>
