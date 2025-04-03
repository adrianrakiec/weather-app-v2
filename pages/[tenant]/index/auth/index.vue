<script lang="ts" setup>
// #region vendor
import { Spin } from '@workai/ui/components';
// #endregion
// #region internal
import { useAuthorization } from './hooks/useAuthorization';
// #endregion

const { authenticateOidc } = useAuthorization();

authenticateOidc();

definePageMeta({
  layout: 'public',
});
</script>

<template>
  <Spin spinning is-full />
</template>
