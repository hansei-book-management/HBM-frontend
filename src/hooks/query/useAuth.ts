/* eslint-disable @typescript-eslint/ban-types */
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from 'react-query';
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
  registerPhone,
  setAccessToken,
  UserProfileResponse,
  getUserProfile,
  getRefreshTokenAuth,
} from '@/api';
import { RegisterFormValues } from '@/pages';
import { PhoneToken, VerificationCode, globalAccessToken } from '@/atoms';

export const useLogin = (): UseMutationResult<
  APIResponse<{ accessToken: string; refreshToken: string }>,
  AxiosError<APIErrorResponse>,
  LoginFormValues
> => {
  const [token, setToken] = useRecoilState(globalAccessToken);
  return useMutation('useLogin', login, {
    onSuccess: (data: {
      status: APIResponseStatusType;
      message: string;
      result: { accessToken: string; refreshToken: string };
    }) => {
      console.log(data);
      localStorage.setItem('refreshToken', data.result.refreshToken);
      setToken({ accessToken: data.result.accessToken, state: true });
      setAccessToken(token.accessToken);
      toast.success('자동 로그인 되었어요.', {
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

// export const useRegister = (): UseMutationResult<
//   APIResponse<{}>,
//   AxiosError<APIErrorResponse>,
//   RegisterFormValues
// > => {
//   const navigate = useNavigate();
//   const setVerificationToken = useSetRecoilState(VerificationCode);
//   const [token, setToken] = useRecoilState(globalAccessToken);
//   return useMutation('useRegister', register, {
//     onSuccess: (data: { token: string }) => {
//       localStorage.setItem('token', data.token);
//       setToken({ accessToken: data.token, state: true });
//       setAccessToken(token.accessToken);
//       toast.success('자동 로그인 되었어요.', {
//         autoClose: 3000,
//         position: toast.POSITION.BOTTOM_RIGHT,
//       });
//       navigate('/');
//     },
//     onError: (data) => {
//       if (data.response && data.response.data.at) {
//         setVerificationToken({ message: data.response.data.message });
//       }
//       if (!data.response?.data.at) {
//         toast.error(data.response?.data.message, {
//           autoClose: 3000,
//           position: toast.POSITION.BOTTOM_RIGHT,
//         });
//       }
//     },
//     retry: 0,
//   });
// };

// export const useRegisterPhone = (): UseMutationResult<
//   APIResponse<{ message: string; token: string }>,
//   AxiosError<APIErrorResponse>,
//   string
// > => {
//   const setPhoneToken = useSetRecoilState(PhoneToken);
//   return useMutation('useRegisterPhone', registerPhone, {
//     onSuccess: (data: { message: string; token: string }) => {
//       setPhoneToken({ token: data.token, state: true });
//       toast.success('인증번호가 발송되었어요.', {
//         autoClose: 3000,
//         position: toast.POSITION.BOTTOM_RIGHT,
//       });
//     },
//     onError: (data) => {
//       toast.error(data.response?.data.at, {
//         autoClose: 3000,
//         position: toast.POSITION.BOTTOM_RIGHT,
//       });
//     },
//     retry: 0,
//   });
// };
