// #region vendor
import { acceptHMRUpdate, defineStore } from 'pinia';
// #endregion
// #region internal
import NotificationsController from '@components/Notifications/notifications.controller';
// #endregion

export type TNotificationsStore = {
  notificationService: NotificationsController | null;
  notificationServiceError: boolean;
};

export const useNotificationServiceStore = defineStore('NotificationsStore', {
  state: () =>
    ({
      notificationService: null,
      notificationServiceError: false,
    }) as TNotificationsStore,
  getters: {
    serviceProxyUrl: (state) =>
      state.notificationService?.urlTypes.proxyUrl || '',
    organizationId: (state) => state.notificationService?.organizationId || '',
  },
  actions: {
    setNotificationStore(notificationServiceObject: NotificationsController) {
      this.notificationService = notificationServiceObject;
    },
    initializeNotifications() {
      this.notificationService?.getUnreadNotifications();
      this.notificationService?.getNotifications();
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useNotificationServiceStore, import.meta.hot)
  );
}
