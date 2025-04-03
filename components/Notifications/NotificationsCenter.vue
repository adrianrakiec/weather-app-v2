<script setup lang="ts">
// #region vendor
// #endregion
// #region internal
import Wrapper from './subcomponents/Wrapper/Wrapper.vue';
import type { TNotificationCenterProps } from './types';
import { useNotificationCenter } from './hooks/useNotificationCenter';
// #endregion

const props = withDefaults(defineProps<TNotificationCenterProps>(), {
  showMoreUrl: '',
  serviceProxyUrlPrefix: '',
  organizationId: 1,
});

useNotificationCenter(props);
</script>

<template>
  <Wrapper />
</template>
