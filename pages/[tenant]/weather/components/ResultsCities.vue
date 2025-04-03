<template>
  <Spin v-if="weatherStore.loading" />
  <div v-else>
    <Flex
      v-if="weatherStore.results && weatherStore.results.length > 0"
      vertical
      gap="24"
      class="w-full mx-auto px-xl"
    >
      <NuxtLink
        v-for="item in weatherStore.results"
        :to="`/app/weather/${item.lat}/${item.lon}`"
        class="city-item"
        >{{ item.name }}, {{ item.state }}, {{ item.country }}</NuxtLink
      >
    </Flex>
  </div>
  <Empty
    description="No location found"
    :template="EEmptyImageTemplate.GPS"
    v-if="weatherStore.results !== null && weatherStore.results.length === 0"
  />
</template>

<script lang="ts" setup>
import { Empty, Flex, Spin } from '@workai/ui/components';
import { EEmptyImageTemplate } from '@workai/ui/types';

const weatherStore = useWeatherStore();
</script>

<style scoped>
.city-item {
  color: inherit;
  padding: 1em;
  border-radius: 1em;
  border: 1px solid #000;
  background-color: #fff;
}

.city-item:focus,
.city-item:hover {
  border: 1px solid #fff;
  background-color: #5451beff;
  color: #fff;
}
</style>
