// #region vendor
import { ETheme, EContrastMode } from '@workai/ui/types';
// #endregion
// #region internal
// #endregion

export const useAvatarDropdown = () => {
  const authStore = useAuthStore();
  const appStore = useAppStore();
  const { theme, contrastMode } = storeToRefs(appStore);

  const open = ref(false);

  const isDarkTheme = computed({
    get: () => theme.value === ETheme.Dark,
    set: (value) => appStore.setTheme(value ? ETheme.Dark : ETheme.Light),
  });

  const isAAAContrastMode = computed({
    get: () => contrastMode.value === EContrastMode.AAA,
    set: (value) =>
      appStore.setContrastMode(value ? EContrastMode.AAA : EContrastMode.AA),
  });

  const { data: userData } = useAsyncData(
    `userProfileService.getDirectoryObject, ${authStore.userId}`,
    async () => {
      const result = await userProfileService.getDirectoryObject(
        authStore.userId
      );

      const userData = result.Value.directoryObject;

      return userData;
    },
    { immediate: true, lazy: true }
  );

  const handleToggleMenu = () => {
    open.value = !open.value;
  };

  const handleOpenChange = (isOpen: boolean) => {
    open.value = isOpen;
  };

  return {
    isDarkTheme,
    isAAAContrastMode,
    open,
    userData,
    handleToggleMenu,
    handleOpenChange,
  };
};
