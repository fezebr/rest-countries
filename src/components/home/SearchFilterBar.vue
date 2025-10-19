<template>
  <section
    class="flex flex-col md:flex-row md:justify-between gap-6 py-8 px-4 md:px-16"
  >
    <input
      :value="search"
      @input="onSearchChange"
      type="text"
      placeholder="Search for a country..."
      class="w-full md:w-96 px-6 py-4 rounded shadow text-sm bg-white dark:bg-dark-blue placeholder-dark-gray dark:placeholder-very-light-gray focus:outline-none"
    />

    <select
      :value="region"
      @change="onRegionChange"
      class="w-48 px-6 py-4 rounded shadow text-sm bg-white dark:bg-dark-blue text-dark-gray dark:text-very-light-gray focus:outline-none"
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
  </section>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

interface RegionOption {
  value: string;
  label: string;
}

defineProps<{
  search: string;
  region: string;
}>();

const regionOptions: RegionOption[] = [
  { value: "Africa", label: "Africa" },
  { value: "Americas", label: "Americas" },
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "Oceania", label: "Oceania" },
];

const emit = defineEmits<{
  onSearchChange: [value: string];
  onRegionChange: [value: string];
}>();

const onSearchChange = (event: Event) => {
  emit("onSearchChange", (event.target as HTMLInputElement).value);
};

const onRegionChange = (event: Event) => {
  emit("onRegionChange", (event.target as HTMLSelectElement).value);
};
</script>
