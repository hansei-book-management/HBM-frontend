import { FaPlus } from 'react-icons/fa';
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
  {
    name: <FaPlus size={'0.9rem'} />,
    id: 'forensic',
  },
];
