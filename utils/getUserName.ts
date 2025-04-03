// #region vendor
// #endregion
// #region internal
import type { TUserName } from './types';
// #endregion

export const getUserName = ({ name, firstName, surname }: TUserName) => {
  if (firstName && surname) {
    return `${firstName} ${surname}`;
  }

  return name;
};
