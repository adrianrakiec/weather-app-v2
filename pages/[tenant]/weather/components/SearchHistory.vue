<template>
  <div v-if="history.length" class="history-container">
    <div class="history-list">
      <NuxtLink
        v-for="entry in history"
        :key="`${entry.name}-${entry.lat}-${entry.lon}`"
        :to="`/app/weather/${entry.lat}/${entry.lon}`"
        class="history-item"
      >
        {{ entry.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const savedWeatherStore = useSavedWeatherStore();
const history = ref(savedWeatherStore.history);
</script>

<style scoped>
.history-container {
  margin: 0 1em 2em;
}

.history-list {
  margin-top: 0.5em;
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
}

.history-item {
  background-color: #5451beff;
  padding: 0.6em 1.2em;
  border-radius: 0.7em;
  text-decoration: none;
  color: #fff;
  transition: 0.3s ease;
  font-weight: 500;
  white-space: nowrap;
  font-size: 0.9rem;
}

.history-item:hover {
  opacity: 0.7;
}
</style>
