import { UseMutationResult, UseQueryResult, useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import {
  APIErrorResponse,
  APIResponse,
  createClub,
  ClubApplyFormValue,
  APIResponseStatusType,
  generateClubCode,
  GenerateClubCodeValues,
  getClubInfo,
  GetClubMembers,
  addUserClub,
  AddClubResponse,
  CreateClubResponse,
  AddClubFormValues,
  ChangeClubDirectorValues,
  changeClubDirector,
  deleteClub,
} from '@/api';
import {
  addUserClubModal,
  changeClubDirectorModal,
  deleteClubModal,
  generateClubCodeModal,
} from '@/atoms';

import { useFetchUser } from './useAuth';
import { useGetUserClubs } from './useBook';

export const useCreateClub = (): UseMutationResult<
  APIResponse<CreateClubResponse>,
  AxiosError<APIErrorResponse>,
  ClubApplyFormValue
> => {
  const navigate = useNavigate();
  const fetchUser = useFetchUser();
  const getUserClub = useGetUserClubs();
  return useMutation('useCreateClub', createClub, {
    onSuccess: (data: {
      status: APIResponseStatusType;
      message: string;
      result: CreateClubResponse;
    }) => {
      toast.success(`${data.result.name} 동아리가 생성되었어요.`, {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      fetchUser.refetch();
      getUserClub.refetch();
      navigate('/');
    },
    onError: (data) => {
      toast.error(data.response?.data.message, {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    retry: 0,
  });
};

export const useGetClubInfo = (
  cid?: number,
): UseQueryResult<APIResponse<GetClubMembers>, AxiosError<APIErrorResponse>> =>
  useQuery('useGetClubMember', () => getClubInfo(cid), {
    retry: 0,
    staleTime: 36000,
  });

export const useGenerateClubCode = (): UseMutationResult<
  APIResponse<{ token: string }>,
  AxiosError<APIErrorResponse>,
  GenerateClubCodeValues
> => {
  const setClubCodeModal = useSetRecoilState(generateClubCodeModal);
  return useMutation('useGenerateClubCode', generateClubCode, {
    onSuccess: (data: {
      status: APIResponseStatusType;
      message: string;
      result: { token: string };
    }) => {
      setClubCodeModal((prev) => ({ ...prev, isLoading: true }));
      setTimeout(() => {
        setClubCodeModal({ state: true, isOk: true, code: data.result.token });
      }, 1000);
      localStorage.setItem('clubCode', data.result.token);
    },
    onError: (data) => {
      setClubCodeModal({ state: true, isOk: false, data: data.response?.data.message });
    },
    retry: 0,
  });
};

export const useAddUserClub = (): UseMutationResult<
  APIResponse<AddClubResponse>,
  AxiosError<APIErrorResponse>,
  AddClubFormValues
> => {
  const setAddUserClubModal = useSetRecoilState(addUserClubModal);
  const userClubs = useGetUserClubs();
  return useMutation('useAddUserClub', addUserClub, {
    onSuccess: (data: {
      status: APIResponseStatusType;
      message: string;
      result: AddClubResponse;
    }) => {
      setAddUserClubModal((prev) => ({ ...prev, isLoading: true }));
      setTimeout(() => {
        setAddUserClubModal({ state: true, isOk: true, data: data.result.name });
      }, 1000);
      userClubs.refetch();
    },
    onError: (data) => {
      setAddUserClubModal({ state: true, isOk: false, data: data.response?.data.message });
    },
    retry: 0,
  });
};

export const useChangeClubDirector = (): UseMutationResult<
  APIResponse<ChangeClubDirectorValues>,
  AxiosError<APIErrorResponse>,
  ChangeClubDirectorValues
> => {
  const setChangeClubDirectorModal = useSetRecoilState(changeClubDirectorModal);
  return useMutation('useChangeClubDirector', changeClubDirector, {
    onSuccess: (data: {
      status: APIResponseStatusType;
      message: string;
      result: ChangeClubDirectorValues;
    }) => {
      setChangeClubDirectorModal((prev) => ({ ...prev, isLoading: true, page: 2 }));
      setTimeout(() => {
        setChangeClubDirectorModal({
          state: true,
          isOk: true,
          data: data.result.director,
          page: 3,
        });
      }, 1000);
    },
    onError: (data) => {
      setChangeClubDirectorModal({ state: true, isOk: false, data: data.response?.data.message });
    },
  });
};

export const useDeleteClub = (
  cid?: number,
): UseMutationResult<APIResponse<null>, AxiosError<APIErrorResponse>> => {
  const setDeleteClubModal = useSetRecoilState(deleteClubModal);
  return useMutation('useDeleteClub', () => deleteClub(cid), {
    onSuccess: () => {
      setDeleteClubModal((prev) => ({ ...prev, isLoading: true, data: 'deleted' }));
      setTimeout(() => {
        setDeleteClubModal({ state: true, isOk: true });
      }, 1000);
    },
    onError: (data) => {
      setDeleteClubModal({ state: true, isOk: false, data: data.response?.data.message });
    },
    retry: 0,
  });
};
