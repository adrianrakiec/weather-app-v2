// #region vendor
import type { FetchResponse } from 'ofetch';
// #endregion
// #region internal
// #endregion

export const handleErrorResponse = async (response: FetchResponse<any>) => {
  try {
    const authStore = useAuthStore();
    const { authHandler } = useAuth();
    const router = useRouter();
    const { public: publicConfig } = useRuntimeConfig();

    if (response.status === 401) {
      await authHandler.clearStaleState();
      authStore.clearUserSession();
      await authHandler.signoutRedirect();

      localStorage.removeItem('oidc_requested_url');
      localStorage.removeItem('token');
    } else if (response.status >= 403) {
      if (response.status >= 500) {
        const isFileService = response.url.startsWith(publicConfig.API_FILES);
        const isNotificationsService = response.url.startsWith(
          publicConfig.API_NOTIFICATIONS
        );

        if (isFileService || isNotificationsService) {
          return;
        }
      }

      router.push({
        path: getPagePath().error.code(response.status),
      });
    } else {
      const message = response?._data?.message.toString();

      useCustomErrorMessage(message);
    }
  } catch (error) {
    console.error(error);
  }
};
