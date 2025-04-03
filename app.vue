<script setup lang="ts">
// #region vendor
import { ConfigProvider, Spin } from '@workai/ui/components';
import { ETheme, EContrastMode } from '@workai/ui/types';
import { storeToRefs } from 'pinia';
// #endregion
// #region internal
import defaultTokens from '@config/default.json';
// #endregion

const authStore = useAuthStore();
const route = useRoute();
const appStore = useAppStore();
const { theme, contrastMode } = storeToRefs(appStore);

const isPublicPage = computed(() => {
  const pathWithTenantName = authStore.tenantName
    ? route.path.replace(`/${authStore.tenantName}`, '')
    : route.path;
  const shouldBeAvailable =
    route.path.includes('/auth') || route.path.includes('/error');

  if (shouldBeAvailable) {
    return shouldBeAvailable;
  }

  const isPublic =
    publicAvailablePages.includes(pathWithTenantName) ||
    route.path.startsWith('/error');

  return isPublic;
});

const tokens = computed(() => {
  return defaultTokens;
});

onMounted(() => {
  const cachedTheme = localStorage.getItem('theme') as ETheme;
  const cachedContrastMode = localStorage.getItem(
    'contrastMode'
  ) as EContrastMode;

  if (cachedTheme) {
    appStore.setTheme(cachedTheme);
  }

  if (cachedContrastMode) {
    appStore.setContrastMode(cachedContrastMode);
  }
});
</script>

<template>
  <ConfigProvider
    :tokens="tokens as any"
    v-model:theme="theme"
    v-model:contrast-mode="contrastMode"
  >
    <ContextModal>
      <NuxtLayout>
        <NuxtPage v-if="authStore.isLoggedIn || isPublicPage" />
        <Spin v-else spinning is-full />
      </NuxtLayout>
    </ContextModal>
  </ConfigProvider>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
