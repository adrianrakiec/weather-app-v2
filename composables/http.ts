// #region vendor
import { type NitroFetchRequest } from 'nitropack';
// #endregion
// #region internal
import { handleErrorResponse } from './handleErrorResponse';
// #endregion

export async function $http<
  T = unknown,
  R extends NitroFetchRequest = NitroFetchRequest,
>(
  request: Parameters<typeof $fetch<T, R>>[0],
  options?: Partial<Parameters<typeof $fetch<T, R>>[1]>
) {
  const { authHandler } = useAuth();
  const user = await authHandler.getUser();

  return $fetch<T, R>(request, {
    ...options,
    headers: {
      Accept: 'application/json',
      Authorization: user?.access_token ? `Bearer ${user.access_token}` : '',
      ...options?.headers,
    },
    async onResponseError({ response }) {
      handleErrorResponse(response);
    },
  });
}
