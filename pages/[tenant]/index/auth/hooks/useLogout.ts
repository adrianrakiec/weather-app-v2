// #region vendor
import { notification } from '@workai/ui/utils';
// #endregion
// #region internal
// #endregion

export const useLogout = () => {
  const { authHandler } = useAuth();
  const { $authStore } = useNuxtApp();
  const { t } = useI18n();

  const handleOnMounted = async () => {
    try {
      await authHandler.clearStaleState();
      $authStore.clearUserSession();
      await authHandler.signoutRedirect();

      localStorage.removeItem('oidc_requested_url');
    } catch (error) {
      console.error(error);

      notification.danger({
        title: t('shared.error.general.title'),
        description: t('shared.error.general.description'),
        noExtra: true,
      });
    }
  };

  return { handleOnMounted };
};
