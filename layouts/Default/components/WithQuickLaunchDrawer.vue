<script setup lang="ts">
// #region vendor
import { ref } from 'vue';
import {
  Layout,
  LayoutHeader,
  LayoutContent,
  Flex,
  Button,
  Divider,
  TypographyLink,
  Drawer,
  TypographyText,
  Icon,
  Tooltip,
} from '@workai/ui/components';
// #endregion
// #region internal
import sygnetWorkai from '@public/images/sygnet-workai.svg';
import {
  EButtonType,
  EDividerType,
  EDrawerPlacement,
  EDrawerVariant,
  EFlexAlign,
  EFlexJustify,
  EFlexWrap,
  EFontWeight,
  ELayoutClasses,
  ELayoutSiderVariant,
  ETooltipPlacement,
  ETypographyVariant,
} from '@workai/ui/types';
import { quickLaunchData } from '../../consts';
import { useTheHeader } from '@components/Header/TheHeader/hooks/useTheHeader';
import type { TTheHeaderEmits } from '@components/Header/TheHeader/types';
import AvatarDropdown from '@components/Header/TheHeader/subcomponents/AvatarDropdown/AvatarDropdown.vue';
// #endregion

const emits = defineEmits<TTheHeaderEmits>();

const isDrawerVisible = ref(true);
const {
  authStore,
  tenantSettings,
  publicConfig,
  homepageHref,
  handleHomepageLinkClick,
} = useTheHeader(emits);

const toggleDrawer = () => {
  isDrawerVisible.value = !isDrawerVisible.value;
};
</script>

<template>
  <Layout :hasSecondLevel="true">
    <Flex vertical :flex="1">
      <LayoutHeader class="p-0">
        <template #top>
          <Flex
            :gap="24"
            :justify="EFlexJustify.SpaceBetween"
            :align="EFlexAlign.Center"
            :class="ELayoutClasses.LayoutHeaderTop"
          >
            <Flex :gap="8" flex="1" :align="EFlexAlign.Center">
              <Button :type="EButtonType.Text" @click="toggleDrawer">
                <template #icon>
                  <img
                    class="w-[40px] h-[40px]"
                    :src="sygnetWorkai"
                    :alt="$t('component.header.theHeader.logo.alt')"
                  />
                </template>
              </Button>
              <Divider :type="EDividerType.Vertical" :height="24" />
              <TypographyLink
                :variant="ETypographyVariant.Paragraph1"
                :font-weight="EFontWeight.Semibold"
                :content="$t('component.header.theHeader.appName')"
                :href="homepageHref"
                @click.prevent="handleHomepageLinkClick"
                no-wrap
              />
            </Flex>
            <Flex :align="EFlexAlign.Center" :gap="16">
              <NotificationsCenter
                :current-user-id="authStore.userId"
                :organization-id="tenantSettings?.organizationId || 0"
                :applications="
                  publicConfig.NOTIFICATIONS_APPLICATIONS.split(' ')
                "
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
      <LayoutContent class="overflow-y-auto">
        <slot />
      </LayoutContent>
      <Drawer
        v-model:visible="isDrawerVisible"
        :width="isSmResolution ? '100%' : 320"
        :mask="false"
        :placement="EDrawerPlacement.Left"
        :isDrawerVisible="true"
        :contentWrapperStyle="{
          left: isDrawerVisible ? `0 !important` : '',
        }"
        :closable="false"
        :variant="EDrawerVariant.QuickLaunch"
      >
        <template #title>
          <Flex :align="EFlexAlign.Center" :gap="20">
            <img
              :src="sygnetWorkai"
              :alt="$t('component.header.theHeader.logo.alt')"
            />
            <TypographyText
              :variant="ETypographyVariant.Paragraph1"
              :font-weight="EFontWeight.Semibold"
              content="Application"
            />
          </Flex>
        </template>
        <template #extra>
          <Button :type="EButtonType.Link" @click="toggleDrawer">
            <template #icon>
              <Icon name="dismiss" />
            </template>
          </Button>
        </template>
        <Flex :wrap="EFlexWrap.Wrap" class="gap-y-4">
          <Tooltip
            v-for="app in quickLaunchData"
            :key="app.name"
            :title="app.name"
            class="w-1/4"
          >
            <Button :href="app.url" :type="EButtonType.Link" class="h-[50px]">
              <Flex
                vertical
                :justify="EFlexJustify.Center"
                :align="EFlexAlign.Center"
                :gap="4"
              >
                <Icon :name="app.icon" :width="24" />
                <TypographyText
                  :variant="ETypographyVariant.Caption1"
                  :content="app.name"
                  style="
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: 100%;
                    max-width: 56px;
                    text-align: center;
                  "
                />
              </Flex>
            </Button>
          </Tooltip>
        </Flex>
        <template #footer>
          <Flex gap="12">
            <Button @click="toggleDrawer">Anuluj</Button>
            <Button :type="EButtonType.Primary" block>
              Centrum Aplikacji
            </Button>
          </Flex>
        </template>
      </Drawer>
    </Flex>
  </Layout>
</template>
