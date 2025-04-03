// #region vendor
import { jwtDecode } from 'jwt-decode';
// #endregion
// #region internal
import { type IElasticJwtPayload } from '@types';
// #endregion

export const getDecodedToken = (token: string) => {
  return jwtDecode<IElasticJwtPayload>(token);
};
