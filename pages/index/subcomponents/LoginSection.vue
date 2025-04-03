<script setup lang="ts">
// #region vendor
import { Flex, TypographyTitle, TypographyText } from '@workai/ui/components';
import { EFlexAlign, EFlexJustify, ETypographyVariant } from '@workai/ui/types';
// #endregion
// #region internal
import logoWorkai from '@public/images/logo.png';
// #endregion
</script>

<template>
  <Flex
    :align="EFlexAlign.Center"
    :justify="EFlexJustify.Center"
    :flex="1"
    vertical
  >
    <Flex
      :gap="16"
      vertical
      :align="EFlexAlign.Center"
      :justify="EFlexJustify.Center"
    >
      <img
        class="h-[60px]"
        :src="logoWorkai"
        :alt="$t('page.index.logo.alt')"
      />
      <Flex
        class="text-center"
        vertical
        :justify="EFlexJustify.Center"
        :gap="4"
      >
        <TypographyTitle
          :level="1"
          :content="$t('page.index.title')"
          :variant="ETypographyVariant.Text1"
        />
        <TypographyText
          :content="$t('page.index.description')"
          :variant="ETypographyVariant.Text2"
        />
      </Flex>

      <FormLoginForm />
    </Flex>
  </Flex>
</template>
