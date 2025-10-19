<template>
  <div class="grid lg:grid-cols-2 gap-12 items-center">
    <div class="aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
      <img
        :src="country.flags.svg"
        :alt="country.name.common"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="space-y-6">
      <h1 class="text-3xl font-extrabold">{{ country.name.common }}</h1>

      <div class="grid md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <p>
            <span class="font-semibold">Native Name:</span>
            {{ country.name.official }}
          </p>
          <p>
            <span class="font-semibold">Population:</span>
            {{ country.population.toLocaleString() }}
          </p>
          <p>
            <span class="font-semibold">Region:</span>
            {{ country.region }}
          </p>
          <p>
            <span class="font-semibold">Capital:</span>
            {{ country.capital ? country.capital[0] : "—" }}
          </p>
        </div>

        <div class="space-y-2">
          <p>
            <span class="font-semibold">Country Code:</span>
            {{ country.cca3 }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CountryResponse } from "@/models/countries.models";

defineProps<{
  country: CountryResponse;
}>();
</script>
