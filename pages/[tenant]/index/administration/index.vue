<script setup lang="ts">
// #region vendor
import { Flex, TypographyText, Icon, PageHeader } from '@workai/ui/components';
import { ETypographyVariant, EFlexAlign } from '@workai/ui/types';
import Welcome from '../components/subcomponents/Welcome/Welcome.vue';
// #endregion
// #region internal
// #endregion

const { t } = useI18n();

useHead({
  title: t('page.administration.index.meta.title'),
});

definePageMeta({
  layout: 'administration',
});
</script>

<template>
  <Flex class="pt-md px-xl max-w-content w-full mx-auto" vertical :gap="32">
    <PageHeader>
      <Breadcrumbs icon="content-settings" />
      <template #title>
        <Flex :flex="1" :align="EFlexAlign.Center" :gap="12">
          <Icon :width="32" name="building-multiple" />
          <TypographyText
            :variant="ETypographyVariant.Headline1"
            :content="$t('page.administration.index.meta.title')"
            no-wrap
          />
        </Flex>
      </template>
    </PageHeader>
    <TypographyText
      :variant="ETypographyVariant.Text2"
      content="Administration Page"
    />
  </Flex>
  <Flex class="w-full" vertical>
    <Flex
      :gap="32"
      class="pt-md px-xl max-w-content w-full mx-auto h-full overflow-auto"
    >
      <Welcome />
    </Flex>
  </Flex>
</template>
