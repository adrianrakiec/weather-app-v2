<script setup lang="ts">
import { Spin, Card, Tabs, TabPane } from '@workai/ui/components';
import type { WeatherResponse } from '../../../../types/weather';
import type { AirQuality } from '../../../../types/airQuality';
import WeatherHeader from '../components/WeatherHeader.vue';
import CurrentWeather from '../components/CurrentWeather.vue';
import ForecastWeather from '../components/ForecastWeather.vue';

const route = useRoute();
const router = useRouter();
const weatherStore = useWeatherStore();
const savedWeather = useSavedWeatherStore();

const lat = parseFloat(route.params.lat as string);
const lon = parseFloat(route.params.lon as string);

const weather = ref<WeatherResponse | null>(null);
const airQuality = ref<AirQuality | null>(null);
const activeKey = ref(1);

onMounted(async () => {
  try {
    weather.value = await weatherStore.fetchWeather(lat, lon);
    airQuality.value = await weatherStore.fetchAirQuality(lat, lon);
    weatherStore.results = null;
    if (weather.value) {
      savedWeather.addToHistory({ name: weather.value.name, lat, lon });
    } else {
      router.push('/app/weather');
    }
  } catch (error) {
    console.error('Error fetch weather:', error);
  }
});
</script>

<template>
  <div class="spinner" v-if="weatherStore.loading">
    <Spin />
  </div>

  <Card v-if="weather" style="min-height: 100vh">
    <WeatherHeader
      :weather="{
        name: weather.name,
        lat: weather.coord.lat,
        lon: weather.coord.lon,
      }"
    />
    <Tabs v-model:activeKey="activeKey" style="margin-top: 1em">
      <TabPane :key="1">
        <template #tab> Current </template>
        <CurrentWeather :data="weather" :airQuality="airQuality" />
      </TabPane>
      <TabPane :key="2">
        <template #tab> Forecast </template>
        <ForecastWeather :lat="weather.coord.lat" :lon="weather.coord.lon" />
      </TabPane>
    </Tabs>
  </Card>
</template>

<style scoped>
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.weather-icon {
  width: 10em;
}
</style>
