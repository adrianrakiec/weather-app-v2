// #region vendor
import { notification } from '@workai/ui/utils';
// #endregion
// #region internal
// #endregion

export const useCustomErrorMessage = (_message: string) => {
  const { $i18n } = useNuxtApp();
  const t = $i18n.t;

  notification.danger({
    title: t('shared.error.general.title'),
    description: t('shared.error.general.description'),
    noExtra: true,
  });
};
