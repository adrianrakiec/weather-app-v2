<script setup lang="ts">
// #region vendor
import { Layout, Flex, LayoutContent } from '@workai/ui/components';
// #endregion
// #region internal
import HeaderWithSecondLevel from '@components/Header/HeaderWithSecondLevel/HeaderWithSecondLevel.vue';
import { ELayoutClasses } from '../../Administration/types';
import { useDefaultLayout } from '../hooks/useDefaultLayout';
// #endregion

const { isSiderActive, handleToggleSider } = useDefaultLayout();
</script>

<template>
  <Layout
    :class="`${isSiderActive ? `${ELayoutClasses.ActiveSidebar} h-screen` : ''} `"
    :hasSecondLevel="true"
  >
    <Flex vertical>
      <HeaderWithSecondLevel
        @toggle-sider="handleToggleSider"
        is-logo-visible
      />
      <LayoutContent class="overflow-y-auto">
        <slot />
      </LayoutContent>
    </Flex>
  </Layout>
</template>
