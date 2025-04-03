<template>
  <div style="margin-top: 2em">
    <Flex vertical :gap="EFlexGap.Small">
      <Flex justify="space-between">
        <TypographyTitle :level="3"> Next 4-day forecast </TypographyTitle>
      </Flex>

      <Spin v-if="dailyWeather.length === 0" active />

      <Flex v-else vertical style="margin-top: 1em">
        <Segmented
          block
          :options="segmentedOptions"
          v-model:value="activeKey"
        />
        <DailyWeather :temperatures="filteredWeather[activeKey].temperatures" />
      </Flex>
    </Flex>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type {
  ForecastResult,
  WeatherForecastResponse,
} from '../../../../types/forecast';
import { Flex, Spin, TypographyTitle, Segmented } from '@workai/ui/components';
import { EFlexGap } from '@workai/ui/types';
import DailyWeather from './DailyWeather.vue';

const props = defineProps<{
  lat: number;
  lon: number;
}>();

const alertStore = useAlertStore();
const weatherStore = useWeatherStore()

const forecast = ref<WeatherForecastResponse>();
const dailyWeather = ref<ForecastResult[]>([]);
const activeKey = ref(0);

const fetchForecast = async () => {
  if (!props.lat || !props.lon) return;

  try {
    forecast.value = await weatherService.getDailyForecast(
      props.lat,
      props.lon
    );
    dailyWeather.value = getDailyWeatherInfo(
      forecast.value.list,
      forecast.value.city.timezone
    );
  } catch (error) {
    alertStore.handleError(error);
  }
};

const filteredWeather = computed(() => {
  const today = new Date().toISOString().split('T')[0];
  return dailyWeather.value.filter((day) => day.date > today).slice(0, 4);
});

const segmentedOptions = computed(() =>
  filteredWeather.value.map((item, index) => ({
    value: index,
    payload: { title: getDayName(item.date) },
  }))
);

watch(() => [props.lat, props.lon], fetchForecast, { immediate: true });
</script>
