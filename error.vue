<script setup lang="ts">
// #region vendor
import { ConfigProvider } from '@workai/ui/components';
// #endregion
// #region internal
// #endregion

const error = useError();

if (error.value && 'statusCode' in error.value) {
  if (error.value.statusCode >= 403) {
    clearError({
      redirect: getPagePath().error.code(error.value.statusCode),
    });
  }
} else {
  clearError({
    redirect: getPagePath().tenant.index,
  });
}
</script>

<template>
  <ConfigProvider></ConfigProvider>
</template>
