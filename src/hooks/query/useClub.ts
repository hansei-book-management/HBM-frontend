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
} from '@/api';
import { generateClubCodeModal } from '@/atoms';
import { MANAGE_CLUB } from '@/constant';

import { useFetchUser } from './useAuth';

export const useCreateClub = (): UseMutationResult<
  APIResponse<{ name: string; director: string }>,
  AxiosError<APIErrorResponse>,
  ClubApplyFormValue
> => {
  const navigate = useNavigate();
  const fetchUser = useFetchUser();
  return useMutation('useCreateClub', createClub, {
    onSuccess: (data: {
      status: APIResponseStatusType;
      message: string;
      result: { name: string; director: string };
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
  const navigate = useNavigate();
  return useMutation('useGenerateClubCode', generateClubCode, {
    onSuccess: (data: {
      status: APIResponseStatusType;
      message: string;
      result: { token: string };
    }) => {
      setClubCodeModal((prev) => ({ ...prev, isLoading: true }));
      setTimeout(() => {
        setClubCodeModal({ state: true, isOk: true, data: data.result.token, page: 2 });
        navigate(`${MANAGE_CLUB}/generate-code?step=2`);
      }, 1000);
      localStorage.setItem('club-code', data.result.token);
    },
    onError: (data) => {
      setClubCodeModal({ state: true, isOk: false, data: data.response?.data.message });
    },
    retry: 0,
  });
};
