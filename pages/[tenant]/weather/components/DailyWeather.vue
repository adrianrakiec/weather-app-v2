<template>
  <WeatherChart :temperatures="temperatures" />
</template>
<script setup lang="ts">
import WeatherChart from './WeatherChart.vue';

defineProps<{
  temperatures: {
    time: string;
    temperature: number;
    icon: string;
    windSpeed: number;
    windDeg: number;
  }[];
}>();
</script>
