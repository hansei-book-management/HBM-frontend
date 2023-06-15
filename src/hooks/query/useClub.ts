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
} from '@/api';

export const useCreateClub = (): UseMutationResult<
  APIResponse<{ name: string; director: string }>,
  AxiosError<APIErrorResponse, { message: string }>,
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

export const GetClub = (): UseQueryResult<
  APIResponse<GetClubResponse>,
  AxiosError<APIErrorResponse>
> =>
  useQuery('GetClub', () => getClub(), {
    retry: 0,
    staleTime: 36000,
  });
