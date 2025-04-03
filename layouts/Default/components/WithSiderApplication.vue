<script setup lang="ts">
// #region vendor
import {
  EButtonSize,
  EButtonType,
  EDrawerVariant,
  EFlexAlign,
  EFlexJustify,
  ELayoutSiderVariant,
  ETooltipPlacement,
  ETypographyColor,
  ETypographyVariant,
  ELayoutClasses,
  type ILayoutSiderProps,
} from '@workai/ui/types';
import {
  Button,
  Flex,
  Icon,
  LayoutSider,
  Tooltip,
  TypographyText,
} from '@workai/ui/components';
import { computed, ref } from 'vue';
// #endregion
// #region internal
import sygnetWorkai from '@public/images/sygnet-workai.svg';
import { DRAWER_APP_LIMIT, quickLaunchData } from '../../consts';
import ApplicationDrawer from './ApplicationDrawer.vue';
// #endregion

const props = defineProps<
  ILayoutSiderProps & {
    quickLaunchVariant?: string;
    count?: number;
  }
>();

const open = ref(false);

const showDrawer = () => {
  open.value = !open.value;
};

const visibleApps = computed(() =>
  quickLaunchData.slice(0, props.count || DRAWER_APP_LIMIT)
);

const hiddenApps = computed(() =>
  quickLaunchData.slice(props.count || DRAWER_APP_LIMIT)
);
</script>

<template>
  <LayoutSider
    v-if="props.quickLaunchVariant !== EDrawerVariant.QuickLaunchMobile"
    v-bind="props"
    :variant="ELayoutSiderVariant.QuickLaunch"
    :class="
      props.quickLaunchVariant === EDrawerVariant.QuickLaunchMobile
        ? 'md:hidden flex'
        : 'hidden md:flex'
    "
  >
    <Flex
      vertical
      :justify="EFlexJustify.Center"
      :align="EFlexAlign.Center"
      :gap="24"
    >
      <img
        class="w-[32px] h-[32px]"
        :src="sygnetWorkai"
        :alt="$t('component.header.theHeader.logo.alt')"
      />
      <Flex vertical :gap="12">
        <Flex
          v-for="app in visibleApps"
          :key="app.name"
          vertical
          :justify="EFlexJustify.Center"
          :align="EFlexAlign.Center"
          :gap="4"
        >
          <Tooltip :title="app.name" :placement="ETooltipPlacement.Right">
            <Button :size="EButtonSize.Small">
              <template #icon>
                <Icon :name="app.icon" />
              </template>
            </Button>
          </Tooltip>
          <TypographyText
            :variant="ETypographyVariant.Caption2"
            :content="app.name"
            :color="ETypographyColor.Headline"
            style="
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              width: 100%;
              max-width: 44px;
              text-align: center;
            "
          />
        </Flex>
      </Flex>
      <Flex
        vertical
        :justify="EFlexJustify.Center"
        :align="EFlexAlign.Center"
        :gap="4"
      >
        <Tooltip title="Więcej aplikacji" :placement="ETooltipPlacement.Right">
          <Button
            :size="EButtonSize.Small"
            @click="showDrawer"
            :type="EButtonType.Text"
          >
            <template #icon>
              <Icon name="more" />
            </template>
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  </LayoutSider>
  <Flex
    v-else
    :gap="12"
    class="px-[16px] py-[8px] md:hidden flex z-[90] ant-layout-qiuck-lanuch-mobile"
    :class="ELayoutClasses.QuickLaunchMobile"
    :justify="EFlexJustify.SpaceBetween"
  >
    <Flex
      v-for="app in visibleApps"
      :key="app.name"
      vertical
      :justify="EFlexJustify.Center"
      :align="EFlexAlign.Center"
      :gap="4"
    >
      <Tooltip :title="app.name" :placement="ETooltipPlacement.Top">
        <Button
          :href="app.url"
          :type="EButtonType.Text"
          class="w-[60px] h-[50px]"
        >
          <Flex
            vertical
            :justify="EFlexJustify.Center"
            :align="EFlexAlign.Center"
            :gap="4"
          >
            <Icon :name="app.icon" :width="24" />
            <TypographyText
              :variant="ETypographyVariant.Caption1"
              :color="ETypographyColor.Text"
              :content="app.name"
              style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 100%;
                max-width: 44px;
                text-align: center;
              "
            />
          </Flex>
        </Button>
      </Tooltip>
    </Flex>
    <Flex v-if="hiddenApps.length" class="relative">
      <Button
        @click="showDrawer"
        :type="EButtonType.Text"
        class="w-[60px] h-[50px]"
      >
        <Flex
          vertical
          :justify="EFlexJustify.Center"
          :align="EFlexAlign.Center"
          :gap="4"
        >
          <Icon name="more" />
          <TypographyText
            :color="ETypographyColor.Text"
            :variant="ETypographyVariant.Caption1"
            content="More"
            style="
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              width: 100%;
              max-width: 44px;
              text-align: center;
            "
          />
        </Flex>
      </Button>
    </Flex>
  </Flex>
  <ApplicationDrawer
    :showDrawer="showDrawer"
    :hiddenApps="hiddenApps"
    :with-offset-left="true"
    v-model:open="open"
    :variant="
      props.quickLaunchVariant === EDrawerVariant.QuickLaunchMobile
        ? EDrawerVariant.QuickLaunchMobile
        : EDrawerVariant.QuickLaunch
    "
  />
</template>
