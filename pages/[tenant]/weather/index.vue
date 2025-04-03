<template>
  <TypographyTitle
    content="🌤️ Weather app"
    style="text-align: center; padding-top: 1em"
  />
  <SearchBar />
  <SearchHistory />
  <ResultsCities />
</template>

<script setup lang="ts">
import { TypographyTitle } from '@workai/ui/components';
import SearchBar from './components/SearchBar.vue';
import SearchHistory from './components/SearchHistory.vue';
import ResultsCities from './components/ResultsCities.vue';
</script>
