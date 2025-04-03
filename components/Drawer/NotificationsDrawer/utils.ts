// #region vendor
// #endregion
// #region internal
import type { TNotification } from '@components/Notifications/types';
// #endregion

export const uniqBy = (array: Array<TNotification>, key: string) => {
  return array.filter((item, index, self) => {
    return (
      index ===
      self.findIndex((t) => {
        // @ts-ignore
        return t[key] === item[key];
      })
    );
  });
};
