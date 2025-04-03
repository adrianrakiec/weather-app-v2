<script setup lang="ts">
// #region vendor
import {
  Button,
  Flex,
  Icon,
  Layout,
  LayoutContent,
  LayoutSider,
  LayoutFooter,
  Tooltip,
  TypographyText,
} from '@workai/ui/components';
// #endregion
// #region internal
import HeaderWithSecondLevel from '@components/Header/HeaderWithSecondLevel/HeaderWithSecondLevel.vue';
import sygnetWorkai from '@public/images/sygnet-workai.svg';
import {
  EDrawerVariant,
  EFlexAlign,
  EFlexJustify,
  ELayoutSiderVariant,
  ETooltipPlacement,
  ETypographyVariant,
} from '@workai/ui/types';
import { quickLaunchData } from '../../consts';
import { useDefaultLayout } from '../hooks/useDefaultLayout';
import WithSiderApplication from './WithSiderApplication.vue';
// #endregion

const { handleToggleSider, isSiderActive } = useDefaultLayout();
</script>

<template>
  <Layout :hasSecondLevel="true">
    <Flex>
      <WithSiderApplication
        :width="54"
        :quick-launch-variant="EDrawerVariant.QuickLaunch"
      />
      <Layout :hasSecondLevel="true">
        <Flex vertical :flex="1">
          <HeaderWithSecondLevel
            @toggle-sider="handleToggleSider"
            :is-logo-visible="false"
          />
          <LayoutContent class="overflow-y-auto">
            <slot />
          </LayoutContent>
        </Flex>
        <WithSiderApplication
          :quick-launch-variant="EDrawerVariant.QuickLaunchMobile"
          :open="!isSiderActive"
        />
      </Layout>
    </Flex>
  </Layout>
</template>
