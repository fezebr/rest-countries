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
    <article
      v-for="country in filteredCountries"
      :key="country.cca3"
      @click="navigateToCountry(country.cca3)"
      class="bg-white dark:bg-dark-blue rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
    >
      <div class="aspect-[4/3] overflow-hidden">
        <img
          :src="country.flags.svg"
          :alt="country.name.common"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <!-- Country Info -->
      <div class="p-6 text-sm">
        <h2 class="font-extrabold text-base mb-3">
          {{ country.name.common }}
        </h2>
        <p class="mb-1">
          <span class="font-semibold">Population:</span>
          {{ country.population.toLocaleString() }}
        </p>
        <p class="mb-1">
          <span class="font-semibold">Region:</span> {{ country.region }}
        </p>
        <p>
          <span class="font-semibold">Capital:</span>
          {{ country.capital ? country.capital[0] : "—" }}
        </p>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
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

const filteredCountries = computed<CountryResponse[]>(() => {
  return props.countries.filter((country) => {
    const nameMatch = country.name.common
      .toLowerCase()
      .includes(props.search.toLowerCase());
    const regionMatch = props.region ? country.region === props.region : true;
    return nameMatch && regionMatch;
  });
});

const navigateToCountry = (countryCode: string) => {
  router.push(`/country/${countryCode}`);
};
</script>
