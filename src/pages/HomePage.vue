<template>
  <main class="min-h-screen dark-text font-nunito">
    <SearchFilterBar
      :search="search"
      :region="region"
      @on-search-change="handleSearchChange"
      @on-region-change="handleRegionChange"
    />

    <CountryList
      :countries="filteredCountries"
      :is-loading="isLoading"
      :error="error"
      :search="search"
      :region="region"
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

const countries = ref<CountriesResponse[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);

const search = ref('');
const region = ref('');

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
  fetchCountries();
});

const setQueryParams = () => {
  router.replace({
    query: {
      ...route.query,
      search: search.value || undefined,
      region: region.value || undefined,
    },
  });
};

const handleSearchChange = (value: string) => {
  search.value = value;
  setQueryParams();
};

const handleRegionChange = (value: string) => {
  region.value = value;
  setQueryParams();
};
onMounted(fetchCountries);
</script>
