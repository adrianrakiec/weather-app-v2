<template>
  <div style="margin-top: 1em">
    <LineChart :temperatures="temperatures" />
  </div>
  <Flex :justify="EFlexJustify.SpaceBetween" :align="EFlexAlign.Center">
    <div
      v-for="{ icon, time, windDeg, windSpeed } in props.temperatures"
      :key="time"
      class="weather-info"
    >
      <img
        :src="`/weather/${icon}.png`"
        :alt="`Weather icon for: ${time}`"
        class="weather-icon"
      />
      <div class="wind-info">
        <TypographyText style="font-size: 0.8rem"
          >{{ windSpeed }} <sup>m</sup>&frasl;<sub>s</sub></TypographyText
        >
        <span class="wind-arrow"
          ><Icon
            name="arrow-up"
            :style="{ transform: `rotate(${windDeg}deg)` }"
        /></span>
        <TypographyText strong style="font-size: 0.7rem">{{
          getWindDirection(windDeg)
        }}</TypographyText>
      </div>
    </div>
  </Flex>
</template>

<script setup lang="ts">
import { Flex, TypographyText, Icon } from '@workai/ui/components';
import { EFlexAlign, EFlexJustify } from '@workai/ui/types';
import LineChart from './LineChart.vue';

const props = defineProps<{
  temperatures: {
    time: string;
    temperature: number;
    icon: string;
    windSpeed: number;
    windDeg: number;
  }[];
}>();
</script>

<style scoped>
.weather-info {
  text-align: center;
  max-width: 60px;
  width: 100%;
}

.weather-icon {
  width: 35px;
}

.wind-info {
  text-align: center;
  margin-top: 1em;
  padding: 0.3em;
  box-shadow: 1px 1px 2px #000;
  border-radius: 0.8em;
}

.wind-speed,
.wind-arrow {
  text-align: center;
  margin-bottom: 0;
}

.wind-speed {
  font-size: 0.7rem;
}

.wind-arrow {
  color: green;
  font-size: 1.4rem;
}
</style>
