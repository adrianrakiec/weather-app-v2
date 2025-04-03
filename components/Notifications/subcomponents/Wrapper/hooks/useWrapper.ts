export const useWrapper = () => {
  const { notificationService } = useNotificationServiceStore();

  const notificationsData = ref(notificationService?.context.data);
  const currentUpdate = ref(new Date().getTime());

  const open = inject<Ref<boolean> | false>('openNotificationDrawer', false);

  notificationService?.connection.on('receiveNotification', () => {
    nextTick(() => {
      currentUpdate.value = new Date().getTime();
    });
  });

  const handleOpenNotifications = () => {
    notificationService?.markAllAsRead();

    if (!open) {
      return;
    }

    open.value = true;
  };

  return {
    open,
    notificationsData,
    handleOpenNotifications,
  };
};
