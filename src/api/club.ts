import { APIResponse, API_SUFFIX, instance } from './api';

export interface ClubApplyFormValue {
  name: string;
}

export const createClub = async ({
  name,
}: ClubApplyFormValue): Promise<APIResponse<{ name: string; director: string }>> => {
  const { data } = await instance.post(API_SUFFIX.CR_CLUB, {
    name,
  });
  return data;
};
