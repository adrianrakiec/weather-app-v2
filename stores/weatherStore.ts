import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { CityInfo } from '../types/city';
import type { WeatherResponse } from '../types/weather';
import type { AirQuality } from '../types/airQuality';
import type { WeatherForecastResponse } from '../types/forecast';

export const useWeatherStore = defineStore('weather', () => {
  const results = ref<CityInfo[] | null>(null);
  const weatherData = ref<WeatherResponse | null>(null);
  const airQualityData = ref<AirQuality | null>(null);
  const forecast = ref<WeatherForecastResponse | null>(null);
  const loading = ref(false);
  const alertStore = useAlertStore();

  const searchCity = async (cityName: string) => {
    loading.value = true;

    try {
      results.value = await weatherService.getCoordinatesByCity(cityName);
    } catch (e) {
      alertStore.handleError(e);
    } finally {
      loading.value = false;
    }

    return results.value;
  };

  const fetchWeather = async (lat: number, lon: number) => {
    loading.value = true;
    try {
      weatherData.value = await weatherService.getWeatherByCoordinates(
        lat,
        lon
      );
    } catch (e) {
      alertStore.handleError(e);
    } finally {
      loading.value = false;
    }

    return weatherData.value;
  };

  const fetchAirQuality = async (lat: number, lon: number) => {
    try {
      airQualityData.value = await weatherService.getAirQualityData(lat, lon);
    } catch (e) {
      alertStore.handleError(e);
    } finally {
      loading.value = false;
    }

    return airQualityData.value;
  };

  const fetchForecast = async (lat: number, lon: number) => {
    try {
      forecast.value = await weatherService.getDailyForecast(lat, lon);
    } catch (e) {
      alertStore.handleError(e);
    } finally {
      loading.value = false;
    }

    return forecast.value;
  };

  return {
    results,
    loading,
    searchCity,
    fetchWeather,
    fetchAirQuality,
    fetchForecast,
  };
});
