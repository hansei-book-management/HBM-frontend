/* eslint-disable @typescript-eslint/ban-types */
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AxiosError } from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';

import {
  APIErrorResponse,
  APIResponse,
  APIResponseStatusType,
  LoginFormValues,
  register,
  login,
  setAccessToken,
  UserProfileResponse,
  getUserProfile,
  getRefreshTokenAuth,
  RegisterFormValues,
} from '@/api';
import { globalAccessToken } from '@/atoms';

import { useGetClub } from './useClub';

export const useRegister = (): UseMutationResult<
  APIResponse<{ auth: string; refresh: string }>,
  AxiosError<APIErrorResponse>,
  RegisterFormValues
> => {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(globalAccessToken);
  const fetchUser = useFetchUser();
  return useMutation('useRegister', register, {
    onSuccess: (data: {
      status: APIResponseStatusType;
      message: string;
      result: { auth: string; refresh: string };
    }) => {
      localStorage.setItem('refreshToken', data.result.refresh);
      setToken({ accessToken: data.result.auth, state: true });
      setAccessToken(token.accessToken);
      toast.success('자동 로그인 되었어요.', {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      fetchUser.refetch();
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

export const useLogin = (): UseMutationResult<
  APIResponse<{ auth: string; refresh: string }>,
  AxiosError<APIErrorResponse>,
  LoginFormValues
> => {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(globalAccessToken);
  const fetchUser = useFetchUser();
  return useMutation('useLogin', login, {
    onSuccess: (data: {
      status: APIResponseStatusType;
      message: string;
      result: { auth: string; refresh: string };
    }) => {
      localStorage.setItem('refreshToken', data.result.refresh);
      setToken({ accessToken: data.result.auth, state: true });
      setAccessToken(token.accessToken);
      toast.success('로그인에 성공하셨습니다.', {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      fetchUser.refetch();
      navigate('/');
    },
    onError: (data) => {
      toast.error(data.message, {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    retry: 0,
  });
};

export const UseLogout = () => {
  const queryClient = useQueryClient();
  const setToken = useSetRecoilState(globalAccessToken);
  const navigate = useNavigate();

  const deleteUserInformation = () => {
    setToken({ accessToken: '', state: false });
    localStorage.removeItem('refreshToken');
    queryClient.removeQueries('useFetchUser');
    navigate('/');
    toast.success('로그아웃에 성공하셨어요!', {
      autoClose: 3000,
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  return { deleteUserInformation };
};

export const useFetchUser = (): UseQueryResult<
  APIResponse<UserProfileResponse>,
  AxiosError<APIErrorResponse>
> => {
  const [token, setToken] = useRecoilState(globalAccessToken);
  const getClub = useGetClub();
  return useQuery(
    'useFetchUser',
    () => {
      if (token.state) {
        setAccessToken(token.accessToken);
        return getUserProfile();
      }
      getClub.refetch();
      return getRefreshTokenAuth().then((data) => {
        setAccessToken(data.result);
        return getUserProfile();
      });
    },
    {
      onError: () => {
        setToken({ accessToken: '', state: false });
        setAccessToken(null);
      },
      retry: 0,
      staleTime: 36000,
    },
  );
};
