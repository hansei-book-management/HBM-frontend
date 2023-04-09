export interface MenuItem {
  text: string;
  href: string;
}

export const MENU_LIST: MenuItem[] = [
  {
    text: '대여하기',
    href: '/rent',
  },
  {
    text: '도서 관리',
    href: '/manage',
  },
];
