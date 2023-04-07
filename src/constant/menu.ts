export interface MenuItem {
  text: string;
  href: string;
}

export const Menu_LIST: MenuItem[] = [
  {
    text: '대출하기',
    href: '/loan',
  },
  {
    text: '대출 관리',
    href: '/loan/manage',
  },
];
