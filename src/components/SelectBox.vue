<template>
  <div class="relative" :class="width">
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      class="appearance-none w-full px-6 py-4 rounded-md shadow-md light-background light-text border-none outline-none text-sm"
    >
      <option value="">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-dark-gray dark:text-very-light-gray">
      <font-awesome-icon icon="chevron-down" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Option {
  value: string;
  label: string;
}

defineProps<{
  modelValue: string;
  options: Option[];
  placeholder: string;
  width?: string;
}>();

defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>