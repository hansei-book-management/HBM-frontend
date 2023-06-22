import { API_SUFFIX, instance } from './api';

export interface BookResponse {
  title: string;
  author: string;
  image: string;
  publisher: string;
  description: string;
  isbn: string;
}

export interface GetAllBooksResponse {
  display: number;
  items: [BookResponse];
}

export interface SearchBookValue {
  bookName: string;
}

export interface AddClubBookValues {
  cid?: number;
  isbn: string;
}

export interface BookListProps {
  data: {
    items: [BookResponse];
  };
  end: number;
  bid: number;
}

export interface GetAllClubsResponse {
  cid: number;
  name: string;
  book: [BookListProps];
  end: number;
  bid: number;
}

export interface GetUserBooksResponse {
  cid: number;
  name: string;
  book: [BookListProps];
  borrowBook: number;
}

export const getAllBooks = async (): Promise<GetAllBooksResponse> => {
  const { data } = await instance.get(API_SUFFIX.BOOK);
  return data;
};

export const searchBook = async ({ bookName }: SearchBookValue) => {
  const { data } = await instance.post(API_SUFFIX.SEARCH_BOOK, null, {
    params: {
      query: bookName,
    },
  });

  return data;
};

export const addClubBook = async ({ cid, isbn }: AddClubBookValues) => {
  if (cid) {
    const { data } = await instance.post(`${API_SUFFIX.CLUB}/${cid}/book`, {
      isbn,
    });
    return data;
  } else {
    return;
  }
};

export const getAllClubs = async (): Promise<GetAllClubsResponse[]> => {
  const { data } = await instance.get(API_SUFFIX.ALL_CLUBS);
  return data;
};

export const getUserClubs = async (): Promise<GetAllClubsResponse[]> => {
  const { data } = await instance.get(API_SUFFIX.CLUB);
  return data;
};

export const rentBook = async (cid?: number, bid?: number) => {
  const { data } = await instance.post(`${API_SUFFIX.CLUB}/${cid}/book/${bid}`);
  return data;
};

export const getUserBooks = async (uid?: string): Promise<GetUserBooksResponse[]> => {
  const { data } = await instance.get(`${API_SUFFIX.CLUB}/member/${uid}/book`);
  return data;
};
