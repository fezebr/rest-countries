<template>
  <Loading v-if="isLoading" />

  <Error v-else-if="error" :message="error" />

  <section
    v-else-if="countries && countries.length"
    class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 px-10 md:px-16 pb-16"
  >
    <CountryItem
      v-for="country in countries"
      :key="country.cca3"
      :country="country"
      @select="navigateToCountry"
    />
  </section>

  <section v-else class="text-center light-text">No countries found.</section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import CountryItem from './CountryItem.vue';
import Loading from '../Loading.vue';
import Error from '../Error.vue';
import type { CountriesResponse } from '../../models/countries.models';

interface Props {
  countries: CountriesResponse[];
  isLoading: boolean;
  error: string | null;
}

defineProps<Props>();
const router = useRouter();

const navigateToCountry = (countryCode: string) => {
  router.push({ name: 'country-details', params: { code: countryCode } });
};
</script>
