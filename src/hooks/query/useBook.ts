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

export const useAddClubBook = ({
  cid,
  isbn,
}: AddClubBookValues): UseMutationResult<
  APIResponse<GetAllBooksResponse>,
  AxiosError<APIErrorResponse>
> => {
  const setAddClubBookModal = useSetRecoilState(addClubBookModal);
  const getClubs = useGetClubs();
  const getClubBooks = useGetClubBooks(cid);
  return useMutation('useAddClubBook', () => addClubBook({ cid, isbn }), {
    onSuccess: () => {
      setAddClubBookModal({ state: true, isOk: null, isLoading: true });
      setTimeout(() => {
        setAddClubBookModal({ state: true, isOk: true });
      }, 1000);
      getClubBooks.refetch();
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

export const useRentBook = ({
  cid,
  bid,
  uid,
}: ClubBookValue): UseMutationResult<
  APIResponse<{ end: number }>,
  AxiosError<APIErrorResponse>
> => {
  const userClub = useGetUserClubs();
  const userBooks = useGetUserBooks(uid);
  const setRentBookModal = useSetRecoilState(rentClubBookModal);
  return useMutation('useRentBook', () => rentBook({ cid, bid }), {
    onSuccess: () => {
      setRentBookModal({ state: true, isOk: null, isLoading: true });
      setTimeout(() => {
        setRentBookModal({ state: true, isOk: true });
        userClub.refetch();
        userBooks.refetch();
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

export const useDeleteBook = ({
  cid,
  bid,
}: ClubBookValue): UseMutationResult<APIResponse<null>, AxiosError<APIErrorResponse>> => {
  const userClub = useGetUserClubs();
  const setDeleteBookModal = useSetRecoilState(deleteClubBookModal);
  const getClubBooks = useGetClubBooks(cid);
  return useMutation('useDeleteBook', () => deleteClubBook({ cid, bid }), {
    onSuccess: () => {
      setDeleteBookModal({ state: true, isLoading: true, isOk: null });
      setTimeout(() => {
        setDeleteBookModal({ state: true, isOk: true });
      }, 1000);
      getClubBooks.refetch();
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
