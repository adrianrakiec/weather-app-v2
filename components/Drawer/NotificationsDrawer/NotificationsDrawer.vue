<script setup lang="ts">
// #region vendor
import {
  Drawer,
  Flex,
  FeaturedIcon,
  TypographyText,
  Button,
  Icon,
  Divider,
  Empty,
  Tag,
} from '@workai/ui/components';
import {
  EFlexJustify,
  EFlexAlign,
  ETypographyVariant,
  EButtonType,
  EDrawerPlacement,
  EDividerVariant,
  EEmptyImageTemplate,
  EFontWeight,
  ETagColor,
} from '@workai/ui/types';
// #endregion
// #region internal
import Notification from './subcomponents/Notification/Notification.vue';
import type {
  TNotificationsDrawerProps,
  TNotificationsDrawerEmits,
} from './types';
import { useNotificationsDrawer } from './hooks/useNotificationsDrawer';
import { EDrawerWidth } from '@config/consts/sizes';
// #endregion

const props = defineProps<TNotificationsDrawerProps>();
const emits = defineEmits<TNotificationsDrawerEmits>();

const {
  openModel,
  handleClose,
  newNotificationsCount,
  handleMarkAllAsClicked,
  notificationService,
  notificationServiceError,
  filteredNotifications,
} = useNotificationsDrawer(props, emits);
</script>

<template>
  <Drawer
    v-model:open="openModel"
    :placement="EDrawerPlacement.Right"
    :mask-closable="true"
    @close="handleClose"
    :closable="false"
    :width="isSmResolution ? EDrawerWidth.Full : EDrawerWidth.Default"
    :push="false"
  >
    <!-- header -->
    <template #title>
      <Flex :align="EFlexAlign.Center" :gap="12">
        <FeaturedIcon is-rounded>
          <Icon name="alert-on" />
        </FeaturedIcon>
        <TypographyText
          :variant="ETypographyVariant.Headline5"
          :content="$t('component.drawer.notifications.title')"
        />
        <Tag :color="ETagColor.Brand"> {{ newNotificationsCount }} </Tag>
      </Flex>
    </template>
    <template #extra>
      <Button :type="EButtonType.Link" @click="handleClose">
        <template #icon>
          <Icon name="dismiss" />
        </template>
      </Button>
    </template>
    <!-- body -->
    <Flex
      v-if="
        !notificationServiceError && !notificationService?.context.status.error
      "
      vertical
      :justify="EFlexJustify.FlexStart"
      :gap="20"
    >
      <Button
        v-if="filteredNotifications.length"
        :type="EButtonType.Link"
        block
        @click="handleMarkAllAsClicked"
      >
        <Icon name="checkmark" />
        {{ $t('component.drawer.notifications.actions.markAllAsRead') }}
      </Button>

      <Flex vertical :gap="16" v-if="filteredNotifications.length">
        <Flex
          v-for="(notification, index) in filteredNotifications"
          :key="notification.id"
          vertical
          :gap="16"
        >
          <Notification :notification-object="notification" />
          <Divider
            v-if="index < filteredNotifications.length - 1"
            :variant="EDividerVariant.Light"
          />
        </Flex>
      </Flex>
      <Flex v-else :justify="EFlexJustify.Center">
        <Empty :template="EEmptyImageTemplate.EmptyInbox">
          <template #description>
            <Flex vertical :gap="4">
              <TypographyText
                :variant="ETypographyVariant.Headline5"
                :font-weight="EFontWeight.Semibold"
                :content="$t('component.drawer.notifications.noElements.title')"
              />
              <TypographyText
                :variant="ETypographyVariant.Text2"
                :content="
                  $t('component.drawer.notifications.noElements.description')
                "
              />
            </Flex>
          </template>
        </Empty>
      </Flex>
    </Flex>
    <div v-else>
      <TypographyText type="danger" :content="$t('neutral.error.message')" />
    </div>
  </Drawer>
</template>
