import { UseMutationResult, UseQueryResult, useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AxiosError } from 'axios';

import {
  APIErrorResponse,
  APIResponse,
  createClub,
  ClubApplyFormValue,
  APIResponseStatusType,
  GetClubResponse,
  getClub,
  generateClubCode,
  GenerateClubCodeValues,
} from '@/api';
import { ClubApplyFormValues } from '@/pages';

export const useCreateClub = (): UseMutationResult<
  APIResponse<{ name: string; director: string }>,
  AxiosError<APIErrorResponse>,
  ClubApplyFormValue
> => {
  const navigate = useNavigate();
  return useMutation('useCreateClub', createClub, {
    onSuccess: (data: {
      status: APIResponseStatusType;
      message: string;
      result: { name: string; director: string };
    }) => {
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

export const useGetClub = (): UseQueryResult<
  APIResponse<GetClubResponse>,
  AxiosError<APIErrorResponse>
> =>
  useQuery('useGetClub', () => getClub(), {
    retry: 0,
    staleTime: 36000,
  });

export const useGenerateClubCode = (): UseMutationResult<
  APIResponse<{ token: string }>,
  AxiosError<APIErrorResponse>,
  GenerateClubCodeValues
> => {
  return useMutation('useGenerateClubCode', generateClubCode, {
    onSuccess: (data: {
      status: APIResponseStatusType;
      message: string;
      result: { token: string };
    }) => {
      toast.success(`코드가 생성되었어요. \n 코드는 ${data.result.token}`, {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
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
