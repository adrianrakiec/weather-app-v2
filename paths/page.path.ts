// #region vendor
// #endregion
// #region internal
// #endregion

export const getPagePath = () => {
  const authStore = useAuthStore();

  return {
    index: '/',
    tenant: {
      index: `/${authStore.tenantName}`,
      administration: {
        index: `/${authStore.tenantName}/administration`,
      },
      components: {
        index: `/${authStore.tenantName}/components`,
      },
      // General
      auth: `/${authStore.tenantName}/auth`,
      authLogin: `/${authStore.tenantName}/auth/login`,
      authSilentRenew: `/${authStore.tenantName}/auth/silent-renew`,
      authLogout: `/${authStore.tenantName}/auth/logout`,
      authForceLogout: `/${authStore.tenantName}/auth/force-logout`,
    },
    error: {
      code: (code: string | number) => `/error/${code}`,
    },
  };
};
