<script setup lang="ts">
// #region vendor
import { Flex } from '@workai/ui/components';
// #endregion
// #region internal
import SavedWeatherDrawer from './components/SavedWeatherDrawer.vue';
// #endregion
</script>

<template>
  <SavedWeatherDrawer />
  <Flex class="w-full">
    <Flex
      vertical
      :gap="24"
      class="max-w-[800px] w-full px-[1em] md:px-xl mx-auto h-full container"
    >
      <AlertComponent />
      <slot />
    </Flex>
  </Flex>
</template>
