import type { ITableColumnItem, ITableInnerColumnItem } from '@workai/ui/types';

export const handleRowSelection = {
  onChange: () => {},
};

export const handleSortColumns = (a: ITableColumnItem, b: ITableColumnItem) =>
  a.name.length - b.name.length;

export const handleFilterColumns = (value: string, record: ITableColumnItem) =>
  record.name.indexOf(value) === 0;

export enum ActionName {
  Action = 'action',
  Trash = 'trash',
  Edit = 'edit',
}

export const exampleColumns: any = [
  {
    title: 'Pracownik',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    filters: [
      {
        text: 'Filter1',
        value: 'Filter1',
      },
      {
        text: 'Filter2',
        value: 'Filter2',
      },
    ],
    onFilter: handleFilterColumns,
    sorter: handleSortColumns,
    sortDirections: ['descend'],
    width: 140,
  },
  {
    title: 'Utworzono',
    dataIndex: 'created',
    key: 'created',
    sorter: handleSortColumns,
    sortDirections: ['descend'],
    width: 140,
  },
  { key: 'action', dataIndex: 'action', width: 90 },
];

export const exampleDataSource: ITableColumnItem[] = [
  {
    key: '1',
    name: 'Tomek',
    email: 'name@zabka.pl',
    status: 32,
    created: '2024-10-02',
    action: 'trash',
  },
  {
    key: '2',
    name: 'Karolina',
    email: 'name@zabka.pl',
    status: 42,
    created: '2024-10-20',
    action: 'edit',
  },
  {
    key: '3',
    name: 'Żaneta',
    email: 'name@zabka.pl',
    status: 32,
    created: '2024-10-15',
    action: 'trash',
  },
  {
    key: '4',
    name: 'Adam',
    email: 'name@zabka.pl',
    status: 99,
    created: '2024-10-24',
    action: 'trash',
  },
];

export const exampleInnerColumns = [
  {
    key: 'name',
    dataIndex: 'name',
  },
  { key: 'action', dataIndex: 'action', width: 90 },
];

export const exampleInnerDataSource: ITableInnerColumnItem[] = [
  {
    key: '1',
    name: 'Grupa Żabkiści',
    action: 'manage',
  },
  {
    key: '2',
    name: 'Grupa Żabkoludy',
    action: 'manage',
  },
  {
    key: '3',
    name: 'Grupa Żabkoludy',
    action: 'manage',
  },
  {
    key: '4',
    name: 'Grupa Żabkoludy',
    action: 'manage',
  },
];

export const monthNames = [
  'Styczeń',
  'Luty',
  'Marzec',
  'Kwiecień',
  'Maj',
  'Czerwiec',
  'Lipiec',
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień',
];

export const TABS_MOCK = [
  {
    id: 1,
    name: 'Tab 1',
    icon: 'home',
    content: [
      {
        img: 'https://picsum.photos/200',
        name: 'Arkadiusz Kowalski',
        descriptiom:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      },
      {
        img: 'https://picsum.photos/201',
        name: 'Mateusz Nowak',
        descriptiom:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      },
      {
        img: 'https://picsum.photos/203',
        name: 'Anna Kowalska',
        descriptiom:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      },
    ],
  },
  {
    id: 2,
    name: 'Tab 2',
    icon: 'airplane',
    content: [
      {
        img: 'https://picsum.photos/204',
        name: 'Tomasz Nowak',
        descriptiom:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      },
      {
        img: 'https://picsum.photos/205',
        name: 'Dariusz Kowalski ',
        descriptiom:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      },
      {
        img: 'https://picsum.photos/206',
        name: 'Maria Kowalska',
        descriptiom:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      },
    ],
  },
  {
    id: 3,
    name: 'Tab 3',
    icon: 'star',
    content: [
      {
        img: 'https://picsum.photos/207',
        name: 'Tomasz Nowak',
        descriptiom:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      },
      {
        img: 'https://picsum.photos/208',
        name: 'Dariusz Kowalski ',
        descriptiom:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      },
      {
        img: 'https://picsum.photos/209',
        name: 'Maria Kowalska',
        descriptiom:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      },
    ],
  },
] as const;
