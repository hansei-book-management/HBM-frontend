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
    text: '대출 관리',
    href: '/rent-manage',
  },
];
