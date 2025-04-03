<template>
  <div class="weather-container">
    <Flex :justify="EFlexJustify.End">
      <AirQualityPopover :data="airQuality" />
    </Flex>
    <Flex vertical :align="EFlexAlign.Center">
      <div class="local-time">
        <Flex :justify="EFlexJustify.Center" :align="EFlexAlign.Center">
          <TypographyText>Local Time:&nbsp; </TypographyText>
          <TypographyText :fontWeight="EFontWeight.Semibold" underline>{{
            localTime
          }}</TypographyText>
        </Flex>
      </div>

      <img
        :src="`/weather/${data.weather[0].icon}.png`"
        :alt="data.weather[0].main"
        class="weather-icon"
      />

      <TypographyTitle
        :level="ETypographyLevel.Second"
        :variant="ETypographyVariant.Headline2"
      >
        {{ Math.round(data.main.temp) }}°
      </TypographyTitle>
    </Flex>

    <div class="weather-info">
      <Flex :justify="EFlexJustify.SpaceEvenly" :wrap="EFlexWrap.Wrap">
        <Flex :align="EFlexAlign.Center">
          <Tooltip>
            <template #title>Humidity</template>
            <img src="/icons/humidity.svg" alt="humidity icon" />
          </Tooltip>
          <TypographyText class="info-value"
            >{{ data.main.humidity }}%</TypographyText
          >
        </Flex>

        <Flex :align="EFlexAlign.Center">
          <Tooltip>
            <template #title>Pressure</template>
            <img src="/icons/barometer.svg" alt="pressure icon" />
          </Tooltip>
          <TypographyText class="info-value"
            >{{ data.main.pressure }}hPa</TypographyText
          >
        </Flex>

        <Flex :align="EFlexAlign.Center">
          <Tooltip>
            <template #title>Wind speed</template>
            <img src="/icons/wind.svg" alt="wind speed icon" />
          </Tooltip>
          <TypographyText class="info-value"
            >{{ data.main.pressure }}m/s</TypographyText
          >
        </Flex>
      </Flex>
    </div>

    <Flex :justify="EFlexJustify.SpaceEvenly">
      <Flex :align="EFlexAlign.Center">
        <Tooltip>
          <template #title>Sunrise</template>
          <img src="/icons/sunrise.svg" alt="sunrise icon" />
        </Tooltip>
        <TypographyText class="info-value">{{
          timeFormat(data.sys.sunrise, data.timezone)
        }}</TypographyText>
      </Flex>

      <Flex :align="EFlexAlign.Center">
        <Tooltip>
          <template #title>Sunset</template>
          <img src="/icons/sunset.svg" alt="Sunseticon" />
        </Tooltip>
        <TypographyText class="info-value">{{
          timeFormat(data.sys.sunset, data.timezone)
        }}</TypographyText>
      </Flex>
    </Flex>
  </div>
</template>
<script setup lang="ts">
import {
  Flex,
  Tooltip,
  TypographyText,
  TypographyTitle,
} from '@workai/ui/components';
import type { AirQuality } from '../../../../types/airQuality';
import type { WeatherResponse } from '../../../../types/weather';
import {
  EFlexAlign,
  EFlexJustify,
  EFlexWrap,
  EFontWeight,
  ETypographyLevel,
  ETypographyVariant,
} from '@workai/ui/types';
import AirQualityPopover from './AirQualityPopover.vue';

interface BasicWeatherProps {
  data: WeatherResponse;
  airQuality: AirQuality | null;
}

const props = defineProps<BasicWeatherProps>();

const localTime = ref(
  timeFormat(Math.floor(Date.now() / 1000), props.data.timezone, true)
);

let intervalId: NodeJS.Timeout;

onMounted(() => {
  intervalId = setInterval(() => {
    localTime.value = timeFormat(
      Math.floor(Date.now() / 1000),
      props.data.timezone,
      true
    );
  }, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>
<style scoped>
.weather-container {
  position: relative;
  padding: 0 1rem;
  margin-top: 1em;
}

.weather-icon {
  margin-top: 0.3em;
  margin-bottom: 1em;
  width: clamp(20%, 10rem, 45%);
}

.weather-info {
  margin: 2em 0;
}

.local-time {
  margin: 0.8em 0;
  background-color: #f0f0f0;
  padding: 0.3em;
}
</style>
