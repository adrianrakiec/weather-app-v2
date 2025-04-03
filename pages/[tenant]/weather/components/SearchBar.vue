<template>
  <Flex :gap="8" class="w-full">
    <Input
      placeholder="Search city..."
      v-model:value="inputValue"
      :search="onSubmit"
      type="search"
    />
    <Button type="primary" @click.prevent="onSubmit">Search</Button>
    <Button @click="useCurrentLocation"><Icon name="location" /></Button>
  </Flex>
</template>

<script setup lang="ts">
import { Flex, Input, Button, Icon } from '@workai/ui/components';

const weatherStore = useWeatherStore();
const router = useRouter();

const inputValue = ref('');

const onSubmit = async () => {
  if (inputValue.value) {
    await weatherStore.searchCity(inputValue.value);
  }
  inputValue.value = '';
};

const useCurrentLocation = () => {
  if (!navigator.geolocation) {
    console.warn('Geolocation is unsupported!');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      router.push(`/app/weather/${latitude}/${longitude}`);
    },
    (error) => {
      console.error(error.message);
      console.error(
        'The location could not be downloaded. Check your browser settings.'
      );
    }
  );
};
</script>
