import { toast } from 'react-toastify';

import { API_SUFFIX, instance } from './api';

export interface BookResponse {
  name: string;
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
  user?: {
    name?: string;
    freeze?: number;
  };
}

export interface GetClubBooksResponse {
  cid: number;
  name: string;
  book: [BookListProps];
  user?: {
    name?: string;
    freeze?: number;
  };
}

export interface GetAllClubsResponse extends GetClubBooksResponse {
  end: number;
  bid: number;
}

export interface GetUserBooksResponse extends GetClubBooksResponse {
  borrowBook: number;
}

export interface ClubBookValue {
  cid?: number;
  bid?: number;
  uid?: string;
}

export interface ReturnBookValue extends ClubBookValue {
  image?: string;
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

export const rentBook = async ({ cid, bid }: ClubBookValue) => {
  if (cid && bid) {
    const { data } = await instance.post(`${API_SUFFIX.CLUB}/${cid}/book/${bid}`);
    return data;
  } else {
    toast.error('동아리 아이디 또는 책 아이디가 없습니다.', {
      autoClose: 3000,
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    throw new Error('cid or bid is undefined');
  }
};

export const getUserBooks = async (uid?: string): Promise<GetUserBooksResponse[]> => {
  const { data } = await instance.get(`${API_SUFFIX.CLUB}/member/${uid}/book`);
  return data;
};

export const getClubBooks = async (cid?: number): Promise<GetClubBooksResponse[]> => {
  const { data } = await instance.get(`${API_SUFFIX.CLUB}/${cid}/book`);
  return data;
};

export const returnBook = async ({ cid, bid, image }: ReturnBookValue) => {
  if (cid && bid && image) {
    const { data } = await instance.patch(`${API_SUFFIX.CLUB}/${cid}/book/${bid}`, {
      image,
    });
    return data;
  } else {
    toast.error('동아리 아이디 또는 책 아이디가 없습니다.', {
      autoClose: 3000,
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    throw new Error('cid or bid is undefined');
  }
};

export const deleteClubBook = async ({ cid, bid }: ClubBookValue) => {
  if (cid && bid) {
    const { data } = await instance.delete(`${API_SUFFIX.CLUB}/${cid}/book/${bid}`);
    return data;
  } else {
    toast.error('동아리 아이디 또는 책 아이디가 없습니다.', {
      autoClose: 3000,
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    throw new Error('cid or bid is undefined');
  }
};
