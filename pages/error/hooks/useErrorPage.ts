// #region vendor
// #endregion
// #region internal
import error403 from '@public/images/error-403.svg';
import error404 from '@public/images/error-404.svg';
import error500 from '@public/images/error-500.svg';
// #endregion

export const useErrorPage = () => {
  const { t } = useI18n();
  const { authHandler } = useAuth();
  const { $authStore } = useNuxtApp();

  const {
    params: { code: routeCode },
  } = useRoute();

  const imgAdapter = computed(() => {
    switch (routeCode as string) {
      case '403':
        return error403;
      case '404':
        return error404;
      default:
        return error500;
    }
  });

  const titleAdapter = computed(() => {
    switch (routeCode as string) {
      case '401':
        return t('page.error.401.title');
      case '403':
        return t('page.error.403.title');
      case '404':
        return t('page.error.404.title');
      case '500':
        return t('page.error.500.title');
      default:
        return t('page.error.defaultErrorTitle');
    }
  });

  const descriptionAdapter = computed(() => {
    switch (routeCode as string) {
      case '401':
        return t('page.error.401.description');
      case '403':
        return t('page.error.403.description');
      case '404':
        return t('page.error.404.description');
      default:
        return t('page.error.500.description');
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('oidc_requested_url');

    $authStore.clearUserSession();

    authHandler.logout();
  };

  return {
    t,
    routeCode,
    imgAdapter,
    titleAdapter,
    descriptionAdapter,
    handleLogout,
  };
};
