<script setup lang="ts">
// #region vendor
import {
  Switch,
  Icon,
  Dropdown,
  Menu,
  MenuItem,
  MenuItemGroup,
  MenuDivider,
  TypographyText,
  Flex,
} from '@workai/ui/components';
import {
  EFlexJustify,
  EFlexAlign,
  ETypographyVariant,
  EDropdownTrigger,
  EFontWeight,
} from '@workai/ui/types';
// #endregion
// #region internal
import { useAvatarDropdown } from './hooks/useAvatarDropdown';
// #endregion

const {
  isDarkTheme,
  isAAAContrastMode,
  open,
  userData,
  handleToggleMenu,
  handleOpenChange,
} = useAvatarDropdown();
</script>

<template>
  <Dropdown
    class="cursor-pointer"
    v-model:open="open"
    :trigger="EDropdownTrigger.Click"
    @openChange="handleOpenChange"
  >
    <button @click="handleToggleMenu">
      <Flex :gap="8" :align="EFlexAlign.Center" :justify="EFlexJustify.Center">
        <Avatar
          :id="userData?.externalId"
          :name="userData?.name"
          :firstname="userData?.data?.firstname"
          :surname="userData?.data?.surname"
        />
        <Icon
          class="text-[20px] transition-transform"
          :class="{ '-rotate-180': open }"
          name="chevron-down"
        />
      </Flex>
    </button>
    <template #overlay>
      <Menu :selectable="false" class="w-[280px]">
        <MenuItemGroup>
          <template #title>
            <Flex :gap="12">
              <Avatar
                :id="userData?.externalId"
                :name="userData?.name"
                :firstname="userData?.data?.firstname"
                :surname="userData?.data?.surname"
              />
              <Flex vertical>
                <div class="line-clamp-1">
                  <TypographyText
                    :variant="ETypographyVariant.Text2"
                    :font-weight="EFontWeight.Semibold"
                    :content="userData?.name"
                  />
                </div>
                <div class="line-clamp-1">
                  <TypographyText
                    :variant="ETypographyVariant.Caption1"
                    :content="userData?.email"
                  />
                </div>
              </Flex>
            </Flex>
          </template>
        </MenuItemGroup>
        <MenuDivider />
        <MenuItem key="administration">
          <NuxtLink
            class="w-full"
            :to="getPagePath().tenant.administration.index"
          >
            <Flex :align="EFlexAlign.Center" gap="12">
              <Icon :width="20" name="settings" />
              <TypographyText
                :variant="ETypographyVariant.Text2"
                :content="$t('page.administration.index.meta.title')"
              />
            </Flex>
          </NuxtLink>
        </MenuItem>
        <MenuDivider />
        <MenuItem key="dark-theme">
          <Flex :align="EFlexAlign.Center" :gap="12">
            <Icon :width="20" name="dark-theme" />
            <Flex
              :flex="1"
              :align="EFlexAlign.Center"
              :justify="EFlexJustify.SpaceBetween"
              :gap="12"
            >
              <TypographyText
                :variant="ETypographyVariant.Text2"
                :content="
                  $t(
                    'component.header.theHeader.subcomponents.avatarDropdown.theme'
                  )
                "
              />
              <Switch v-model:checked="isDarkTheme" />
            </Flex>
          </Flex>
        </MenuItem>
        <MenuItem key="contrast-mode">
          <Flex :align="EFlexAlign.Center" :gap="12">
            <Icon :width="20" name="eye-lines" />
            <Flex
              :flex="1"
              :align="EFlexAlign.Center"
              :justify="EFlexJustify.SpaceBetween"
              :gap="12"
            >
              <TypographyText
                :variant="ETypographyVariant.Text2"
                :content="
                  $t(
                    'component.header.theHeader.subcomponents.avatarDropdown.contrastMode'
                  )
                "
              />
              <Switch v-model:checked="isAAAContrastMode" />
            </Flex>
          </Flex>
        </MenuItem>
        <MenuDivider />
        <MenuItem key="logout">
          <NuxtLink class="w-full" :to="getPagePath().tenant.authLogout">
            <Flex :align="EFlexAlign.Center" gap="12">
              <Icon :width="20" name="sign-out" />
              <TypographyText
                :variant="ETypographyVariant.Text2"
                :content="$t('neutral.logout')"
              />
            </Flex>
          </NuxtLink>
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>
