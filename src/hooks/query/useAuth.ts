import { UseMutationResult, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { AxiosError } from 'axios';

import { APIResponse } from '@/api';
import { RegisterFormValues } from '@/pages';
import { register } from '@/api/user';

export const useRegister = (): UseMutationResult<
  // eslint-disable-next-line @typescript-eslint/ban-types
  APIResponse<{}>,
  AxiosError<APIResponse>,
  RegisterFormValues
> => {
  const navigate = useNavigate();
  return useMutation('useRegister', register, {
    onSuccess: () => {
      navigate('/login');
    },
    onError: (error: AxiosError<APIResponse>) => {
      console.log(error);
    },
  });
};
