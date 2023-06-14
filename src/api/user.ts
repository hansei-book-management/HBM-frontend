import { APIResponse, API_SUFFIX, UserProfileResponse, instance, setAccessToken } from './api';

export interface RegisterFormValues {
  uid: string;
  passwd: string;
  name: string;
  num: string;
  phone: string;
}

export interface LoginFormValues {
  uid: string;
  passwd: string;
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
  uid,
  passwd,
}: LoginFormValues): Promise<APIResponse<{ auth: string; refresh: string }>> => {
  const { data } = await instance.post(API_SUFFIX.LOGIN, {
    uid,
    passwd,
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
