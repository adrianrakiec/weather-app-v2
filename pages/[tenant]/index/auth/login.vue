<script lang="ts" setup>
// #region vendor
import { Spin } from '@workai/ui/components';
// #endregion
// #region internal
import { useLogin } from './hooks/useLogin';
// #endregion

const { authenticateOidc } = useLogin();

authenticateOidc();

definePageMeta({
  layout: 'public',
});
</script>

<template>
  <Spin spinning is-full />
</template>
