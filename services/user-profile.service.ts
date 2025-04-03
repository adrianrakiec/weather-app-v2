// #region vendor
// #endregion
// #region internal
import type { TDirectoryObject, TApiSingleResponse } from '@types';
// #endregion

export const userProfileService = {
  async getDirectoryObject<T = TDirectoryObject>(id: string) {
    return await $http<TApiSingleResponse<{ directoryObject: T }>>(
      getUserProfilePath().directoryObjectById(id)
    );
  },
  async getDirectoryObjectImage(id: string) {
    return await $http<File>(getUserProfilePath().directoryObjectImage(id));
  },
};
