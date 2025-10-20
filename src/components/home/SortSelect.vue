<template>
  <div class="relative w-68">
    <label for="sort-select" class="sr-only">Sort Options</label>
    <select
      id="sort-select"
      :value="modelValue"
      @change="onChange"
      class="appearance-none w-full px-6 py-4 rounded-md shadow-md light-background light-text border-none outline-none text-sm"
    >
      <option
        v-for="option in sortOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <div
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4"
    >
      <font-awesome-icon
        icon="chevron-down"
        class="w-4 h-4 text-dark-gray dark:text-very-light-gray"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SortType } from '../../models/countries.models';

interface SortOption {
  value: string;
  label: string;
}

const sortOptions: SortOption[] = [
  { value: SortType.NONE, label: 'Sort by' },
  { value: SortType.NAME_ASC, label: 'Name (A-Z)' },
  { value: SortType.NAME_DESC, label: 'Name (Z-A)' },
  { value: SortType.POPULATION_ASC, label: 'Population (Low to High)' },
  { value: SortType.POPULATION_DESC, label: 'Population (High to Low)' },
];

defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};
</script>
