<script setup lang="ts">
// #region vendor
import {
  Flex,
  TypographyTitle,
  TypographyParagraph,
  Button,
} from '@workai/ui/components';
import { EFlexJustify, EFlexAlign } from '@workai/ui/types';
// #endregion
// #region internal
import { useErrorPage } from './hooks/useErrorPage';
// #endregion

const {
  t,
  imgAdapter,
  titleAdapter,
  descriptionAdapter,
  routeCode,
  handleLogout,
} = useErrorPage();

useHead({
  title: t('page.error.index.meta.title', { code: routeCode }),
});

definePageMeta({
  layout: 'public',
});
</script>

<template>
  <Flex
    :justify="EFlexJustify.Center"
    :align="EFlexAlign.Center"
    vertical
    :gap="12"
    :flex="1"
  >
    <img :src="imgAdapter" style="max-width: 380px" />
    <TypographyTitle class="text-center" :content="routeCode.toString()" />
    <TypographyTitle class="text-center" :level="2" :content="titleAdapter" />
    <TypographyParagraph
      class="text-center"
      style="max-width: 512px"
      :content="descriptionAdapter"
    />
    <Button
      v-if="routeCode === '401' || routeCode === '403'"
      @click.prevent="handleLogout"
      :href="getPagePath().tenant.authLogout"
    >
      {{ $t('neutral.logout') }}
    </Button>
  </Flex>
</template>
