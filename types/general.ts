// #region vendor
import { type JwtPayload } from 'jwt-decode';
// #endregion
// #region internal
// #endregion

// #region Enums
export enum ESortOrder {
  Ascend = 'asc',
  Descend = 'desc',
}

export enum EFileType {
  Image = 1,
  Video = 2,
  Generic = 3,
  Pdf = 4,
}

export enum EFormStatus {
  Done = 'done',
  Error = 'error',
  Uploading = 'uploading',
}

export enum EFileStatus {
  Done = 'done',
  Error = 'error',
  Uploading = 'uploading',
}

export enum EContentType {
  Url = 'URL',
  Audio = 'FILE_AUDIO',
  Image = 'FILE_IMAGE',
  Video = 'FILE_VIDEO',
  PDF = 'FILE_PDF',
}

export enum EFileExtension {
  Png = 'image/png',
  Jpeg = 'image/jpeg',
  Svg = 'image/svg+xml',
  Pdf = 'application/pdf',
}
// #endregion
// #region Types
export type TNullable<T = string> = T | null;

export type TTenantSettings = {
  organizationId: number;
};

export type TDirectoryObject = {
  id: number;
  externalId: string;
  name: string;
  userName: string;
  email: string;
  type: string;
  image: TNullable<Uint8Array>;
  lastModified: string;
  lastSeen: string;
  isActive: boolean;
  domainId: TNullable;
  data: TNullable<Record<string, any>>;
  definitionJson: TNullable;
  isSynchronizable: boolean;
};

export type TChangeEvent = Event & {
  target: {
    value?: string | undefined;
  };
};

export type TFileMetadata = {
  fileId: string;
  organizationId: number;
  path: string;
  name: string;
  isCurrentVersion: boolean;
  mime: string;
  extension: string;
  type: string;
  version: number;
  created: string;
  authorId: string;
};

export type TEnumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? Acc[number]
  : TEnumerate<N, [...Acc, Acc['length']]>;

export type TRange<F extends number, T extends number> =
  | Exclude<TEnumerate<T>, TEnumerate<F>>
  | T;
// #endregion
// #region Interfaces
export interface IElasticJwtPayload extends JwtPayload {
  elastic_organizationurlname?: string;
  elastic_intranetorganizationid: string;
}
// #endregion
