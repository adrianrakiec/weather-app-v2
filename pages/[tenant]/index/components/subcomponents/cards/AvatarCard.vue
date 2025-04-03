<script setup lang="ts">
// #region vendor
import {
  Avatar,
  AvatarGroup,
  Card,
  Flex,
  Icon,
  TypographyText,
} from '@workai/ui/components';
import { ETypographyVariant, EFontWeight, EAvatarSize } from '@workai/ui/types';
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
          content="Avatars"
        />
        <Flex :gap="12" vertical>
          <Avatar
            src="https://picsum.photos/200"
            is-with-border
            :size="EAvatarSize.Large"
          />
          <Avatar is-with-border>AV</Avatar>
          <Avatar is-with-border>
            <template #icon>
              <Icon name="person" />
            </template>
          </Avatar>
        </Flex>
      </Flex>
      <Flex vertical :gap="24">
        <TypographyText
          :variant="ETypographyVariant.Headline3"
          :font-weight="EFontWeight.Semibold"
          content="Avatar Group"
        />
        <AvatarGroup :max-count="isMdResolution ? 1 : 5">
          <Avatar src="https://picsum.photos/200" />
          <Avatar src="https://picsum.photos/600" />
          <Avatar>AV</Avatar>
          <Avatar src="https://picsum.photos/200" />
          <Avatar src="https://picsum.photos/100" />
          <Avatar src="https://picsum.photos/300" />
          <Avatar src="https://picsum.photos/200" />
          <Avatar src="https://picsum.photos/100" />
        </AvatarGroup>
      </Flex>
    </Flex>
  </Card>
</template>
