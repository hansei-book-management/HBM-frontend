/* eslint-disable @typescript-eslint/ban-types */
import { UseMutationResult, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AxiosError } from 'axios';
import { useRecoilState } from 'recoil';

import {
  APIErrorResponse,
  APIResponse,
  APIResponseStatusType,
  register,
  registerPhone,
} from '@/api';
import { RegisterFormValues } from '@/pages';
import { PhoneToken } from '@/atoms';
import { VerificationCode } from '@/atoms/verificatoinCode';

export const useRegister = (): UseMutationResult<
  APIResponse<{}>,
  AxiosError<APIErrorResponse>,
  RegisterFormValues
> => {
  const navigate = useNavigate();
  const [, setVerificationToken] = useRecoilState(VerificationCode);
  return useMutation('useRegister', register, {
    onSuccess: () => {
      navigate('/auth/login');
      toast.success('로그인에 성공하셨습니다.', {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
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
  const [, setPhoneToken] = useRecoilState(PhoneToken);
  return useMutation('useRegisterPhone', registerPhone, {
    onSuccess: (data: { message: string; token: string }) => {
      setPhoneToken({ token: data.token, state: true });
      toast.success('전화번호 인증에 성공하셨습니다.', {
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
