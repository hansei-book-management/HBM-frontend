import { UseMutationResult, UseQueryResult, useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import {
  APIErrorResponse,
  APIResponse,
  AddClubBookValues,
  GetAllBooksResponse,
  SearchBookValue,
  addClubBook,
  getAllBooks,
  getAllClubs,
  GetAllClubsResponse,
  getUserBooks,
  getUserClubs,
  searchBook,
  GetUserBooksResponse,
  rentBook,
} from '@/api';
import { addClubBookModal, rentClubBookModal } from '@/atoms';

export const useGetBooks = (): UseQueryResult<
  APIResponse<GetAllBooksResponse>,
  AxiosError<APIErrorResponse>
> => {
  return useQuery('useGetBooks', getAllBooks, {
    retry: 0,
    onError: (data) => {
      toast.error(data.response?.data.message, {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
  });
};

export const useSearchBook = (): UseMutationResult<
  APIResponse<GetAllBooksResponse>,
  AxiosError<APIErrorResponse>,
  SearchBookValue
> => {
  return useMutation('useSearchBook', searchBook, {
    retry: 0,
    onError: (data) => {
      toast.error(data.response?.data.message, {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
  });
};

export const useAddClubBook = (): UseMutationResult<
  APIResponse<GetAllBooksResponse>,
  AxiosError<APIErrorResponse>,
  AddClubBookValues
> => {
  const setAddClubBookModal = useSetRecoilState(addClubBookModal);
  return useMutation('useAddClubBook', addClubBook, {
    onSuccess: () => {
      setAddClubBookModal({ state: true, isOk: null, isLoading: true });
      setTimeout(() => {
        setAddClubBookModal({ state: true, isOk: true });
      }, 1000);
    },
    onError: (data) => {
      setAddClubBookModal({ state: true, isOk: false, data: data.response?.data.message });
    },
    retry: 0,
  });
};

export const useGetClubs = (): UseQueryResult<
  APIResponse<GetAllClubsResponse[]>,
  AxiosError<APIErrorResponse>
> => {
  return useQuery('useGetClubs', getAllClubs, {
    onError: (data) => {
      toast.error(data.response?.data.message, {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    retry: 0,
  });
};

export const useGetUserClubs = (): UseQueryResult<
  APIResponse<GetAllClubsResponse[]>,
  AxiosError<APIErrorResponse>
> => {
  return useQuery('useGetUserClubs', getUserClubs, {
    retry: 0,
  });
};

export const useRentBook = (
  cid?: number,
  bid?: number,
): UseMutationResult<APIResponse<{ end: number }>, AxiosError<APIErrorResponse>> => {
  const setRentBookModal = useSetRecoilState(rentClubBookModal);
  return useMutation('useRentBook', () => rentBook(cid, bid), {
    onSuccess: () => {
      setRentBookModal({ state: true, isOk: null, isLoading: true });
      setTimeout(() => {
        setRentBookModal({ state: true, isOk: true });
      }, 1000);
    },
    onError: (data) => {
      setRentBookModal({ state: true, isOk: false, data: data.response?.data.message });
    },
    retry: 0,
  });
};

export const useGetUserBooks = (
  uid?: string,
): UseQueryResult<APIResponse<GetUserBooksResponse[]>, AxiosError<APIErrorResponse>> => {
  return useQuery('useGetUserBook', () => getUserBooks(uid), {
    retry: 0,
  });
};
