import { FaPlus } from 'react-icons/fa';
export interface ClubItem {
  name: string | React.ReactNode;
  id: string;
}

export const CLUB_LIST: ClubItem[] = [
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
  {
    name: <FaPlus size=".9rem" />,
    id: '/club/add',
  },
];
