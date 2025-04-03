<script setup lang="ts">
// #region vendor
import {
  LayoutHeader,
  Flex,
  TypographyLink,
  Button,
  Icon,
} from '@workai/ui/components';
import {
  EFlexJustify,
  EFlexAlign,
  ETypographyVariant,
  EFontWeight,
  EButtonType,
} from '@workai/ui/types';
import sygnetWorkai from '@public/images/sygnet-workai.svg';
// #endregion
// #region internal
import { useTheHeader } from './hooks/useTheHeader';
import AvatarDropdown from './subcomponents/AvatarDropdown/AvatarDropdown.vue';
import type { TTheHeaderEmits } from './types';
// #endregion

const emits = defineEmits<TTheHeaderEmits>();

const {
  authStore,
  tenantSettings,
  publicConfig,
  homepageHref,
  handleHomepageLinkClick,
  handleToggleSider,
} = useTheHeader(emits);
</script>

<template>
  <LayoutHeader>
    <Flex
      class="w-full"
      :gap="24"
      :justify="EFlexJustify.SpaceBetween"
      :align="EFlexAlign.Center"
    >
      <Flex :gap="8" flex="1">
        <Flex :align="EFlexAlign.Center" :gap="20">
          <img
            v-if="!isSmResolution"
            class="w-[40px] h-[40px]"
            :src="sygnetWorkai"
            :alt="$t('component.header.theHeader.logo.alt')"
          />
          <TypographyLink
            :variant="ETypographyVariant.Paragraph1"
            :font-weight="EFontWeight.Semibold"
            :content="$t('component.header.theHeader.appName')"
            :href="homepageHref"
            @click.prevent="handleHomepageLinkClick"
            no-wrap
          />
        </Flex>
        <Button :type="EButtonType.Text" @click="handleToggleSider">
          <template #icon>
            <Icon name="navigation" />
          </template>
        </Button>
      </Flex>
      <Flex :align="EFlexAlign.Center" :gap="16">
        <NotificationsCenter
          :current-user-id="authStore.userId"
          :organization-id="tenantSettings?.organizationId || 0"
          :applications="publicConfig.NOTIFICATIONS_APPLICATIONS.split(' ')"
          :service-proxy-url-prefix="`${publicConfig.API_NOTIFICATIONS}`"
          :notifications-service-api-url="`${publicConfig.API_NOTIFICATIONS}`"
          :product-name="publicConfig.PRODUCT_NAME"
        />
        <AvatarDropdown />
      </Flex>
    </Flex>
  </LayoutHeader>
</template>
