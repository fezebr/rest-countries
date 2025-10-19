<template>
  <main
    class="min-h-screen text-colors  font-nunito"
  >
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
import { ref, onMounted,  computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import SearchFilterBar from "../components/home/SearchFilterBar.vue";
import CountryList from "../components/home/CountryList.vue";
import countriesApi from "../api/countries.api";
import type { CountriesResponse } from "../models/countries.models";

const countries = ref<CountriesResponse[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);

const search = ref("");
const region = ref("");

const route = useRoute();
const router = useRouter();

const filteredCountries = computed(() => {
const searchTerm = search.value.toLowerCase();

 return countries.value.filter((country) => {
    const nameMatch = country.name.common
    .toLowerCase()
    .includes(searchTerm);
    
    const regionMatch = region.value ? country.region === region.value : true;
    return nameMatch && regionMatch;
  })
}
);

const fetchCountries = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    countries.value = await countriesApi.getAllCountries();
  } catch {
    error.value = "Failed to fetch countries";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  search.value = (route.query.search as string) || "";
  region.value = (route.query.region as string) || "";
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
  setQueryParams()
};

const handleRegionChange = (value: string) => {
  region.value = value;
  setQueryParams()
};
onMounted(fetchCountries);
</script>

 