export interface UserClubItem {
  name: string | React.ReactNode;
  id: string;
}

export const USER_CLUB_LIST: UserClubItem[] = [
  {
    name: '보안관제',
    id: 'hsoc',
  },
  {
    name: 'SSR',
    id: 'ssr',
  },
];
