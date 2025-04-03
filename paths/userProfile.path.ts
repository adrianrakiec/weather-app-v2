// #region vendor
// #endregion
// #region internal
// #endregion

export const getUserProfilePath = () => {
  const config = useRuntimeConfig();
  const apiUrl = `${config.public.API_USER_PROFILE}`;

  return {
    directoryObjectById: (id: string) => `${apiUrl}/api/DirectoryObject/${id}`,
    directoryObjectImage: (id: string) =>
      `${apiUrl}/api/DirectoryObject/${id}/image`,
  };
};
