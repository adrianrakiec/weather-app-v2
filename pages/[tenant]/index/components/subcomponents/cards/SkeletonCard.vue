<script setup lang="ts">
// #region vendor
import {
  Flex,
  TypographyText,
  SkeletonAvatar,
  Card,
  SkeletonInput,
} from '@workai/ui/components';
import { EFontWeight, ETypographyVariant } from '@workai/ui/types';
// #endregion
// #region internal
// #endregion
</script>

<template>
  <Card>
    <Flex vertical :gap="24">
      <TypographyText
        :variant="ETypographyVariant.Headline3"
        :font-weight="EFontWeight.Semibold"
        content="Skeleton"
      />
      <Flex vertical :gap="12">
        <SkeletonAvatar active />
        <SkeletonInput active />
        <SkeletonInput active />
        <SkeletonInput active />
      </Flex>
    </Flex>
  </Card>
</template>
