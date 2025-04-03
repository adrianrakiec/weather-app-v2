<script setup lang="ts">
// #region vendor
// #endregion
// #region internal
import LoginSection from './subcomponents/LoginSection.vue';
// #endregion

const { t } = useI18n();

localStorage.removeItem('oidc_requested_url');

useHead({
  title: t('page.index.meta.title'),
});

definePageMeta({
  layout: 'login',
});
</script>

<template>
  <LoginSection />
</template>
