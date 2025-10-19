<template>
  <main
    class="min-h-screen bg-very-light-gray dark:bg-very-dark-blue-bg text-very-dark-blue-text dark:text-white font-nunito"
  >
    <SearchFilterBar
      :search="search"
      :region="region"
      @on-search-change="handleSearchChange"
      @on-region-change="handleRegionChange"
    />
    
    <CountryList
      :countries="countries"
      :is-loading="isLoading"
      :error="error"
      :search="search"
      :region="region"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import SearchFilterBar from "../components/home/SearchFilterBar.vue";
import CountryList from "../components/home/CountryList.vue";
import countriesApi from "../api/countries.api";
import type { CountryResponse } from "../models/countries.models";

const countries = ref<CountryResponse[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);

const search = ref("");
const region = ref("");

const route = useRoute();
const router = useRouter();

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

<style>
/* //TODO: refactor it */
:root {
  --dark-blue: hsl(209, 23%, 22%);
  --very-dark-blue-bg: hsl(207, 26%, 17%);
  --very-dark-blue-text: hsl(200, 15%, 8%);
  --dark-gray: hsl(0, 0%, 52%);
  --very-light-gray: hsl(0, 0%, 98%);
  --white: hsl(0, 0%, 100%);
}

.bg-dark-blue {
  background-color: var(--dark-blue);
}
.bg-very-light-gray {
  background-color: var(--very-light-gray);
}
.bg-very-dark-blue-bg {
  background-color: var(--very-dark-blue-bg);
}
.text-very-dark-blue-text {
  color: var(--very-dark-blue-text);
}
.text-dark-gray {
  color: var(--dark-gray);
}

.font-nunito {
  font-family: "Nunito Sans", sans-serif;
}
</style>
