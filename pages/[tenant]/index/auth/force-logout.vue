<script lang="ts" setup>
// #region vendor
import { Flex, Button, TypographyText, Empty } from '@workai/ui/components';
import {
  EEmptyImageTemplate,
  ETypographyVariant,
  EButtonType,
  EFlexAlign,
} from '@workai/ui/types';
// #endregion
// #region internal
import { useForceLogout } from './hooks/useForceLogout';
// #endregion

const { handleForceLogout } = useForceLogout();

definePageMeta({
  layout: 'public',
});
</script>

<template>
  <Empty :template="EEmptyImageTemplate.Error">
    <template #description>
      <Flex vertical :gap="16" :align="EFlexAlign.Center">
        <Flex vertical :gap="4">
          <TypographyText
            :variant="ETypographyVariant.Headline3"
            :content="$t('page.forceLogout.title')"
          />
          <TypographyText
            :variant="ETypographyVariant.Text2"
            :content="$t('page.forceLogout.description')"
          />
        </Flex>
        <Button :type="EButtonType.Primary" @click="handleForceLogout()">
          {{ $t('neutral.logout') }}
        </Button>
      </Flex>
    </template>
  </Empty>
</template>
