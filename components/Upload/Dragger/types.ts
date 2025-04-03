// #region vendor
// #endregion
// #region internal
import { EFormStatus } from '@types';
// #endregion

export type inputTypesUnion =
  | 'FILE_IMAGE'
  | 'FILE_AUDIO'
  | 'FILE_PDF'
  | 'FILE_VIDEO'
  | 'FILE_ZIP';

export type TFieldValidator = {
  maxFileSize?: number;
  maxImageWidth?: number;
  maxImageHeight?: number;
  acceptedExtensions?: string[];
};

export enum EFileSizeValidator {
  imageMaxPixelsWidth = 1600,
  imageMaxPixelsHeight = 900,
  genericMaxSizeInMB = 1024,
}

export type TUploadDraggerProps = {
  value?: string;
  type?: inputTypesUnion;
  status?: EFormStatus;
  validation?: TFieldValidator;
};

export type TUploadDraggerEmits = {
  (e: 'update:value', value?: string): void;
  (e: 'update:status', status: EFormStatus): void;
};
