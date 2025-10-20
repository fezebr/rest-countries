<template>
  <section
    class="flex flex-col md:flex-row md:justify-between gap-6 py-12 px-4 md:px-16"
  >
    <SearchInput v-model="searchValue" />
    <div class="flex flex-col sm:flex-row gap-4">
      <SelectBox
        v-model="regionValue"
        :options="regionOptions"
        placeholder="Filter by Region"
        width="w-48"
      />
      <SelectBox
        v-model="sortValue"
        :options="sortOptions"
        placeholder="Sort by"
        width="w-68"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SearchInput from './SearchInput.vue';
import SelectBox from '../SelectBox.vue';
import { regionOptions, sortOptions } from '../../constants/options';

const props = defineProps<{
  search: string;
  region: string;
  sort: string;
}>();

const emit = defineEmits<{
  onSearchChange: [value: string];
  onRegionChange: [value: string];
  onSortChange: [value: string];
}>();

const searchValue = computed({
  get: () => props.search,
  set: (value: string) => emit('onSearchChange', value),
});

const regionValue = computed({
  get: () => props.region,
  set: (value: string) => emit('onRegionChange', value),
});

const sortValue = computed({
  get: () => props.sort,
  set: (value: string) => emit('onSortChange', value),
});
</script>
