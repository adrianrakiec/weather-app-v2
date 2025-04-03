// #region vendor
// #endregion
// #region internal
import { DEFAULT_PLACEHOLDER_PATH } from '@components/Image/ProtectedImage/consts';
// #endregion

export const convertFileServiceURL = async (url: string): Promise<string> => {
  try {
    if (!url.toLowerCase().includes('files')) {
      return url;
    }

    const blobImage = await $http<Blob>(url);
    const objectUrl = URL.createObjectURL(blobImage);

    return objectUrl;
  } catch (error) {
    console.error(error);

    return DEFAULT_PLACEHOLDER_PATH;
  }
};
