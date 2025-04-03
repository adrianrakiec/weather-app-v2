<script setup lang="ts">
// #region vendor
import { Modal } from '@workai/ui/components';
// #endregion
// #region internal
import { useModal } from './hooks/useModal';
// #endregion

const { contextHolder } = useModal();
</script>

<template>
  <slot />
  <Modal />
  <contextHolder />
</template>
