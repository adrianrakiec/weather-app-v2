<script setup lang="ts">
// #region vendor
import { SkeletonImage } from '@workai/ui/components';
// #endregion
// #region internal
import type { TProtectedImageProps } from './types';
import { useProtectedImage } from './hooks/useProtectedImage';
import { DEFAULT_PLACEHOLDER_PATH, DEFAULT_PLACEHOLDER_NAME } from './consts';
// #endregion

const props = withDefaults(defineProps<TProtectedImageProps>(), {
  src: DEFAULT_PLACEHOLDER_PATH,
  alt: undefined,
  placeholder: DEFAULT_PLACEHOLDER_NAME,
});

const { loading, imageUrl, handleError } = useProtectedImage(props);
</script>

<template>
  <SkeletonImage
    v-if="loading || !imageUrl"
    :active="true"
    class="max-w-full max-h-full flex h-full [&_.ant-skeleton-image]:h-full [&_.ant-skeleton-image]:w-full"
  />
  <img
    v-else
    :src="imageUrl"
    class="max-w-full flex object-cover"
    @error="handleError"
  />
</template>
