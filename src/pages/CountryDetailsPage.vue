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
import type { CountriesResponse } from '@/models/countries.models';
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const country = ref<CountriesResponse | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

const fetchCountryDetails = async () => {
  const countryCode = route.params.code as string;
  if (!countryCode) {
    error.value = 'Country code not provided';
    return;
  }

  isLoading.value = true;
  error.value = null;

  try {
    const data = await countriesApi.getCountryByCode(countryCode);
    country.value = data;
  } catch (err: any) {
    error.value = err.message || 'Failed to fetch country details';
  } finally {
    isLoading.value = false;
  }
};

const goBack = () => {
  router.back();
};

onMounted(fetchCountryDetails);

watch(
  () => route.params.code,
  () => {
    fetchCountryDetails();
  }
);
</script>
