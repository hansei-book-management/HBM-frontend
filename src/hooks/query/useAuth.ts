import { UseMutationResult, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, register } from '@/api';
import { RegisterFormValues } from '@/pages';

export const useRegister = (): UseMutationResult<
  // eslint-disable-next-line @typescript-eslint/ban-types
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
      console.log(data, 'error');
      toast.error(data.message, {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    retry: 0,
  });
};
