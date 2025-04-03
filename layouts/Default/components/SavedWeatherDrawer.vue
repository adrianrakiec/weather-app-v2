<template>
  <FloatButton
    :type="EFloatButtonType.Primary"
    :click="toggleDrawer"
    :badge="{ count: savedWeatherStore.savedWeather.length }"
  >
    <template #icon>
      <Icon name="navigation" />
    </template>
  </FloatButton>

  <Drawer :open="isDrawerOpen" :close="toggleDrawer" title="Saved locations">
    <Flex vertical gap="small">
      <template v-if="savedWeatherStore.savedWeather.length">
        <Card
          v-for="location in savedWeatherStore.savedWeather"
          :key="location.lat + location.lon"
        >
          <Flex justify="space-between" align="center">
            <NuxtLink
              style="color: inherit"
              :to="`/app/weather/${location.lat}/${location.lon}`"
              @click="toggleDrawer"
            >
              <strong>{{ location.name }}</strong>
            </NuxtLink>
            <Button type="text" danger @click="removeLocation(location.name)">
              <Icon name="delete" />
            </Button>
          </Flex>
        </Card>
      </template>
      <Empty v-else description="No saved locations" />
    </Flex>
  </Drawer>
</template>
<script setup lang="ts">
import {
  Drawer,
  Flex,
  Card,
  Button,
  Empty,
  FloatButton,
  Icon,
} from '@workai/ui/components';
import { EFloatButtonType } from '@workai/ui/types';

const savedWeatherStore = useSavedWeatherStore();
const alertStore = useAlertStore()

const isDrawerOpen = ref(false);

const removeLocation = (location: string) => {
  savedWeatherStore.removeSavedWeather(location);
  alertStore.showSuccess('Location has been deleted!');
};

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};
</script>
