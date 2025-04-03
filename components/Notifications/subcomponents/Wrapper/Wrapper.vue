<script setup lang="ts">
// #region vendor
// #endregion
// #region internal
import Trigger from '../Trigger/Trigger.vue';
import { useWrapper } from './hooks/useWrapper';
// #endregion

const { open, notificationsData, handleOpenNotifications } = useWrapper();
</script>

<template>
  <Trigger
    :un-read-notifications-count="notificationsData?.unReadCount || 0"
    @click="handleOpenNotifications"
  />
  <DrawerNotificationsDrawer
    v-model:open="open"
    :data="notificationsData?.pureNotificationsList || []"
  />
</template>
