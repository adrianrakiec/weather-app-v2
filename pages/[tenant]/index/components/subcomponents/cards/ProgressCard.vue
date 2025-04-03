<script setup lang="ts">
// #region vendor
import {
  Card,
  Flex,
  TypographyText,
  Progress,
  Spin,
  Tag,
  Icon,
  FeaturedIcon,
  Button,
} from '@workai/ui/components';
import { EFlexWrap } from '@workai/ui/types';
import {
  ETypographyVariant,
  EFontWeight,
  EFlexAlign,
  EProgressStatus,
  EProgressSize,
  ESpinSize,
  ETagColor,
  EIconType,
  EFeaturedIconTheme,
} from '@workai/ui/types';
// #endregion
// #region internal
// #endregion
</script>

<template>
  <Card>
    <Flex vertical :gap="24">
      <Flex vertical :gap="24">
        <TypographyText
          :variant="ETypographyVariant.Headline3"
          :font-weight="EFontWeight.Semibold"
          content="Progress"
        />
        <Progress />
        <Progress :percent="40" :status="EProgressStatus.Success" />
        <Progress :percent="80" :status="EProgressStatus.Exception" />
        <Progress :percent="50" :size="EProgressSize.Small" />
      </Flex>
      <Flex vertical :gap="24">
        <TypographyText
          :variant="ETypographyVariant.Headline3"
          :font-weight="EFontWeight.Semibold"
          content="Spin"
        />
        <Flex :gap="48">
          <Spin />
          <Spin :size="ESpinSize.Small"> <Button>Button</Button></Spin>
        </Flex>
      </Flex>
      <Flex vertical :gap="24">
        <TypographyText
          :variant="ETypographyVariant.Headline3"
          :font-weight="EFontWeight.Semibold"
          content="Tags"
        />
        <Flex
          :gap="12"
          :wrap="isMdResolution ? EFlexWrap.Wrap : EFlexWrap.NoWrap"
        >
          <Tag>
            <Icon name="checkmark-circle" />
            Tag Basic
          </Tag>
          <Tag :color="ETagColor.Success">
            <Icon name="checkmark-circle" />
            Tag Basic
          </Tag>
          <Tag :color="ETagColor.Error">
            <Icon name="checkmark-circle" />
            Tag Basic
          </Tag>
        </Flex>
      </Flex>
      <Flex vertical :gap="24">
        <TypographyText
          :variant="ETypographyVariant.Headline3"
          :font-weight="EFontWeight.Semibold"
          content="Icon"
        />
        <Flex :gap="24" :align="EFlexAlign.Center">
          <Icon name="building" />
          <Icon name="building" :type="EIconType.Filled" />
          <FeaturedIcon :theme="EFeaturedIconTheme.Dark">
            <Icon name="person-circle" />
          </FeaturedIcon>
          <FeaturedIcon is-rounded>
            <Icon name="person-circle" />
          </FeaturedIcon>
        </Flex>
      </Flex>
    </Flex>
  </Card>
</template>
