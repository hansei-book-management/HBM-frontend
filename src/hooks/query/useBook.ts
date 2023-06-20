import { UseMutationResult, UseQueryResult, useMutation, useQuery } from 'react-query';

import { AxiosError } from 'axios';

import {
  APIErrorResponse,
  APIResponse,
  GetAllBooksResponse,
  SearchBookValue,
  getAllBooks,
  searchBook,
} from '@/api';

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
