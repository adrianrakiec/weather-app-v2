// #region vendor
import { User } from 'oidc-client-ts';
// #endregion
// #region internal
// #endregion

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { public: publicConfig } = useRuntimeConfig();
  const { $authStore, $appStore } = useNuxtApp();

  const isSingleTenant = publicConfig.IS_MULTITENANT_ENABLED === 'false';

  const isLoginPage = to.path === getPagePath().index;

  if (to.path.includes('error')) {
    return navigateTo(getPagePath().error.code('401'));
  }

  if (!$authStore.tenantName && isSingleTenant && isLoginPage) {
    $authStore.setTenantName(publicConfig.SINGLE_TENANT_SUFFIX as string);

    return navigateTo(getPagePath().tenant.index);
  }

  const { authHandler } = useAuth();
  const user = (await authHandler.getUser()) as User;

  if (from.path.includes('/auth') && from.query?.error) {
    return navigateTo(getPagePath().error.code('401'));
  }

  const token = user ? user?.access_token : localStorage.getItem('token');

  if (token) {
    const organization = isSingleTenant
      ? publicConfig.SINGLE_TENANT_SUFFIX
      : getDecodedToken(token)?.elastic_organizationurlname;

    if (!organization && organization !== getTenantNameFromPath(to.path)) {
      return navigateTo(getPagePath().error.code('401'));
    }
  }

  if (!$authStore.tenantName) {
    const organization = token
      ? getDecodedToken(token)?.elastic_organizationurlname
      : getTenantNameFromPath(to.path);

    if (isSingleTenant) {
      $authStore.setTenantName(publicConfig.SINGLE_TENANT_SUFFIX);
    } else if (organization) {
      $authStore.setTenantName(organization);
    }
  } else {
    if (
      getTenantNameFromPath(to.path) &&
      getTenantNameFromPath(to.path) !== $authStore.tenantName
    ) {
      return navigateTo(getPagePath().error.code('401'));
    } else if (to.path === getPagePath().index) {
      return navigateTo(getPagePath().tenant.index);
    }
  }

  if (getTenantNameFromPath(to.path) && !$authStore.tenantName) {
    return navigateTo(getPagePath().index);
  }

  if (user && getTenantNameFromPath(to.path) !== $authStore.tenantName) {
    return navigateTo(getPagePath().tenant.index);
  }

  const getPath = () => {
    if (
      $authStore.tenantName === '' ||
      to.path === `/${$authStore.tenantName}/`
    ) {
      return to.path;
    } else {
      return to.path.replace(`/${$authStore.tenantName}`, '');
    }
  };

  if (user?.expires_at && shouldRenewToken(user.expires_at)) {
    await authHandler.renewToken();
  }

  const isPublicPage = isPublicAvailablePage(getPath());

  if (!isPublicPage) {
    $authStore.setUpUserCredentials(user);

    if (!user) {
      await authHandler.signInRedirect(to.path);
      return abortNavigation(createError({ statusCode: 401, statusMessage: "Unauthorized" }));
    }

    await authHandler.renewToken();
  }

  if (user && !$appStore.tenantSettings) {
    const tenantSettings = await authHandler.getTenantSettings();

    if (tenantSettings) {
      $appStore.setTenantSettings(tenantSettings);
    }
  }
});
