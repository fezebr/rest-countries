<template>
  <Loading v-if="isLoading" />

  <Error v-else-if="error" :message="error" />

  <div v-else-if="countries && countries.length">
    <section class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 px-10 md:px-16 pb-8">
      <CountryItem
        v-for="country in paginatedCountries"
        :key="country.cca3"
        :country="country"
        @select="navigateToCountry"
      />
    </section>
    
    <Pagination
      v-if="totalPages > 1"
      :current-page="currentPage"
      :total-pages="totalPages"
      @update:current-page="$emit('update:currentPage', $event)"
    />
  </div>

  <section v-else class="text-center light-text">No countries found.</section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import CountryItem from './CountryItem.vue';
import Loading from '../Loading.vue';
import Error from '../Error.vue';
import Pagination from '../Pagination.vue';
import type { CountriesResponse } from '../../models/countries.models';

interface Props {
  countries: CountriesResponse[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
}

const props = defineProps<Props>();
const router = useRouter();

defineEmits<{
  'update:currentPage': [page: number];
}>();

const totalPages = computed(() => Math.ceil(props.countries.length / props.itemsPerPage));

const paginatedCountries = computed(() => {
  const start = (props.currentPage - 1) * props.itemsPerPage;
  const end = start + props.itemsPerPage;
  return props.countries.slice(start, end);
});

const navigateToCountry = (countryCode: string) => {
  router.push({ name: 'country-details', params: { code: countryCode } });
};
</script>
