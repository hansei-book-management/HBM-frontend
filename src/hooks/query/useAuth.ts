/* eslint-disable @typescript-eslint/ban-types */
import { UseMutationResult, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AxiosError } from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { APIErrorResponse, APIResponse, register, registerPhone, setAccessToken } from '@/api';
import { RegisterFormValues } from '@/pages';
import { PhoneToken, VerificationCode, globalAccessToken } from '@/atoms';

export const useRegister = (): UseMutationResult<
  APIResponse<{}>,
  AxiosError<APIErrorResponse>,
  RegisterFormValues
> => {
  const navigate = useNavigate();
  const setVerificationToken = useSetRecoilState(VerificationCode);
  const [token, setToken] = useRecoilState(globalAccessToken);
  return useMutation('useRegister', register, {
    onSuccess: (data: { token: string }) => {
      localStorage.setItem('token', data.token);
      setToken({ accessToken: data.token, state: true });
      setAccessToken(token.accessToken);
      toast.success('자동 로그인 되었어요.', {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate('/');
    },
    onError: (data) => {
      if (data.response && data.response.data.at) {
        setVerificationToken({ message: data.response.data.message });
      }
      if (!data.response?.data.at) {
        toast.error(data.response?.data.message, {
          autoClose: 3000,
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    },
    retry: 0,
  });
};

export const useRegisterPhone = (): UseMutationResult<
  APIResponse<{ message: string; token: string }>,
  AxiosError<APIErrorResponse>,
  string
> => {
  const setPhoneToken = useSetRecoilState(PhoneToken);
  return useMutation('useRegisterPhone', registerPhone, {
    onSuccess: (data: { message: string; token: string }) => {
      setPhoneToken({ token: data.token, state: true });
      toast.success('인증번호가 발송되었어요.', {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    onError: (data) => {
      toast.error(data.response?.data.at, {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    retry: 0,
  });
};
