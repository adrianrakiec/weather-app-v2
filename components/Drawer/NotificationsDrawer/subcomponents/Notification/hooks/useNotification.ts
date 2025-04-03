// #region vendor
// #endregion
// #region internal
import type { TNotificationProps } from '../types';
import { applicationMap } from '../consts';
// #endregion

export const useNotification = (props: TNotificationProps) => {
  const dayjs = useDayjs();
  const { notificationService, serviceProxyUrl } =
    useNotificationServiceStore();

  const imageUrl = ref<string>(props.notificationObject.imageUrl);
  const isFullDescriptionVisible = ref(false);

  const notificationDrawerOpen = inject<Ref<boolean> | false>(
    'openNotificationDrawer',
    false
  );

  const dateFormat = DateDictionary.notificationFormat;

  if (props.notificationObject.imageUrl) {
    const { pathname: imageUrlPathName } = new URL(
      props.notificationObject.imageUrl
    );

    if (imageUrlPathName.match(/users\/image/i)) {
      const [_, userId] = imageUrlPathName.toLowerCase().split('/users/image');
      const prefix = serviceProxyUrl.includes('v1') ? '/v1' : '';

      imageUrl.value = `/services/users${prefix}/users${userId}/Image`;
    } else if (imageUrlPathName.match(/users/i)) {
      const [_, userIdWithPath] = imageUrlPathName
        .toLowerCase()
        .split('/users');
      const prefix = serviceProxyUrl.includes('v1') ? '/v1' : '';

      imageUrl.value = `/services/users${prefix}/users${userIdWithPath}`;
    }
  }

  const hasUserProfileUrl = (url: string) => {
    return url.toLowerCase().includes('UsersProfile'.toLowerCase());
  };

  const handleNotificationClick = async () => {
    await notificationService?.markAsClicked(props.notificationObject);

    isFullDescriptionVisible.value = !isFullDescriptionVisible.value;
  };

  const getCreatedDateTime = (dateTime: string) => {
    return dayjs(dateTime).format(dateFormat);
  };

  const getNotificationSource = (application: string) => {
    return applicationMap[application] ?? 'App';
  };

  const handleGoToSource = (url: string) => {
    if (!notificationDrawerOpen) {
      return;
    }

    notificationDrawerOpen.value = false;

    window.location.href = url;
  };

  return {
    handleNotificationClick,
    getCreatedDateTime,
    getNotificationSource,
    isFullDescriptionVisible,
    hasUserProfileUrl,
    handleGoToSource,
  };
};
