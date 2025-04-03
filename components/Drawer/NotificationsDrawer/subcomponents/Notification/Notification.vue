<script setup lang="ts">
// #region vendor
import { Flex, Badge, TypographyText } from '@workai/ui/components';
import {
  EBadgeStatus,
  EFlexJustify,
  EBadgePlacement,
  EFontWeight,
  ETypographyVariant,
} from '@workai/ui/types';
// #endregion
// #region internal
import type { TNotificationProps } from './types';
import { useNotification } from './hooks/useNotification';
// #endregion

const props = defineProps<TNotificationProps>();

const {
  handleNotificationClick,
  getCreatedDateTime,
  getNotificationSource,
  isFullDescriptionVisible,
  hasUserProfileUrl,
  handleGoToSource,
} = useNotification(props);
</script>

<template>
  <button
    class="cursor-pointer"
    type="button"
    @click="handleNotificationClick()"
    @auxclick="handleNotificationClick()"
  >
    <Flex :gap="12">
      <Flex>
        <Avatar
          v-if="notificationObject.clicked"
          :id="notificationObject?.labels?.user?.userId"
          :name="notificationObject?.eventData?.author"
          :firstname="notificationObject?.eventData?.firstname"
          :surname="notificationObject?.eventData?.surname"
        />
        <Badge
          v-else
          dot
          :status="EBadgeStatus.Error"
          :placement="EBadgePlacement.TopLeft"
        >
          <Avatar
            :id="notificationObject?.labels?.user?.userId"
            :name="notificationObject?.eventData?.author"
            :firstname="notificationObject?.eventData?.firstname"
            :surname="notificationObject?.eventData?.surname"
          />
        </Badge>
      </Flex>
      <Flex class="text-left" vertical :gap="4">
        <Flex vertical :gap="2">
          <TypographyText
            v-if="notificationObject?.eventData?.author"
            class="line-clamp-1"
            :font-weight="EFontWeight.Semibold"
            :content="notificationObject?.eventData?.author"
          />
          <TypographyText
            :class="{
              'line-clamp-2': !isFullDescriptionVisible,
            }"
            :content="notificationObject.message"
          />
        </Flex>
        <Flex :gap="12" :justify="EFlexJustify.SpaceBetween">
          <TypographyText
            class="line-clamp-1"
            :variant="ETypographyVariant.Caption1"
            :content="getCreatedDateTime(notificationObject.created)"
          />
          <TypographyText
            class="line-clamp-1"
            :variant="ETypographyVariant.Caption2"
            :content="`#${getNotificationSource(notificationObject.application)}`"
          />
        </Flex>
      </Flex>
    </Flex>
  </button>
</template>
