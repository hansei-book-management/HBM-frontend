export interface RentClubItem {
  name: string | React.ReactNode;
  id: string;
}

export const RENT_CLUB_LIST: RentClubItem[] = [
  {
    name: '보안관제',
    id: 'hsoc',
  },
  {
    name: 'SSR',
    id: 'ssr',
  },
  {
    name: '포렌식',
    id: 'forensic',
  },
  {
    name: 'NSB',
    id: 'nsb',
  },
];
