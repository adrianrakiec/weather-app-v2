// #region vendor
// #endregion
// #region internal
// #endregion

export const getTenantNameFromPath = (path?: string) => {
  const targetPath = path || window.location.pathname;
  const pathSegments = targetPath.split('/');

  return pathSegments[1] || '';
};
