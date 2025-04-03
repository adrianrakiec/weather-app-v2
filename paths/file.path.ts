// #region vendor
// #endregion
// #region internal
// #endregion

export const getFilePath = () => {
  const { public: publicConfig } = useRuntimeConfig();

  return {
    filesBase: (organizationId: number) =>
      `${publicConfig.API_FILES}/${organizationId}/Files`,
    generateDownloadURLById: (fileId: string, organizationId: number) =>
      `${publicConfig.API_FILES}/${organizationId}/Files/URL/${fileId}`,
    fileById: (fileId: string, organizationId: number) =>
      `${publicConfig.API_FILES}/${organizationId}/Files/${fileId}`,
    files: (organizationId: number) =>
      `${publicConfig.API_FILES}/${organizationId}/Files`,
    filesMetadata: (organizationId: number) =>
      `${publicConfig.API_FILES}/${organizationId}/FileMetadata`,
    fileMetadataById: (fileId: string, organizationId: number) =>
      `${publicConfig.API_FILES}/${organizationId}/FileMetadata/${fileId}`,
  };
};
