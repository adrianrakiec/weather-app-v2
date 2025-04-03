<script setup lang="ts">
// #region vendor
import { LayoutContent, Layout } from '@workai/ui/components';
// #endregion
// #region internal
// #endregion
</script>

<template>
  <Layout>
    <LayoutContent class="bg-white">
      <slot />
    </LayoutContent>

    <FooterTheFooter />
  </Layout>
</template>
