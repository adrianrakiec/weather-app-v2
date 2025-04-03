// #region vendor
import { notification } from '@workai/ui/utils';
// #endregion
// #region internal
// #endregion

export const useLogin = () => {
  const { authHandler } = useAuth();
  const { t } = useI18n();

  const authenticateOidc = async () => {
    try {
      await authHandler.signInRedirect();
    } catch (error) {
      console.error(error);

      notification.danger({
        title: t('shared.error.general.title'),
        description: t('shared.error.general.description'),
        noExtra: true,
      });
    }
  };

  return { authenticateOidc };
};
