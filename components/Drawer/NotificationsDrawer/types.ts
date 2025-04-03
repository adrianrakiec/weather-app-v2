// #region vendor
// #endregion
// #region internal
import type { TNotification } from '@components/Notifications/types';
// #endregion

export type TNotificationsDrawerProps = {
  open: boolean;
  data: Array<TNotification>;
};

export type TNotificationsDrawerEmits = {
  (e: 'update:open', value: boolean): void;
};
