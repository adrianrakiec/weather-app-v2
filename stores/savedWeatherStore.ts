import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { SearchEntry } from '../types/search';

const STORAGE_KEY = 'savedWeather';

export const useSavedWeatherStore = defineStore('savedWeather', () => {
  const savedWeather = ref<SearchEntry[]>([]);
  const history = ref<SearchEntry[]>([]);

  const loadSavedWeather = () => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      savedWeather.value = JSON.parse(savedData);
    }
  };

  const saveSavedWeather = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedWeather.value));
  };

  const addSavedWeather = (entry: SearchEntry) => {
    const exists = isSavedWeather(entry.name);

    if (!exists) {
      savedWeather.value.unshift(entry);
      saveSavedWeather();
    }
  };

  const removeSavedWeather = (city: string) => {
    savedWeather.value = savedWeather.value.filter(
      (item) => item.name !== city
    );
    saveSavedWeather();
  };

  const addToHistory = (entry: SearchEntry) => {
    const exists = history.value.some((item) => item.name === entry.name);

    if (!exists) {
      history.value.unshift(entry);
    }

    if (history.value.length > 7) {
      history.value.pop();
    }
  };

  const clearSavedWeather = () => {
    savedWeather.value = [];
    localStorage.removeItem(STORAGE_KEY);
  };

  const isSavedWeather = (city: string) => {
    return savedWeather.value.some((item) => item.name === city);
  };

  loadSavedWeather();

  watch(savedWeather, saveSavedWeather, { deep: true });

  return {
    savedWeather,
    history,
    addSavedWeather,
    removeSavedWeather,
    clearSavedWeather,
    addToHistory,
    isSavedWeather,
  };
});
