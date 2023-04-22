export interface UserNavbarMenuItem {
  text: string;
  href: string;
}

export const USER_NAVBAR_MENU_LIST: UserNavbarMenuItem[] = [
  {
    text: '대여하기',
    href: '/rent',
  },
  {
    text: '내 도서',
    href: '/manage/user-book',
  },
];
