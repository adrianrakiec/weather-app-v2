// #region vendor
import type { Pinia } from 'pinia';
// #endregion
// #region internal
import { useAppStore } from '@stores/app.store';
import { useAuthStore } from '@stores/auth.store';
// #endregion

export default defineNuxtPlugin(({ $pinia }) => {
  const pinia = $pinia as Pinia;

  return {
    provide: {
      authStore: useAuthStore(pinia),
      appStore: useAppStore(pinia),
    },
  };
});
