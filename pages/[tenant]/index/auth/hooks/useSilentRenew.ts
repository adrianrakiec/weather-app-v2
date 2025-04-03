// #region vendor
import { notification } from '@workai/ui/utils';
// #endregion
// #region internal
// #endregion

export const useSilentRenew = () => {
  const { authHandler } = useAuth();
  const { t } = useI18n();

  const silentRefreshOidc = async () => {
    try {
      await authHandler.renewToken();
    } catch (error) {
      console.error(error);

      notification.danger({
        title: t('shared.error.general.title'),
        description: t('shared.error.general.description'),
        noExtra: true,
      });
    }
  };

  return { silentRefreshOidc };
};
