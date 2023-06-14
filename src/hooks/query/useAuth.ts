/* eslint-disable @typescript-eslint/ban-types */
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AxiosError } from 'axios';
import { useRecoilState } from 'recoil';

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

export const useRegister = (): UseMutationResult<
  APIResponse<{ auth: string; refresh: string }>,
  AxiosError<APIErrorResponse>,
  RegisterFormValues
> => {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(globalAccessToken);
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
      navigate('/');
      console.log(token);
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

export const useFetchUser = (): UseQueryResult<
  APIResponse<UserProfileResponse>,
  AxiosError<APIErrorResponse>
> => {
  const [token, setToken] = useRecoilState(globalAccessToken);
  return useQuery(
    'useFetchUser',
    () => {
      if (token.state) {
        console.log(token.state, 'token.state');
        setAccessToken(token.accessToken);
        return getUserProfile();
      }
      return getRefreshTokenAuth().then((data) => {
        console.log('getRefreshTokenAuth');
        setAccessToken(data.result.accessToken);
        return getUserProfile();
      });
    },
    {
      onError: () => {
        setToken({ accessToken: '', state: false });
        console.log('error');
        setAccessToken(null);
      },
      retry: 0,
      staleTime: 36000,
    },
  );
};
