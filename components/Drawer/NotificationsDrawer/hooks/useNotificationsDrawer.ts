// #region vendor
// #endregion
// #region internal
import { uniqBy } from '../utils';
import type { TNotification } from '@components/Notifications/types';
import type {
  TNotificationsDrawerProps,
  TNotificationsDrawerEmits,
} from '../types';
// #endregion

export const useNotificationsDrawer = (
  props: TNotificationsDrawerProps,
  emits: TNotificationsDrawerEmits
) => {
  const { notificationService, notificationServiceError } =
    useNotificationServiceStore();

  const openModel = useVModel(props, 'open', emits);

  const filteredNotifications = computed(
    () => uniqBy(props.data?.slice(0, 30), 'id') as TNotification[]
  );

  const newNotificationsCount = computed(
    () => filteredNotifications.value?.filter((item) => !item.read).length
  );

  const handleClose = () => {
    openModel.value = false;
  };

  const handleMarkAllAsClicked = () => {
    notificationService?.markAllAsClicked();
  };

  return {
    openModel,
    handleClose,
    newNotificationsCount,
    handleMarkAllAsClicked,
    notificationService,
    notificationServiceError,
    filteredNotifications,
  };
};
