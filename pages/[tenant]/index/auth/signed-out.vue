<script setup lang="ts">
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
import { useSignedOut } from './hooks/useSignedOut';
// #endregion

const { handleLogin } = useSignedOut();

definePageMeta({
  layout: 'public',
});
</script>

<template>
  <Empty :template="EEmptyImageTemplate.Done" class="m-auto">
    <template #description>
      <Flex vertical :gap="16" :align="EFlexAlign.Center">
        <Flex vertical :gap="4">
          <TypographyText
            :variant="ETypographyVariant.Headline3"
            :content="$t('page.signedOut.title')"
          />
          <TypographyText
            :variant="ETypographyVariant.Text2"
            :content="$t('page.signedOut.description')"
          />
        </Flex>
        <Button :type="EButtonType.Primary" @click="handleLogin()">
          {{ $t('neutral.login') }}
        </Button>
      </Flex>
    </template>
  </Empty>
</template>
