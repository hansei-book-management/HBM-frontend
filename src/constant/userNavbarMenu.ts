export interface UserNavbarMenuItem {
  text: string;
  href: string;
}

export const USER_NAVBAR_MENU_LIST: UserNavbarMenuItem[] = [
  {
    text: '모든 도서',
    href: '/book',
  },
  {
    text: '도서 대여',
    href: '/rent',
  },
  {
    text: '내 도서',
    href: '/manage/user-book',
  },
];
