<script setup lang="ts">
// #region vendor
import { Flex, LayoutHeader, TypographyLink } from '@workai/ui/components';
import {
  EFlexJustify,
  EFlexAlign,
  ETypographyVariant,
  EFontWeight,
} from '@workai/ui/types';
import sygnetWorkai from '@public/images/sygnet-workai.svg';
// #endregion
// #region internal
import { ELayoutClasses } from '../../../layouts/Administration/types';
import { useTheHeader } from '../TheHeader/hooks/useTheHeader';
import type { TTheHeaderEmits } from '../TheHeader/types';
import AvatarDropdown from '../TheHeader/subcomponents/AvatarDropdown/AvatarDropdown.vue';
// #endregion

const emits = defineEmits<TTheHeaderEmits>();

const props = defineProps<{
  isLogoVisible: boolean;
}>();

const {
  authStore,
  tenantSettings,
  publicConfig,
  homepageHref,
  handleHomepageLinkClick,
} = useTheHeader(emits);
</script>

<template>
  <LayoutHeader>
    <template #top>
      <Flex
        class="w-full h-[64px]"
        :gap="24"
        :justify="EFlexJustify.SpaceBetween"
        :align="EFlexAlign.Center"
        :class="ELayoutClasses.LayoutHeaderTop"
      >
        <Flex :gap="8" flex="1">
          <Flex :align="EFlexAlign.Center" :gap="20">
            <img
              v-if="props.isLogoVisible && !isSmResolution"
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
    </template>
    <template #bottom>
      <Flex
        :align="EFlexAlign.Center"
        :justify="EFlexJustify.Center"
        :class="ELayoutClasses.LayoutHeaderBottom"
      >
        <MenuUserMenu />
      </Flex>
    </template>
  </LayoutHeader>
</template>
