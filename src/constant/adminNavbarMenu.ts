export interface AdminNavbarMenuItem {
  text: string;
  href: string;
}

export const ADMIN_NAVBAR_MENU_LIST: AdminNavbarMenuItem[] = [
  {
    text: '모든 도서',
    href: '/book',
  },
  {
    text: '도서 대여',
    href: '/club/',
  },
  {
    text: '내 도서',
    href: '/manage/user-book',
  },
  {
    text: '도서 관리',
    href: '/manage/club-book',
  },
  {
    text: '동아리 관리',
    href: '/manage-club',
  },
];
