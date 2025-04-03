<script setup lang="ts">
// #region vendor
import { Card, Flex, Icon, TypographyText } from '@workai/ui/components';
import {
  EFlexAlign,
  EFlexJustify,
  EFontWeight,
  ETypographyColor,
  ETypographyVariant,
} from '@workai/ui/types';
import { ref } from 'vue';
// #endregion
// #region internal
// #endregion

const selectedIndex = ref<number | null>(null);

const handleCardClick = (index: number) => {
  selectedIndex.value = index === selectedIndex.value ? null : index;
};
</script>

<template>
  <Card>
    <Flex vertical :gap="24">
      <TypographyText
        :variant="ETypographyVariant.Headline3"
        :font-weight="EFontWeight.Semibold"
        content="Card"
      />
      <Flex vertical :gap="16">
        <Card
          v-for="index in 4"
          :key="index"
          :tabindex="0"
          :hoverable="true"
          :is-selected="selectedIndex === index"
          @click="handleCardClick(index)"
        >
          <template #cover>
            <img alt="example" src="https://picsum.photos/200" />
          </template>
          <Flex vertical :gap="10">
            <Flex :gap="6" :justify="EFlexJustify.SpaceBetween">
              <Flex vertical :gap="2">
                <TypographyText
                  :variant="ETypographyVariant.Text2"
                  :font-weight="EFontWeight.Semibold"
                  :color="ETypographyColor.Headline"
                  content="Desk D-128"
                />
                <TypographyText
                  :variant="ETypographyVariant.Caption1"
                  content="Opis zasobu"
                />
              </Flex>
              <Flex
                class="h-[44px] w-[44px]"
                :align="EFlexAlign.Center"
                :justify="EFlexJustify.Center"
              >
                <Icon :width="20" name="chevron-right" />
              </Flex>
            </Flex>
            <Flex :gap="6">
              <Icon :width="20" name="location" />
              <TypographyText
                :variant="ETypographyVariant.Caption1"
                :color="ETypographyColor.Paragraph"
                content="Piętro 1, Strefa B, Sala 12"
              />
            </Flex>

            <Flex :gap="6">
              <Flex :gap="6" :flex="1">
                <Icon :width="20" name="tablet-laptop" />
                <div class="w-full">
                  <TypographyText
                    :variant="ETypographyVariant.Caption1"
                    :ellipsis="{ tooltip: true }"
                    :color="ETypographyColor.Paragraph"
                    content="2 monitory"
                  />
                </div>
              </Flex>
              <Flex :gap="6" :flex="1">
                <Icon :width="20" name="weather-snowflake" />
                <div class="w-full">
                  <TypographyText
                    :variant="ETypographyVariant.Caption1"
                    :color="ETypographyColor.Paragraph"
                    :ellipsis="{ tooltip: true }"
                    content="Klimatyzacja"
                  />
                </div>
              </Flex>
              <Flex :gap="6" :flex="1">
                <Icon :width="20" name="auto-fit-height" />
                <div class="w-full">
                  <TypographyText
                    :variant="ETypographyVariant.Caption1"
                    :color="ETypographyColor.Paragraph"
                    :ellipsis="{ tooltip: true }"
                    content="Regulacja wysokości"
                  />
                </div>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  </Card>
</template>
