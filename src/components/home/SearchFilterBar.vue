<template>
  <section
    class="flex flex-col md:flex-row md:justify-between gap-6 py-12 px-4 md:px-16"
  >
    <SearchInput v-model="searchValue" />
    <RegionSelect v-model="regionValue" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SearchInput from './SearchInput.vue';
import RegionSelect from './RegionSelect.vue';

const props = defineProps<{
  search: string;
  region: string;
}>();

const emit = defineEmits<{
  onSearchChange: [value: string];
  onRegionChange: [value: string];
}>();

const searchValue = computed({
  get: () => props.search,
  set: (value: string) => emit('onSearchChange', value),
});

const regionValue = computed({
  get: () => props.region,
  set: (value: string) => emit('onRegionChange', value),
});
</script>
