<script setup lang="ts">
// #region vendor
import {
  Menu,
  MenuItem,
  Icon,
  TypographyText,
  Flex,
} from '@workai/ui/components';
import { EFlexAlign, ETypographyVariant } from '@workai/ui/types';
// #endregion
// #region internal
import { EMenuClasses } from '../consts';
import { useAdminMenu } from './hooks/useAdminMenu';
import { MENU_KEY } from './consts';
// #endregion

const { selectedKey, scrollToActiveMenuItem } = useAdminMenu();
</script>
<template>
  <Menu
    mode="horizontal"
    :selectable="false"
    class="px-xl max-w-content w-full mx-auto overflow-x-auto"
  >
    <Flex :gap="24">
      <MenuItem
        :class="{
          [`${EMenuClasses.ActiveMenuItem}`]:
            selectedKey === getPagePath().tenant.index,
        }"
        :key="MENU_KEY.Components"
        class="!bg-transparent"
      >
        <NuxtLink
          class="w-full"
          :to="getPagePath().tenant.index"
          @click="scrollToActiveMenuItem"
        >
          <Flex :align="EFlexAlign.Center" gap="12">
            <Icon :width="20" name="code-block" />
            <TypographyText
              :variant="ETypographyVariant.Text2"
              :content="$t('layout.default.sider.items.components')"
            />
          </Flex>
        </NuxtLink>
      </MenuItem>
    </Flex>
  </Menu>
</template>
