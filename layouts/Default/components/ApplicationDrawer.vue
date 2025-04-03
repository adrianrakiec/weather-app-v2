<script setup lang="ts">
// #region vendor
import {
  EButtonType,
  EDrawerPlacement,
  EDrawerVariant,
  EFlexAlign,
  EFlexJustify,
  EFlexWrap,
  EFontWeight,
  EIconType,
  ETypographyColor,
  ETypographyVariant,
  type IDrawerProps,
} from '@workai/ui/types';
import {
  Button,
  Drawer,
  Flex,
  Icon,
  Tooltip,
  TypographyText,
} from '@workai/ui/components';
import { computed } from 'vue';
// #endregion
// #region internal
import sygnetWorkai from '@public/images/sygnet-workai.svg';
import { DRAWER_OFFSET_LEFT, SIDER_WIDTH } from '../../consts';
// #endregion

const props = defineProps<
  IDrawerProps & {
    open: boolean;
    showDrawer: () => void;
    hiddenApps?: any[];
    withOffsetLeft?: boolean;
  }
>();

const open = computed(() => props.open);

const emit = defineEmits(['update:open']);

const closeDrawer = () => {
  emit('update:open', false);
};

const isMobileView = props.variant === EDrawerVariant.QuickLaunchMobile;
</script>
<template>
  <Drawer
    v-model:visible="open"
    :width="!isMobileView ? SIDER_WIDTH : undefined"
    :mask="false"
    :placement="isMobileView ? EDrawerPlacement.Bottom : EDrawerPlacement.Left"
    :contentWrapperStyle="
      isMobileView
        ? {
            bottom: open ? '67px' : '0',
            maxHeight: '300px',
            overflow: 'auto',
            zIndex: '90',
          }
        : {
            left:
              open && props.withOffsetLeft
                ? `${DRAWER_OFFSET_LEFT}px !important`
                : '',
          }
    "
    :closable="false"
    :class="!isMobileView ? 'max-w-[320px]' : undefined"
    :with-border="true"
  >
    <template #title>
      <Flex :align="EFlexAlign.Center" :gap="20">
        <img :src="sygnetWorkai" alt="Logo" class="logo" />
        <TypographyText
          :variant="ETypographyVariant.Paragraph1"
          :font-weight="EFontWeight.Semibold"
          content="Application"
        />
      </Flex>
    </template>
    <template #extra>
      <Button :type="EButtonType.Link" @click="closeDrawer">
        <template #icon>
          <Icon name="dismiss" :type="EIconType.Regular" />
        </template>
      </Button>
    </template>
    <Flex :wrap="EFlexWrap.Wrap" style="row-gap: 1rem; column-gap: 0.5rem">
      <Tooltip
        v-for="app in props.hiddenApps"
        :key="app.name"
        :title="app.name"
      >
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
              :color="ETypographyColor.Paragraph"
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
  </Drawer>
</template>
