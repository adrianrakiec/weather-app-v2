// #region vendor
// #endregion
// #region internal
import NotificationsController from '../notifications.controller';
import type { TNotificationCenterProps } from '../types';
// #endregion

export const useNotificationCenter = (props: TNotificationCenterProps) => {
  const notificationServiceStore = useNotificationServiceStore();

  notificationServiceStore.setNotificationStore(
    NotificationsController.getInstance(
      props.applications,
      props.organizationId,
      props.notificationsServiceApiUrl,
      props.serviceProxyUrlPrefix,
      props.showMoreUrl,
      props.currentUserId,
      props.productName
    )
  );

  notificationServiceStore.initializeNotifications();
};
