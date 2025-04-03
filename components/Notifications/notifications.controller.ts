// #region vendor
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
// #endregion
// #region internal
import { removeEmptyODataParamOptions } from './utils';
import type {
  TNotification,
  TNotificationCenterServiceContext,
  TOdataParams,
  TNotificationCenterServiceUrls,
} from './types';
import type { TNullable } from '@types';
// #endregion

export default class NotificationsController {
  organizationId: number;
  showMoreUrl: string;
  currentUserId: string;
  notificationApiUrl: string;
  productName: string;
  requestConfig: {
    params: TOdataParams;
  };

  private filters: {
    unRead: string;
    unClicked: string;
    withConfiguredApplications: () => TNullable<string>;
  };

  urlTypes: TNotificationCenterServiceUrls;
  context: TNotificationCenterServiceContext;
  connection: HubConnection;
  applications: string[];
  private static notificationsController: NotificationsController;
  static getInstance(
    applications?: string[],
    organizationId?: number,
    notificationApiUrl?: string,
    serviceProxyUrlPrefix?: string,
    showMoreUrl?: string,
    currentUserId?: string,
    productName?: string
  ) {
    if (!NotificationsController.notificationsController) {
      if (!organizationId || !notificationApiUrl || !currentUserId) {
        throw new Error(
          'Invalid NotificationCenter configuration! Notifications will not be initialized.'
        );
      }
      NotificationsController.notificationsController =
        new NotificationsController(
          applications || ['elastic.intranet'],
          organizationId,
          notificationApiUrl,
          serviceProxyUrlPrefix || '/services/notifications',
          showMoreUrl || '',
          currentUserId,
          productName || 'elastic.intranet'
        );
    }
    return NotificationsController.notificationsController;
  }

  constructor(
    applications: string[],
    organizationId: number,
    notificationApiUrl: string,
    serviceProxyUrlPrefix: string,
    showMoreUrl: string,
    currentUserId: string,
    productName: string
  ) {
    this.applications = applications;
    this.organizationId = organizationId;
    this.showMoreUrl = showMoreUrl;
    this.currentUserId = currentUserId;
    this.notificationApiUrl = notificationApiUrl;
    this.productName = productName;
    this.requestConfig = {
      params: {
        $count: 'true',
        $filter: null,
        $skip: null,
        $top: '15',
        $orderby: 'created desc',
      },
    };
    this.filters = {
      unRead: 'read eq false',
      unClicked: 'clicked eq false',
      withConfiguredApplications: () => {
        if (!this.applications.length || this.applications.length === 0) {
          return null;
        }
        return this.applications
          .map((application) => {
            return `application eq '${application}'`;
          })
          .join(' or ');
      },
    };
    this.urlTypes = {
      baseUrl: notificationApiUrl,
      proxyUrl: serviceProxyUrlPrefix,
      hub: '/notificationsHub',
      getNotfication: `/${this.organizationId}/Notifications/ByChannel(channelName='inapp')`,
      markAllAsRead: `/${this.organizationId}/Notifications/MarkAllAsRead`,
      markAllAsClicked: `/${this.organizationId}/Notifications/MarkAllAsClicked`,
      markAsClicked: `/${this.organizationId}/Notifications/{key}/MarkAsClicked`,
    };
    this.context = {
      status: {
        error: false,
        loading: true,
        connected: false,
        reconnect: false,
      },
      data: {
        unReadCount: 0,
        pureNotificationsList: [],
      },
    };
    this.connection = new HubConnectionBuilder()
      .withUrl(
        `${this.urlTypes.baseUrl.replace('/v1', '')}${this.urlTypes.hub}`
      )
      .withAutomaticReconnect()
      .build();
    this.initConnection();
  }

  private initConnection() {
    this.connection.on('receiveNotification', (notification) => {
      setTimeout(() => {
        this.context.data.pureNotificationsList.unshift(notification);
        this.context.data.unReadCount++;
      });
    });
    this.connection
      .start()
      .then(() => {
        this.connection
          .invoke('JoinGroup', `${this.currentUserId}-${this.organizationId}`)
          .then(() => {
            this.context.status.connected = true;
            this.context.status.reconnect = false;
          })
          .catch(() => (this.context.status.error = true));
      })
      .catch(() => (this.context.status.error = true));
  }

  private resetRequest() {
    this.requestConfig = {
      params: {
        $count: 'true',
        $filter: null,
        $skip: null,
        $top: '15',
        $orderby: 'created desc',
      },
    };
  }

  async getNotifications() {
    this.resetRequest();
    this.context.status.loading = true;
    this.requestConfig.params.$filter =
      this.filters.withConfiguredApplications();
    this.readNotificationsFromLocalStorage();

    const queryParams = new URLSearchParams({
      ...(removeEmptyODataParamOptions(this.requestConfig.params) as Record<
        string,
        string
      >),
    });
    $http(
      `${this.notificationApiUrl}${this.urlTypes.getNotfication}?${queryParams}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    )
      .then((result) => {
        return result;
      })
      .then((data) => {
        // @ts-ignore
        if (!data.value) {
          throw new Error('Error with response data');
        }

        if (localStorage) {
          localStorage.setItem(
            'InAppNotifications',
            // @ts-ignore
            JSON.stringify(data.value)
          );
        }
        // @ts-ignore
        this.context.data.pureNotificationsList = data.value;
        this.context.status.loading = false;
      })
      .catch((e) => {
        console.error(e);
        this.context.status.error = true;
        this.readNotificationsFromLocalStorage();
      });
  }

  async getUnreadNotifications() {
    const _requestConfig = Object.assign(this.requestConfig);
    _requestConfig.params.$filter = this.filters.unRead;
    const queryParams = new URLSearchParams({
      ...(removeEmptyODataParamOptions(_requestConfig.params) as Record<
        string,
        string
      >),
    });

    $http(
      `${this.notificationApiUrl}${this.urlTypes.getNotfication}?${queryParams}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    )
      .then((result) => {
        return result;
      })
      .then((data) => {
        // @ts-ignore
        return (this.context.data.unReadCount = data['@odata.count']);
      })
      .catch((e) => {
        console.error(e);
        this.context.status.error = true;
      });
  }

  async markAsClicked(notification: TNotification) {
    try {
      notification.clicked = true;

      await $http(
        `${this.urlTypes.proxyUrl}${this.urlTypes.markAsClicked.replace('{key}', notification.id.toString())}`,
        {
          method: 'POST',
        }
      );
    } catch (e) {
      console.error(e);
    }
  }

  goToNotification(notification: TNotification) {
    window.location.href = notification.url;
  }

  async markAllAsRead() {
    try {
      this.context.data.unReadCount = 0;

      await $http(`${this.urlTypes.proxyUrl}${this.urlTypes.markAllAsRead}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ applicationName: this.productName }),
      });
    } catch (e) {
      console.error(e);

      this.context.status.error = true;
    }
  }

  async markAllAsClicked() {
    try {
      this.context.data.unReadCount = 0;

      await $http(
        `${this.urlTypes.proxyUrl}${this.urlTypes.markAllAsClicked}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ applicationName: this.productName }),
        }
      );
    } catch (e) {
      console.error(e);

      this.context.status.error = true;
    }
  }

  readNotificationsFromLocalStorage() {
    if (this.areNotificationsInLocalStorage()) {
      const localStorageNotifications = JSON.parse(
        localStorage.InAppNotifications
      );

      this.context.data.pureNotificationsList = localStorageNotifications;
    }
  }

  areNotificationsInLocalStorage(): boolean {
    return localStorage && localStorage.getItem('InAppNotifications') != null;
  }
}
