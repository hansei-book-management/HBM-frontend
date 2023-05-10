/* eslint-disable @typescript-eslint/ban-types */
import { UseMutationResult, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AxiosError } from 'axios';
import { useRecoilState } from 'recoil';

import { APIErrorResponse, APIResponse, register, registerPhone } from '@/api';
import { RegisterFormValues } from '@/pages';
import { PhoneTokenState } from '@/atoms';

export const useRegister = (): UseMutationResult<
  APIResponse<{}>,
  AxiosError<APIErrorResponse>,
  RegisterFormValues
> => {
  const navigate = useNavigate();
  return useMutation('useRegister', register, {
    onSuccess: () => {
      navigate('/login');
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

export const useRegisterPhone = (): UseMutationResult<
  APIResponse<{ message: string; token: string }>,
  AxiosError<APIErrorResponse>,
  string
> => {
  const [phoneToken, setPhoneToken] = useRecoilState(PhoneTokenState);
  return useMutation('useRegisterPhone', registerPhone, {
    onSuccess: (data) => {
      setPhoneToken({ token: `${data.token}`, state: true });
      toast.success(data.message, {
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
