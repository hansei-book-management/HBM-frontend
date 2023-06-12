import {
  APIResponse,
  API_SUFFIX,
  LoginFormValues,
  UserProfileResponse,
  instance,
  setAccessToken,
} from './api';

export interface RegisterFormValues {
  uid: string;
  passwd: string;
  name: string;
  num: string;
  phone: string;
}

export const register = async ({
  uid,
  passwd,
  name,
  num,
  phone,
}: RegisterFormValues): Promise<APIResponse<{ auth: string; refresh: string }>> => {
  const { data } = await instance.post(API_SUFFIX.REGISTER, {
    uid,
    passwd,
    name,
    num,
    phone,
  });
  return data;
};

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
