<template>
  <section v-if="isLoading" class="text-center text-lg animate-pulse">
    Loading...
  </section>

  <section v-else-if="error" class="text-center text-red-500">
    {{ error }}
  </section>

  <section
    v-else
    class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 px-4 md:px-16"
  >
    <CountryItem
      v-for="country in filteredCountries"
      :key="country.cca3"
      :country="country"
      @select="navigateToCountry"
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import CountryItem from "./CountryItem.vue";
import type { CountryResponse } from "../../models/countries.models";

interface Props {
  countries: CountryResponse[];
  isLoading: boolean;
  error: string | null;
  search: string;
  region: string;
}

const props = defineProps<Props>();
const router = useRouter();

const filteredCountries = computed(() =>
  props.countries.filter((country) => {
    const nameMatch = country.name.common
      .toLowerCase()
      .includes(props.search.toLowerCase());
    const regionMatch = props.region ? country.region === props.region : true;
    return nameMatch && regionMatch;
  })
);

const navigateToCountry = (countryCode: string) => {
  router.push(`/country/${countryCode}`);
};
</script>
