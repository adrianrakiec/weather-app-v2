// #region vendor
import { ETheme, EContrastMode } from '@workai/ui/types';
import { acceptHMRUpdate, defineStore } from 'pinia';
// #endregion
// #region internal
import type { TTenantSettings } from '@types';
// #endregion

export const useAppStore = defineStore('AppStore', () => {
  const tenantSettings = ref<TTenantSettings>();
  const theme = ref(ETheme.Light);
  const contrastMode = ref(EContrastMode.AA);

  const setTenantSettings = (settings: TTenantSettings) => {
    tenantSettings.value = settings;
  };

  const setTheme = (newTheme: ETheme) => {
    localStorage.setItem('theme', newTheme);

    theme.value = newTheme;
  };

  const setContrastMode = (newContrastMode: EContrastMode) => {
    localStorage.setItem('contrastMode', newContrastMode);

    contrastMode.value = newContrastMode;
  };

  return {
    tenantSettings,
    theme,
    contrastMode,
    setTenantSettings,
    setTheme,
    setContrastMode,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
}
