<template>
  <div class="grid lg:grid-cols-2 gap-16 items-center">
    <!-- Flag -->
    <div class="aspect-[4/3] overflow-hidden rounded-lg shadow-md">
      <img
        :src="country.flags.svg"
        :alt="country.name.common"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Info Section -->
    <div class="space-y-8">
      <h1 class="text-3xl font-extrabold">{{ country.name.common }}</h1>

      <div class="grid md:grid-cols-2 gap-8">
        <div class="space-y-2">
          <InfoItem
            v-for="item in leftInfoItems"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          />
        </div>

        <div class="space-y-2">
          <InfoItem
            v-for="item in rightInfoItems"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          />
        </div>
      </div>

      <!-- Border Countries -->
      <div v-if="hasBorders" class="space-y-3">
        <span class="font-semibold">Border Countries:</span>
        <div class="flex flex-wrap gap-3">
          <button
            v-for="border in country.borders"
            :key="border"
            @click="navigateToCountry(border)"
            class="px-5 py-1 text-sm rounded-md shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {{ border }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import InfoItem from './InfoItem.vue';
import type { CountryDetailResponse } from '@/models/countries.models';

const props = defineProps<{ country: CountryDetailResponse }>();
const router = useRouter();

const nativeName = computed(() => {
  const nativeNames = props.country.name.nativeName;
  if (!nativeNames) return props.country.name.common;
  const firstNative = Object.values(nativeNames)[0];
  return firstNative?.common || props.country.name.common;
});

const formattedPopulation = computed(() =>
  props.country.population.toLocaleString()
);

const currencies = computed(() =>
  props.country.currencies
    ? Object.values(props.country.currencies)
        .map((c) => c.name)
        .join(', ')
    : '—'
);

const languages = computed(() =>
  props.country.languages
    ? Object.values(props.country.languages).join(', ')
    : '—'
);

const hasBorders = computed(
  () => props.country.borders && props.country.borders.length > 0
);

const leftInfoItems = computed(() => [
  { label: 'Native Name', value: nativeName.value },
  { label: 'Population', value: formattedPopulation.value },
  { label: 'Region', value: props.country.region },
  { label: 'Sub Region', value: props.country.subregion || '—' },
  { label: 'Capital', value: props.country.capital?.[0] || '—' },
]);

const rightInfoItems = computed(() => [
  { label: 'Top Level Domain', value: props.country.tld?.[0] || '—' },
  { label: 'Currencies', value: currencies.value },
  { label: 'Languages', value: languages.value },
]);

const navigateToCountry = (countryCode: string) => {
  router.push({ name: 'country-details', params: { code: countryCode } });
};
</script>
