import axios from 'axios';

import { FormProps } from '@/pages/auth';

export const API_SUFFIX = {
    BASEURL: 'http://localhost:3000',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
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
    result: T;
}

export const register = async ({
    id,
    name,
    studentId,
    phoneNumber,
    password,
    passwordCheck,
    role,
}: FormProps): Promise<APIResponse<{ accessToken: string; refreshToken: string }>> => {
    const { data } = await instance.post(API_SUFFIX.LOGIN, {
        username,
        password,
    });
    return data;
};
