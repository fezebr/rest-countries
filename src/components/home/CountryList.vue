<template>
  <section v-if="isLoading" class="text-center text-lg animate-pulse">
    Loading...
  </section>

  <section v-else-if="error" class="text-center">
    {{ error }}
  </section>

  <section
    v-else
    class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 px-4 md:px-16"
  >
    <CountryItem
      v-for="country in countries"
      :key="country.cca3"
      :country="country"
      @select="navigateToCountry"
    />
  </section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import CountryItem from "./CountryItem.vue";
import type { CountryResponse } from "../../models/countries.models";

interface Props {
  countries: CountryResponse[];
  isLoading: boolean;
  error: string | null;
}

  defineProps<Props>();
const router = useRouter();

 
const navigateToCountry = (countryCode: string) => {
  router.push({ name: "country-details", params: { code: countryCode } });
};
</script>
