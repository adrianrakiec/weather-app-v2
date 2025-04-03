<script lang="ts" setup>
// #region vendor
import { Spin } from '@workai/ui/components';
// #endregion
// #region internal
import { useSilentRenew } from './hooks/useSilentRenew';
// #endregion

const { silentRefreshOidc } = useSilentRenew();

silentRefreshOidc();

definePageMeta({
  layout: 'public',
});
</script>

<template>
  <Spin spinning is-full />
</template>
