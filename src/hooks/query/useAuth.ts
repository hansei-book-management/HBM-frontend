import { UseMutationResult, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

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
    onError: (error) => {
      console.log(error);
    },
    retry: 0,
  });
};
