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
  GetClubResponse,
  getUserClub,
  generateClubCode,
  GenerateClubCodeValues,
  getClubMembers,
  GetClubMembers,
  addUserClub,
  AddClubResponse,
  CreateClubResponse,
  GetClubMemberResponse,
  AddClubFormValues,
  ClubMemberValues,
  updateClubMember,
  UpdateClubMemberValues,
} from '@/api';
import { addUserClubModal, generateClubCodeModal, updateClubMemberModal } from '@/atoms';
import { getClubMember } from '@/api';
import { MANAGE_CLUB } from '@/constant';

import { useFetchUser } from './useAuth';

export const useCreateClub = (): UseMutationResult<
  APIResponse<CreateClubResponse>,
  AxiosError<APIErrorResponse>,
  ClubApplyFormValue
> => {
  const navigate = useNavigate();
  const fetchUser = useFetchUser();
  return useMutation('useCreateClub', createClub, {
    onSuccess: (data: {
      status: APIResponseStatusType;
      message: string;
      result: CreateClubResponse;
    }) => {
      fetchUser.refetch();
      toast.success(
        `${data.result.name} 동아리가 생성되었어요. \n 부장은 ${data.result.director}에요.`,
        {
          autoClose: 3000,
          position: toast.POSITION.BOTTOM_RIGHT,
        },
      );
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

export const useGetUserClub = (): UseQueryResult<
  APIResponse<GetClubResponse>,
  AxiosError<APIErrorResponse>
> =>
  useQuery('useGetUserClub', () => getUserClub(), {
    retry: 0,
    staleTime: 36000,
  });

export const useGetClubMembers = (
  cid?: number,
): UseQueryResult<APIResponse<GetClubMembers>, AxiosError<APIErrorResponse>> =>
  useQuery('useGetClubMember', () => getClubMembers(cid), {
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
      localStorage.setItem('club-code', data.result.token);
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
    },
    onError: (data) => {
      setAddUserClubModal({ state: true, isOk: false, data: data.response?.data.message });
    },
    retry: 0,
  });
};

export const useGetClubMember = ({
  cid,
  user_id,
}: ClubMemberValues): UseQueryResult<
  APIResponse<GetClubMemberResponse>,
  AxiosError<APIErrorResponse>
> =>
  useQuery('useGetMember', () => getClubMember({ cid, user_id }), {
    retry: 0,
  });

export const useUpdateClubMember = ({
  cid,
  user_id,
  freeze,
}: UpdateClubMemberValues): UseMutationResult<
  APIResponse<{ freeze?: number }>,
  AxiosError<APIErrorResponse>
> => {
  const setUpdateUserModal = useSetRecoilState(updateClubMemberModal);
  return useMutation('useUpdateClubMember', () => updateClubMember({ cid, user_id, freeze }), {
    onSuccess: (data: {
      status: APIResponseStatusType;
      message: string;
      result: { freeze?: number };
    }) => {
      setUpdateUserModal((prev) => ({ ...prev, isLoading: true }));
      setTimeout(() => {
        setUpdateUserModal({ state: true, isOk: true, data: data.result.freeze, page: 2 });
      }, 1000);
    },
    onError: (data) => {
      setUpdateUserModal({ state: true, isOk: false, data: data.response?.data.message });
    },
    retry: 0,
  });
};
