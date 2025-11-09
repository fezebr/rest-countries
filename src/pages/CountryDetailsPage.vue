<template>
  <main class="min-h-screen font-nunito max-w-10xl mx-auto">
    <div class="px-4 md:px-16 pt-8 pb-16 md:py-18">
      <BackButton @click="goBack" />
    </div>

    <Loading v-if="isLoading" class="py-20" />

    <Error v-else-if="error" :message="error" class="py-20" />

    <div v-else-if="country" class="px-4 md:px-16 pb-16">
      <CountryDetailsCard :country="country" />
    </div>
  </main>
</template>

<script setup lang="ts">
import countriesApi from '@/api/countries.api';
import BackButton from '@/components/details/BackButton.vue';
import CountryDetailsCard from '@/components/details/CountryDetailsCard.vue';
import Loading from '@/components/Loading.vue';
import Error from '@/components/Error.vue';
import type { CountryDetailResponse } from '@/models/countries.models';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';

const ONE_HOUR_IN_MS = 1000 * 60;

const route = useRoute();
const router = useRouter();

const countryCode = computed(() => route.params.code as string | undefined);

const countryQuery = useQuery({
  queryKey: ['country', countryCode],
  queryFn: () => {
    if (!countryCode.value) {
      throw new Error('Country code not provided');
    }
    return countriesApi.getCountryByCode(countryCode.value);
  },
  enabled: computed(() => Boolean(countryCode.value)),
  staleTime: ONE_HOUR_IN_MS,
});

const country = computed<CountryDetailResponse | null>(
  () => countryQuery.data.value ?? null
);
const isLoading = computed(() => countryQuery.isPending.value);
const error = computed<string | null>(() => {
  if (!countryCode.value) {
    return 'Country code not provided';
  }
  const queryError = countryQuery.error.value;
  if (!queryError) {
    return null;
  }
  if (queryError instanceof Error && queryError.message) {
    return queryError.message;
  }
  return 'Failed to fetch country details';
});

const goBack = () => {
  router.back();
};
</script>
