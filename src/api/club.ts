import { APIResponse, API_SUFFIX, GetClubResponse, instance } from './api';

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

export const getClub = async (): Promise<APIResponse<GetClubResponse>> => {
  const { data } = await instance.get(API_SUFFIX.CR_CLUB);
  return data;
};

// export const generateClubCode = async
