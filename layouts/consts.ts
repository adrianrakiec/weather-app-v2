export enum ELayoutMode {
  LayoutQuickLaunch = 'layout-quick-launch',
  LayoutApplicationDrawer = 'layout-applications',
  LayoutManuInline = 'layout-menu-inline',
  LayoutSecondLevel = 'layout-second-level',
}

export const LayoutModeData = [
  {
    name: 'Quick Launch',
    value: ELayoutMode.LayoutQuickLaunch,
  },
  {
    name: 'Applications Drawer',
    value: ELayoutMode.LayoutApplicationDrawer,
  },
  {
    name: 'Second Level Menu',
    value: ELayoutMode.LayoutSecondLevel,
  },
] as const;

export const quickLaunchData = [
  {
    name: 'App',
    icon: 'alert',
    url: '#',
  },
  {
    name: 'Chat',
    icon: 'chat',
    url: '#',
  },
  {
    name: 'CalendarLongName',
    icon: 'calendar',
    url: '#',
  },
  {
    name: 'Calls',
    icon: 'phone',
    url: '#',
  },
  {
    name: 'OneDrive',
    icon: 'cloud',
    url: '#',
  },
  {
    name: 'Group',
    icon: 'group',
    url: '#',
  },
  {
    name: 'App',
    icon: 'alert',
    url: '#',
  },
  {
    name: 'Chat',
    icon: 'chat',
    url: '#',
  },
  {
    name: 'Calls',
    icon: 'phone',
    url: '#',
  },
  {
    name: 'OneDrive',
    icon: 'cloud',
    url: '#',
  },
] as const;

export const SIDER_WIDTH = 320;

export const DRAWER_OFFSET_LEFT = 54;

export const DRAWER_APP_LIMIT = 4;

export interface TMenuItem {
  key: string;
  icon?: string;
  title?: string;
  path?: string;
  children?: TMenuItem[];
}

interface MenuItems extends TMenuItem {
  children?: TMenuItem[];
}

interface MenuItemsProps {
  title?: string;
  items?: MenuItems[];
}

export const menuItems: MenuItemsProps[] = [
  {
    title: 'Administracja',
    items: [
      {
        key: '1',
        icon: 'location',
        title: 'Struktura lokalizacji',
        children: [
          { key: '2', title: 'Budynki', path: '/spaces/locations/buildings' },
          { key: '3', title: 'Poziomy', path: '/spaces/locations/levels' },
          { key: '4', title: 'Strefy', path: '/spaces/locations/zones' },
        ],
      },

      {
        key: '5',
        title: 'Zasoby',
        icon: 'device-meeting-room-remote',

        children: [
          {
            key: '6',
            title: 'Typy zasobów',
            path: '/spaces/teams/asset-types',
          },
          {
            key: '7',
            title: 'Zasoby',
            children: [
              { key: '8', title: 'Zespół III', path: '/spaces/teams/team3' },
              { key: '9', title: 'Zespół IV', path: '/spaces/teams/team4' },
            ],
          },
        ],
      },
      {
        key: '10',
        title: 'Użytkownicy',
        icon: 'people-community',
        path: '/spaces/teams/team446',
      },
    ],
  },
];
