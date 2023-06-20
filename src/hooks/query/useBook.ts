import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, GetAllBooksResponse, getAllBooks } from '@/api';

export const useGetBooks = (): UseQueryResult<
  APIResponse<GetAllBooksResponse>,
  AxiosError<APIErrorResponse>
> => {
  return useQuery('useGetBooks', getAllBooks, {
    retry: 0,
  });
};
