// #region vendor
// #endregion
// #region internal
import type { TProtectedImageProps } from '../types';
import { DEFAULT_PLACEHOLDER_PATH } from '../consts';
// #endregion

export const useProtectedImage = (props: TProtectedImageProps) => {
  const loading = ref(true);
  const imageUrl = ref<string>();

  const fetchImage = async () => {
    loading.value = true;

    try {
      if (props.src) {
        imageUrl.value = await convertFileServiceURL(props.src);
      }
    } catch (error) {
      console.error(error);

      imageUrl.value = DEFAULT_PLACEHOLDER_PATH;
    } finally {
      loading.value = false;
    }
  };

  const handleError = () => {
    imageUrl.value = DEFAULT_PLACEHOLDER_PATH;
  };

  watch(
    () => props.src,
    async (next, prev) => {
      if (next && next !== prev) {
        await fetchImage();
      }
    },
    {
      immediate: true,
    }
  );

  return { loading, imageUrl, handleError };
};
