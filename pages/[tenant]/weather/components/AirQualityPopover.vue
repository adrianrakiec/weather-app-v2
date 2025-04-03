<template>
  <Popover
    :trigger="EPopoverTrigger.Hover"
    :placement="EPopoverPlacement.BottomRight"
  >
    <template #content>
      <div v-if="props.data">
        <TypographyParagraph>
          Air Quality Index: {{ props.data.list[0].main.aqi }} -
          <span :style="{ fontWeight: 'bold', color: aqiColor }">{{
            aqiText
          }}</span>
        </TypographyParagraph>

        <div class="pollutes">
          <Flex v-for="pollute in pollutes">
            <TypographyText strong>{{ pollute.component }}:&nbsp;</TypographyText>
            <TypographyText>{{ pollute.value }} µg/m³</TypographyText>
          </Flex>
        </div>

        <TypographyParagraph>AQI Levels:</TypographyParagraph>
        <TypographyParagraph>1 (Good) - 5 (Very Poor)</TypographyParagraph>
      </div>
      <Empty v-else description="No informations abou air quality" />
    </template>
    <Button :shape="EButtonShape.Circle" :size="EButtonSize.Small"
      ><Icon name="question"
    /></Button>
  </Popover>
</template>
<script setup lang="ts">
import {
  Popover,
  TypographyParagraph,
  Button,
  Icon,
  Empty,
  Flex,
  TypographyText,
} from '@workai/ui/components';
import {
  EButtonShape,
  EButtonSize,
  EPopoverPlacement,
  EPopoverTrigger,
} from '@workai/ui/types';
import type { AirQuality } from '../../../../types/airQuality';

interface AirQualityProps {
  data: AirQuality | null;
}
const props = defineProps<AirQualityProps>();

const aqiText = computed(() => {
  if (!props.data) return;
  const aqiLevels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
  return aqiLevels[(props.data.list[0].main.aqi || 1) - 1];
});

const aqiColor = computed(() => {
  if (!props.data) return;
  const colors = ['#2ECC71', '#F1C40F', '#E67E22', '#E74C3C', '#8E44AD'];
  return colors[(props.data.list[0].main.aqi || 1) - 1];
});

const pollutes = computed(() => {
  if (!props.data) return;
  const components = props.data.list[0].components;
  return (Object.keys(components) as Array<keyof typeof components>).map(
    (key) => ({
      key,
      component: key.toUpperCase(),
      value: components[key],
    })
  );
});
</script>
<style scoped>
.pollutes {
  padding: 0.5em 1em;
}
</style>
