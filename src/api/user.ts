import { APIResponse, API_SUFFIX, instance, setAccessToken } from './api';

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

export interface UserProfileResponse {
  uid: string;
  role: string;
  name: string;
  num: string;
  phone: string;
}

export interface AuthResponse {
  auth: string;
  refresh: string;
}

export const register = async ({
  uid,
  passwd,
  name,
  num,
  phone,
}: RegisterFormValues): Promise<APIResponse<AuthResponse>> => {
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
}: LoginFormValues): Promise<APIResponse<AuthResponse>> => {
  const { data } = await instance.post(API_SUFFIX.LOGIN, {
    uid,
    passwd,
  });
  return data;
};

export const getUserProfile = async (): Promise<APIResponse<UserProfileResponse>> => {
  const { data: userInfo } = await instance.get(API_SUFFIX.PROFILE);
  return userInfo;
};

export const getRefreshTokenAuth = async () => {
  const token = localStorage.getItem('refreshToken');
  if (token) setAccessToken(token);
  const { data } = await instance.post(API_SUFFIX.REFRESH);
  return data;
};
