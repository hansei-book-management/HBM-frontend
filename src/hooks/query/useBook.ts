import { UseMutationResult, UseQueryResult, useMutation, useQuery } from 'react-query';

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
  searchBook,
} from '@/api';
import { addClubBookModal } from '@/atoms';

export const useGetBooks = (): UseQueryResult<
  APIResponse<GetAllBooksResponse>,
  AxiosError<APIErrorResponse>
> => {
  return useQuery('useGetBooks', getAllBooks, {
    retry: 0,
  });
};

export const useSearchBook = (): UseMutationResult<
  APIResponse<GetAllBooksResponse>,
  AxiosError<APIErrorResponse>,
  SearchBookValue
> => {
  return useMutation('useSearchBook', searchBook, {
    retry: 0,
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
      setAddClubBookModal((prev) => ({ ...prev, isLoading: true }));
      setTimeout(() => {
        setAddClubBookModal({ state: true, isOk: true });
      }, 1000);
    },
    onError: () => {
      setAddClubBookModal({ state: true, isOk: false });
    },
    retry: 0,
  });
};
