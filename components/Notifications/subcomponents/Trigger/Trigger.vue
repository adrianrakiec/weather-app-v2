<script setup lang="ts">
// #region vendor
import { Button, Badge, Icon } from '@workai/ui/components';
import { EButtonType, EIconType, EBadgeSize } from '@workai/ui/types';
// #endregion
// #region internal
import type { TTriggerProps } from './types';
// #endregion

withDefaults(defineProps<TTriggerProps>(), {
  unReadNotificationsCount: 0,
});
</script>

<template>
  <Button :type="EButtonType.Text">
    <template #icon>
      <Badge
        :count="unReadNotificationsCount"
        :overflow-count="unReadNotificationsCount"
        :size="EBadgeSize.Small"
      >
        <Icon
          name="alert"
          :type="
            unReadNotificationsCount === 0
              ? EIconType.Regular
              : EIconType.Filled
          "
        />
      </Badge>
    </template>
  </Button>
</template>
