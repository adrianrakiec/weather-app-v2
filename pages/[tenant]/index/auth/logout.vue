<script lang="ts" setup>
// #region vendor
import { Spin } from '@workai/ui/components';
// #endregion
// #region internal
import { useLogout } from './hooks/useLogout';
// #endregion

const { handleOnMounted } = useLogout();

onMounted(handleOnMounted);

definePageMeta({
  layout: 'public',
});
</script>

<template>
  <Spin spinning is-full />
</template>
