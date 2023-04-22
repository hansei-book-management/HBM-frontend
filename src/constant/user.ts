export interface UserItem {
  name: string;
  bookInfo: number;
  status: boolean;
  errorMessage?: string;
}

export const USER_LIST: UserItem[] = [
  {
    name: '박찬영',
    bookInfo: 0,
    status: false,
    errorMessage: '8일 12시간 20분 남음',
  },
  {
    name: '박찬영',
    bookInfo: 3,
    status: true,
  },
  {
    name: '박찬영',
    bookInfo: 0,
    status: true,
  },
];
