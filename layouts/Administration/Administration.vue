<script setup lang="ts">
// #region vendor
import {
  Flex,
  LayoutContent,
  LayoutSider,
  Layout,
} from '@workai/ui/components';
// #endregion
// #region internal
import { ESizerWidth } from '@config/consts/sizes';
import { useAdministrationLayout } from './hooks/useAdministrationLayout';
import { ELayoutClasses } from './types';
// #endregion

const { isSiderActive, handleToggleSider } = useAdministrationLayout();
</script>

<template>
  <Layout
    :has-sider="true"
    :class="`${isSiderActive ? `${ELayoutClasses.ActiveSidebar} h-screen` : '!overflow-inherit'}`"
    is-responsive
  >
    <Flex vertical :flex="1">
      <HeaderTheHeader @toggle-sider="handleToggleSider" />
      <Flex :flex="1">
        <LayoutSider
          :width="isSiderActive ? ESizerWidth.Default : 0"
          :collapsed="!isSiderActive"
        >
          <MenuAdminMenu @close="isSiderActive = false" />
        </LayoutSider>
        <LayoutContent class="z-1 !overflow-x-hidden">
          <slot />
        </LayoutContent>
      </Flex>
    </Flex>
  </Layout>
</template>
