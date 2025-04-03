<template>
  <Flex :justify="EFlexJustify.End">
    <Button :size="EButtonSize.Small" :onClick="toggleSavedWeather">
      <Icon name="add" v-if="!isSaved" />
      <Icon name="bin-recycle" v-else />
    </Button>
  </Flex>
  <Flex :align="EFlexAlign.Center">
    <Button
      :shape="EButtonShape.Circle"
      :type="EButtonType.Primary"
      :onClick="goBack"
    >
      <Icon name="arrow-left" />
    </Button>
    <TypographyTitle
      :content="weather.name || 'Unknown'"
      style="margin-left: 0.5em"
    />
  </Flex>
</template>
<script setup lang="ts">
import { Button, Icon, TypographyTitle, Flex } from '@workai/ui/components';
import {
  EButtonShape,
  EButtonSize,
  EButtonType,
  EFlexAlign,
  EFlexJustify,
} from '@workai/ui/types';
import type { SearchEntry } from '../../../../types/search';

interface Props {
  weather: SearchEntry;
}
const props = defineProps<Props>();

const router = useRouter();
const savedWeatherStore = useSavedWeatherStore();
const alertStore = useAlertStore();

const isSaved = computed(() => {
  return savedWeatherStore.isSavedWeather(props.weather.name);
});

const goBack = () => {
  router.push('/app/weather');
};

const toggleSavedWeather = () => {
  if (!props) return;

  if (savedWeatherStore.isSavedWeather(props.weather.name)) {
    alertStore.showSuccess('Location has been deleted!');
    savedWeatherStore.removeSavedWeather(props.weather.name);
  } else {
    alertStore.showSuccess('Location has been saved!');
    savedWeatherStore.addSavedWeather(props.weather);
  }
};
</script>
