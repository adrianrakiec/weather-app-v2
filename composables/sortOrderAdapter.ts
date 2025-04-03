// #region vendor
// #endregion
// #region internal
import { ESortOrder, type TNullable } from '@types';
// #endregion

export const sortOrderAdapter = (
  value: TNullable<string> | undefined
): ESortOrder | undefined => {
  if (value === 'descend') {
    return ESortOrder.Descend;
  }

  if (value === 'ascend') {
    return ESortOrder.Ascend;
  }
};
