import axios from 'axios';

import { RegisterFormValues } from '@/pages/auth';

export const API_SUFFIX = {
  BASEURL: 'https://pcy06.me',
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
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
  token: T;
}
