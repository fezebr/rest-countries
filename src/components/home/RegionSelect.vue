<template>
  <div class="relative w-48">
    <select
      :value="modelValue"
      @change="
        $emit('update:modelValue', ($event.target as HTMLSelectElement).value)
      "
      class="appearance-none w-full px-6 py-4 rounded-md shadow-md light-background light-text border-none outline-none text-sm"
    >
      <option value="">Filter by Region</option>
      <option
        v-for="regionOption in regionOptions"
        :key="regionOption.value"
        :value="regionOption.value"
      >
        {{ regionOption.label }}
      </option>
    </select>
    <div
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-dark-gray dark:text-very-light-gray"
    >
      <font-awesome-icon icon="chevron-down" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface RegionOption {
  value: string;
  label: string;
}

defineProps<{
  modelValue: string;
}>();

defineEmits<{
  'update:modelValue': [value: string];
}>();

const regionOptions: RegionOption[] = [
  { value: 'Africa', label: 'Africa' },
  { value: 'Americas', label: 'Americas' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Europe', label: 'Europe' },
  { value: 'Oceania', label: 'Oceania' },
];
</script>
