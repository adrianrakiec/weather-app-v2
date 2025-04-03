// #region vendor
import { notification } from '@workai/ui/utils';
// #endregion
// #region internal
// #endregion

export const useAuthorization = () => {
  const config = useRuntimeConfig();
  const { CONFIG_APP_REDIRECT_DELAY_MS } = config.public;
  /** Fallback 0ms only if something will wrong in nuxt.config.ts */
  const redirectDelay = Number(CONFIG_APP_REDIRECT_DELAY_MS) || 0;

  const { authHandler } = useAuth();
  const { t } = useI18n();
  const router = useRouter();
  const isMounted = ref(true);

  onUnmounted(() => {
    isMounted.value = false;
  });

  const authenticateOidc = async () => {
    try {
      const redirectUrl = localStorage.getItem('oidc_requested_url');

      await authHandler.signInCallback(redirectUrl || undefined);

      router.push(redirectUrl || getPagePath().index);

      localStorage.removeItem('oidc_requested_url');
    } catch (error) {
      console.error(error);

      notification.danger({
        title: t('shared.error.general.title'),
        description: t('shared.error.general.description'),
        noExtra: true,
      });

      // Time after which the redirection will take place
      // Timeout needed for time for read of notification error
      await new Promise(resolve => setTimeout(resolve, redirectDelay));

      if (isMounted.value) {
        router.push(getPagePath().tenant.authForceLogout);
      }
    }
  };

  return { authenticateOidc };
};
