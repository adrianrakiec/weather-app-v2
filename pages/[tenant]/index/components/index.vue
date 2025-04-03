<script setup lang="ts">
// #region vendor
import { Flex } from '@workai/ui/components';
// #endregion
// #region internal
import Welcome from './subcomponents/Welcome/Welcome.vue';
// #endregion

const { t } = useI18n();

useHead({
  title: t('page.components.index.meta.title'),
});
</script>

<template>
  <Flex class="w-full" vertical>
    <Flex
      :gap="32"
      class="pt-md px-xl max-w-content w-full mx-auto h-full overflow-auto"
    >
      <Welcome />
    </Flex>
  </Flex>
</template>
