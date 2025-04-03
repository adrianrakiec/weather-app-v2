// #region vendor
// #endregion
// #region internal
import { EFileSizeValidator } from './types';
// #endregion

export const DEFAULT_VALIDATION = {
  maxFileSize: EFileSizeValidator.genericMaxSizeInMB,
  maxImageWidth: EFileSizeValidator.imageMaxPixelsWidth,
  maxImageHeight: EFileSizeValidator.imageMaxPixelsHeight,
  acceptedExtensions: ['*/*'],
};
