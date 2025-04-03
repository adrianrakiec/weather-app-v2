<script setup lang="ts">
// #region vendor
import {
  LayoutContent,
  Flex,
  Button,
  MenuItem,
  TypographyText,
  Icon,
  LayoutSider,
  Menu,
  MenuItemGroup,
  Layout,
  SubMenu,
} from '@workai/ui/components';
import {
  EButtonType,
  EFlexAlign,
  EFlexJustify,
  ELayoutClasses,
  EMenuClasses,
  EMenuMode,
  ETypographyVariant,
} from '@workai/ui/types';
import { ref } from 'vue';
import { menuItems, type TMenuItem } from '../../consts';
import { useAdminMenu } from '@components/Menu/AdminMenu/hooks/useAdminMenu';
// #endregion
// #region internal
// #endregion

const { scrollToActiveMenuItem } = useAdminMenu();

const isSiderActive = ref(true);

const toggleSider = () => {
  isSiderActive.value = !isSiderActive.value;
};

const currentPath = ref('');

const isActive = (path: string | undefined): boolean => {
  if (path === undefined) {
    return false;
  }

  return currentPath.value === path;
};

const isChildActive = (child: TMenuItem): boolean => {
  return (
    isActive(child.path) ||
    (child.children ? isParentActive(child.children) : false)
  );
};

const isParentActive = (children: TMenuItem[]): boolean => {
  return children?.some(isChildActive) ?? false;
};

const handleItemClick = (path: string | undefined): void => {
  if (!path) {
    return;
  }

  currentPath.value = path;
};

const closeSider = () => {
  isSiderActive.value = false;
};
</script>

<template>
  <Layout
    :class="isSiderActive ? ELayoutClasses.ActiveSidebar : ''"
    isResponsive
  >
    <Flex vertical :flex="1">
      <HeaderTheHeader @toggle-sider="toggleSider" />

      <Flex :flex="1">
        <LayoutSider
          :width="320"
          :collapsed="!isSiderActive"
          @close="closeSider"
        >
          <Menu :mode="EMenuMode.Inline">
            <Flex
              :justify="EFlexJustify.FlexEnd"
              :align="EFlexAlign.Center"
              class="xl:hidden flex"
            >
              <Button :type="EButtonType.Text" @click="closeSider">
                <template #icon>
                  <Icon name="dismiss" />
                </template>
              </Button>
            </Flex>
            <MenuItemGroup
              v-for="group in menuItems"
              :key="group.title"
              :title="group.title"
            >
              <template v-for="item in group.items">
                <MenuItem
                  v-if="item.path"
                  :key="`item-${item.key}`"
                  :class="{
                    [`${EMenuClasses.ActiveMenuItem}`]: isActive(item.path),
                  }"
                  @click="handleItemClick(item.path)"
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
                <SubMenu
                  v-else
                  :key="`submenu-${item.key}`"
                  :class="{
                    [`${EMenuClasses.ActiveSubMenu}`]: isParentActive(
                      item.children || []
                    ),
                  }"
                  :open="isParentActive(item.children || [])"
                >
                  <template #title>
                    <Icon :name="item.icon" v-if="item.icon" />
                    <TypographyText
                      :variant="ETypographyVariant.Text2"
                      :content="item.title"
                    />
                  </template>
                  <template v-for="child in item.children || []">
                    <MenuItem
                      v-if="child.path"
                      :key="`child-${child.key}`"
                      :class="{
                        [`${EMenuClasses.ActiveMenuItem}`]: isActive(
                          child.path
                        ),
                        [`${EMenuClasses.InactiveMenuItem}`]:
                          isParentActive(item.children || []) &&
                          !isActive(child.path),
                      }"
                      @click="handleItemClick(child.path)"
                    >
                      <TypographyText
                        :variant="ETypographyVariant.Text2"
                        :content="child.title"
                      />
                    </MenuItem>
                    <SubMenu
                      v-else
                      :key="`subsubmenu-${child.key}`"
                      :title="child.title"
                      :class="{
                        [`${EMenuClasses.ActiveSubMenu}`]: isParentActive(
                          child.children || []
                        ),
                        [`${EMenuClasses.ActiveMenuItem}`]: isParentActive(
                          item.children || []
                        ),
                      }"
                      :open="isParentActive(child.children || [])"
                    >
                      <MenuItem
                        v-for="subChild in child.children || []"
                        :key="`subChild-${subChild.key}`"
                        :class="{
                          [`${EMenuClasses.ActiveMenuItem}`]: isActive(
                            subChild.path
                          ),
                          [`${EMenuClasses.InactiveMenuItem}`]:
                            isParentActive(child.children || []) &&
                            !isActive(subChild.path),
                        }"
                        @click="handleItemClick(subChild.path)"
                      >
                        <TypographyText
                          :variant="ETypographyVariant.Text2"
                          :content="subChild.title"
                        />
                      </MenuItem>
                    </SubMenu>
                  </template>
                </SubMenu>
              </template>
            </MenuItemGroup>
          </Menu>
        </LayoutSider>
        <LayoutContent>
          <slot />
        </LayoutContent>
      </Flex>
    </Flex>
  </Layout>
</template>
