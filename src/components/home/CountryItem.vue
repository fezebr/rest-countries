<template>
  <article
    @click="onSelect"
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
</template>

<script setup lang="ts">
import type { CountriesResponse } from "@/models/countries.models";

interface Props {
  country: CountriesResponse;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "select", code: string): void;
}>();

const onSelect = () => {
  emit("select", props.country.cca3);
};
</script>
