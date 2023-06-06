export interface ManageClubBookOptionItem {
  name: string;
  id: string;
  text: string;
}

export const MANAGE_CLUB_BOOK_OPTIONS: ManageClubBookOptionItem[] = [
  {
    name: '전체',
    id: 'all',
    text: '전체 도서',
  },
  {
    name: '대여 가능',
    id: 'can-rent',
    text: '대여 가능한 도서',
  },
  {
    name: '대여 중',
    id: 'renting',
    text: '대여 중인 도서',
  },
];
