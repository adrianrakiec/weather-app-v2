// #region vendor
// #endregion
// #region internal
// #endregion

export const getApiPath = () => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  const apiUrlPrefix =
    config.public.IS_MULTITENANT_ENABLED === 'false'
      ? ''
      : `${authStore.tenantName}.`;
  const appApiUrl = config.public.API_APP.replace('https://', '');
  const apiUrl = `https://${apiUrlPrefix}${appApiUrl}`;

  return {
    example: `${apiUrl}/Example/Example2`,

    // TODO: remove when will be implemented in identity
    settings: `${apiUrl}/settings`,
  };
};
