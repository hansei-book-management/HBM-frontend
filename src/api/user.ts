import { RegisterFormValues } from '@/pages';

import { APIResponse, API_SUFFIX, instance } from './api';

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
