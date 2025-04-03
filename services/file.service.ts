// #region vendor
// #endregion
// #region internal
import { convertObjectIntoFormData } from '@utils';
import type { EFileType, TFileMetadata } from '@types';
// #endregion

export const fileService = {
  async postFile(
    file: File,
    params: { type?: EFileType; path?: string },
    onUploadProgress?: (progressEvent: ProgressEvent) => void
  ): Promise<{ filePath: string }> {
    const { tenantSettings } = useAppStore();

    if (!tenantSettings || !tenantSettings.organizationId) {
      return Promise.reject('Error during evaluation of organizationId');
    }

    const type: EFileType = params?.type || 3;

    return await $http(getFilePath().files(tenantSettings.organizationId), {
      method: 'POST',
      headers: {
        Path: `/${tenantSettings.organizationId}/Files`,
        Type: type,
      } as RequestInit['headers'] & { Type: EFileType; Path: string },
      body: convertObjectIntoFormData({ file }),
    });
  },
  async getFileById(fileId: string): Promise<ArrayBuffer> {
    const { tenantSettings } = useAppStore();

    if (!tenantSettings || !tenantSettings.organizationId) {
      return Promise.reject('Error during evaluation of organizationId');
    }

    return await $http(
      getFilePath().fileById(fileId, tenantSettings.organizationId),
      {
        method: 'GET',
      }
    );
  },
  async deleteFileById(fileId: string): Promise<void> {
    const { tenantSettings } = useAppStore();

    if (!tenantSettings || !tenantSettings.organizationId) {
      return Promise.reject('Error during evaluation of organizationId');
    }

    return await $http(
      getFilePath().fileById(fileId, tenantSettings.organizationId),
      {
        method: 'DELETE',
      }
    );
  },
  async getFilesMetadata(fileId: string): Promise<Array<TFileMetadata>> {
    const { tenantSettings } = useAppStore();

    if (!tenantSettings || !tenantSettings.organizationId) {
      return Promise.reject('Error during evaluation of organizationId');
    }

    return await $http(
      getFilePath().fileMetadataById(fileId, tenantSettings.organizationId),
      {
        method: 'GET',
      }
    );
  },
  async getFileMetadataById(fileId: string): Promise<TFileMetadata> {
    const { tenantSettings } = useAppStore();

    if (!tenantSettings || !tenantSettings.organizationId) {
      return Promise.reject('Error during evaluation of organizationId');
    }

    return await $http<TFileMetadata>(
      getFilePath().fileMetadataById(fileId, tenantSettings.organizationId),
      {
        method: 'GET',
      }
    );
  },
};
