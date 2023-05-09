/* eslint-disable @typescript-eslint/ban-types */
import { UseMutationResult, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, register, registerPhone } from '@/api';
import { RegisterFormValues } from '@/pages';

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
  APIResponse<{}>,
  AxiosError<APIErrorResponse>,
  string
> => {
  return useMutation('useRegisterPhone', registerPhone, {
    onSuccess: (data) => {
      console.log(data, 'success');
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
