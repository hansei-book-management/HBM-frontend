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

export const getUserProfile = async () => {
  const { data: userInfo } = await instance.get(API_SUFFIX.PROFILE);
  const { data: userClubInfo } = await instance.get(API_SUFFIX.CLUB);
  return { userInfo, userClubInfo };
};

export const getRefreshTokenAuth = async () => {
  const token = localStorage.getItem('refreshToken');
  if (token) setAccessToken(token);
  const { data } = await instance.post(API_SUFFIX.REFRESH);
  return data;
};
