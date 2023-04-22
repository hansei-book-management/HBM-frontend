export interface AdminNavbarMenuItem {
  text: string;
  href: string;
}

export const ADMIN_NAVBAR_MENU_LIST: AdminNavbarMenuItem[] = [
  {
    text: '도서 관리',
    href: '/manage/club-book',
  },
  {
    text: '부원 관리',
    href: '/manage/user',
  },
];
