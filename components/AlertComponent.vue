<template>
  <div v-if="alertStore.message" class="alert-container">
    <Alert :message="alertStore.message" :type="alertStore.type" closable />
  </div>
</template>
<script setup lang="ts">
import { Alert } from '@workai/ui/components';

const alertStore = useAlertStore();
</script>
<style scoped>
.alert-container {
  position: absolute;
  top: 1em;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  z-index: 9999;
}
</style>
