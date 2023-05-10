import axios from 'axios';

export const API_SUFFIX = {
  BASEURL: 'https://pcy06.me',
  REGISTER: '/auth/register/',
  REGISTER_PHONE: '/auth/register/phone',
  LOGIN: '/auth/login/',
};

export const instance = axios.create({
  baseURL: API_SUFFIX.BASEURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export type APIResponseStatusType = boolean;

export interface APIResponse<T = unknown> {
  status: APIResponseStatusType;
  message: string;
  token: string;
  result?: T;
}

export interface APIErrorResponse {
  status: 'FAILED';
  message: string;
  at?: string;
  result?: null;
}
