import axios from 'axios';

export const API_SUFFIX = {
  BASEURL: 'http://127.0.0.1:8000',
  REGISTER: '/api/user',
  REGISTER_PHONE: '/auth/register/phone',
  LOGIN: '/auth/login',
  PROFILE: '/user/profile',
  REFRESH: '/auth/refresh',
};

export const instance = axios.create({
  baseURL: API_SUFFIX.BASEURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export type APIResponseStatusType = 'SUCCESS' | 'FAILED';

export interface APIResponse<T = unknown> {
  status: APIResponseStatusType;
  message: string;
  result: T;
}

export interface APIErrorResponse {
  status: 'FAILED';
  message: string;
  result?: null;
}

export interface UserProfileResponse {
  id: number;
  username: string;
  name: string;
  studentId: string;
  phone: string;
}

export interface LoginFormValues {
  username: string;
  password: string;
}

export const setAccessToken = (token: string | null) => {
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    // 이렇게 보냈는데 401 error가 나는거면 백엔드에서 토큰을 못받아서 그런거임
  } else {
    delete instance.defaults.headers.common.Authorization;
  }
};
