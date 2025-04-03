// #region vendor
// #endregion
// #region internal
import type { TNullable } from '@types';
// #endregion

export type TNotification = {
  application: string;
  clicked: boolean;
  created: string;
  eventData: any;
  id: number;
  imageUrl: string;
  itemId: number;
  labels: { tags: any[]; user: any };
  message: string;
  name: string;
  notificationType: string;
  organizationId: number;
  read: boolean;
  url: string;
};

export type TNotificationCenterServiceContext = {
  status: {
    error: boolean;
    loading: boolean;
    connected: boolean;
    reconnect: boolean;
  };
  data: {
    unReadCount: number;
    pureNotificationsList: TNotification[];
  };
};

export type TOdataParams = {
  $count: 'true' | 'false';
  $filter: TNullable<string>;
  $skip: TNullable<string>;
  $top: string;
  $orderby: string;
};

export type TNotificationCenterServiceUrls = {
  baseUrl: string;
  proxyUrl: string;
  hub: string;
  getNotfication: string;
  markAllAsRead: string;
  markAllAsClicked: string;
  markAsClicked: string;
};

export type TNotificationCenterProps = {
  applications: string[];
  showMoreUrl?: string;
  organizationId: number;
  notificationsServiceApiUrl: string;
  currentUserId: string;
  serviceProxyUrlPrefix?: string;
  productName: string;
};
