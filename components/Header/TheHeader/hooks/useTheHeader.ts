// #region vendor
// #endregion
// #region internal
import type { TTheHeaderEmits } from '../types';
// #endregion

export const useTheHeader = (emits: TTheHeaderEmits) => {
  const router = useRouter();
  const authStore = useAuthStore();
  const { tenantSettings } = useAppStore();
  const { public: publicConfig } = useRuntimeConfig();

  const openNotificationDrawer = ref(false);

  const homepageHref = computed(() => getPagePath().tenant.index);

  provide('openNotificationDrawer', openNotificationDrawer);

  const handleHomepageLinkClick = () => {
    router.push(getPagePath().tenant.index);
  };

  const handleToggleSider = () => {
    emits('toggle-sider');
  };

  return {
    authStore,
    tenantSettings,
    publicConfig,
    homepageHref,
    handleHomepageLinkClick,
    handleToggleSider,
  };
};
