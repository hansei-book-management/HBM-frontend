import { RegisterFormValues } from '@/pages';

import {
  APIResponse,
  API_SUFFIX,
  LoginFormValues,
  UserProfileResponse,
  instance,
  setAccessToken,
} from './api';

export const login = async ({
  username,
  password,
}: LoginFormValues): Promise<APIResponse<{ accessToken: string; refreshToken: string }>> => {
  const { data } = await instance.post(API_SUFFIX.LOGIN, {
    username,
    password,
  });
  return data;
};

export const register = async ({
  username,
  password,
  name,
  studentId,
  phoneToken,
  verificationCode,
}: RegisterFormValues): Promise<APIResponse<{ message: string; token: string }>> => {
  const { data } = await instance.post(API_SUFFIX.REGISTER, {
    username,
    password,
    name,
    studentId,
    phoneToken,
    verificationCode,
  });
  return data;
};

export const registerPhone = async (
  phone: string,
): Promise<APIResponse<{ message: string; token: string }>> => {
  const { data } = await instance.post(API_SUFFIX.REGISTER_PHONE, { phone });
  return data;
};

export const getUserProfile = async (): Promise<APIResponse<UserProfileResponse>> => {
  const { data } = await instance.get(API_SUFFIX.PROFILE);
  console.log(data, 'data');
  return data;
};

export const getRefreshTokenAuth = async (): Promise<APIResponse<{ accessToken: string }>> => {
  const token = localStorage.getItem('refreshToken');
  console.log(token, 'refresh-token');
  if (token) setAccessToken(token);
  const { data } = await instance.post(API_SUFFIX.REFRESH);
  console.log(data, 'data');
  return data;
};
