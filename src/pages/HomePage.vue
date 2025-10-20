<template>
  <main class="min-h-screen dark-text font-nunito max-w-10xl mx-auto">
    <SearchFilterBar
      :search="search"
      :region="region"
      :sort="sort"
      @on-search-change="handleSearchChange"
      @on-region-change="handleRegionChange"
      @on-sort-change="handleSortChange"
    />

    <CountryList
      :countries="filteredCountries"
      :is-loading="isLoading"
      :error="error"
      :current-page="currentPage"
      :items-per-page="itemsPerPage"
      @update:current-page="handlePageChange"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SearchFilterBar from '../components/home/SearchFilterBar.vue';
import CountryList from '../components/home/CountryList.vue';
import countriesApi from '../api/countries.api';
import type { CountriesResponse } from '../models/countries.models';
import { SortType } from '../models/countries.models';

const countries = ref<CountriesResponse[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);

const search = ref('');
const region = ref('');
const sort = ref('');
const currentPage = ref(1);
const itemsPerPage = 12;

const route = useRoute();
const router = useRouter();

import Fuse from 'fuse.js';

const fuse = computed(() => {
  return new Fuse(countries.value, {
    keys: ['name.common'],
    // lower = stricter, higher = fuzzier
    threshold: 0.2,
  });
});

const filteredCountries = computed(() => {
  const searchTerm = search.value;
  let results = countries.value;

  if (searchTerm) {
    results = fuse.value.search(searchTerm).map((res) => res.item);
  }

  if (region.value) {
    results = results.filter((country) => country.region === region.value);
  }

  if (sort.value) {
    results = [...results].sort((a, b) => {
      switch (sort.value) {
        case SortType.NAME_ASC:
          return a.name.common.localeCompare(b.name.common);
        case SortType.NAME_DESC:
          return b.name.common.localeCompare(a.name.common);
        case SortType.POPULATION_ASC:
          return a.population - b.population;
        case SortType.POPULATION_DESC:
          return b.population - a.population;
        default:
          return 0;
      }
    });
  }

  return results;
});

const fetchCountries = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    countries.value = await countriesApi.getAllCountries();
  } catch {
    error.value = 'Failed to fetch countries';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  search.value = (route.query.search as string) || '';
  region.value = (route.query.region as string) || '';
  sort.value = (route.query.sort as string) || '';
  currentPage.value = parseInt(route.query.page as string) || 1;
  fetchCountries();
});

const setQueryParams = () => {
  router.replace({
    query: {
      ...route.query,
      search: search.value || undefined,
      region: region.value || undefined,
      sort: sort.value || undefined,
      page: currentPage.value > 1 ? currentPage.value.toString() : undefined,
    },
  });
};

const handleSearchChange = (value: string) => {
  search.value = value;
  currentPage.value = 1;
  setQueryParams();
};

const handleRegionChange = (value: string) => {
  region.value = value;
  currentPage.value = 1;
  setQueryParams();
};

const handleSortChange = (value: string) => {
  sort.value = value;
  currentPage.value = 1;
  setQueryParams();
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  setQueryParams();
};
onMounted(fetchCountries);
</script>
