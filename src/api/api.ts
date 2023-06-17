import axios from 'axios';

export const API_SUFFIX = {
  BASEURL: 'http://127.0.0.1:8000',
  REGISTER: '/api/user',
  LOGIN: '/api/auth',
  PROFILE: '/user/profile',
  REFRESH: '/auth/refresh',
  CLUB: '/api/club',
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
  userInfo?: { result: UserProfileResponse };
  userClubInfo?: { result: GetClubResponse };
}

export interface APIErrorResponse {
  status: 'FAILED';
  message: string;
  result?: null;
}

export interface UserProfileResponse {
  uid: string;
  role: string;
  name: string;
  num: string;
  phone: string;
}

export interface GetClubResponse {
  cid: number;
  name: string;
  freeze?: number;
  director?: string;
}

export const setAccessToken = (token: string | null) => {
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common.Authorization;
  }
};
