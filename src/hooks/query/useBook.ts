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
  getClubBooks,
  GetClubBooksResponse,
  returnBook,
  ReturnBookValue,
  ClubBookValue,
  deleteClubBook,
} from '@/api';
import {
  addClubBookModal,
  rentClubBookModal,
  returnClubBookModal,
  deleteClubBookModal,
} from '@/atoms';

export const useGetBooks = (): UseQueryResult<
  APIResponse<GetAllBooksResponse>,
  AxiosError<APIErrorResponse>
> => {
  return useQuery('useGetBooks', getAllBooks, {
    retry: 0,
    staleTime: 36000,
  });
};

export const useSearchBook = (): UseMutationResult<
  APIResponse<GetAllBooksResponse>,
  AxiosError<APIErrorResponse>,
  SearchBookValue
> => {
  return useMutation('useSearchBook', searchBook, {
    onError: (data) => {
      toast.error(data.response?.data.message, {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    retry: 0,
  });
};

export const useAddClubBook = (): UseMutationResult<
  APIResponse<GetAllBooksResponse>,
  AxiosError<APIErrorResponse>,
  AddClubBookValues // 얘가 뭐하는 애냐하면 AddClubBookValues는 { cid: number; isbn: string } 이렇게 되어있는데 이걸 받아서 addClubBook에 넘겨주는거임
> => {
  const setAddClubBookModal = useSetRecoilState(addClubBookModal);
  const getClubs = useGetClubs();
  return useMutation('useAddClubBook', addClubBook, {
    onSuccess: () => {
      setAddClubBookModal({ state: true, isOk: null, isLoading: true });
      setTimeout(() => {
        setAddClubBookModal({ state: true, isOk: true });
      }, 1000);
      getClubs.refetch();
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
    retry: 0,
    staleTime: 36000,
  });
};

export const useGetUserClubs = (): UseQueryResult<
  APIResponse<GetAllClubsResponse[]>,
  AxiosError<APIErrorResponse>
> => {
  return useQuery('useGetUserClubs', getUserClubs, {
    retry: 0,
    staleTime: 36000,
  });
};

export const useRentBook = (): UseMutationResult<
  APIResponse<{ end: number }>,
  AxiosError<APIErrorResponse>,
  ClubBookValue
> => {
  const userClub = useGetUserClubs();
  const setRentBookModal = useSetRecoilState(rentClubBookModal);
  return useMutation('useRentBook', rentBook, {
    onSuccess: () => {
      setRentBookModal({ state: true, isOk: null, isLoading: true });
      setTimeout(() => {
        setRentBookModal({ state: true, isOk: true });
        userClub.refetch();
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
    staleTime: 36000,
  });
};

export const useGetClubBooks = (
  cid?: number,
): UseQueryResult<APIResponse<GetClubBooksResponse[]>, AxiosError<APIErrorResponse>> => {
  return useQuery('useGetClubBooks', () => getClubBooks(cid), {
    retry: 0,
    staleTime: 36000,
  });
};

export const useReturnBook = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  ReturnBookValue
> => {
  const userClub = useGetUserClubs();
  const setReturnBookModal = useSetRecoilState(returnClubBookModal);
  return useMutation('useReturnBook', returnBook, {
    onSuccess: () => {
      setReturnBookModal({ state: true, isLoading: true, correctLocation: true });
      setTimeout(() => {
        setReturnBookModal({ state: true, isOk: true });
      }, 1000);
      userClub.refetch();
    },
    onError: (data) => {
      setReturnBookModal({
        state: true,
        isOk: false,
        data: data?.response?.data.message,
      });
    },
    retry: 0,
  });
};

export const useDeleteBook = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  ClubBookValue
> => {
  const userClub = useGetUserClubs();
  const setDeleteBookModal = useSetRecoilState(deleteClubBookModal);
  return useMutation('useDeleteBook', deleteClubBook, {
    onSuccess: () => {
      setDeleteBookModal({ state: true, isLoading: true });
      setTimeout(() => {
        setDeleteBookModal({ state: true, isOk: true });
      }, 1000);
      userClub.refetch();
    },
    onError: (data) => {
      setDeleteBookModal({
        state: true,
        isOk: false,
        data: data?.response?.data.message,
      });
    },
    retry: 0,
  });
};
