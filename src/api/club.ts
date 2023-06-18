import { APIResponse, API_SUFFIX, GetClubMembers, GetClubResponse, instance } from './api';

export interface ClubApplyFormValue {
  name: string;
}

export interface GenerateClubCodeValues {
  end: number;
  use: number;
  cid: number;
}

export const createClub = async ({
  name,
}: ClubApplyFormValue): Promise<APIResponse<{ name: string; director: string }>> => {
  const { data } = await instance.post(API_SUFFIX.CLUB, {
    name,
  });
  return data;
};

export const getUserClub = async (): Promise<APIResponse<GetClubResponse>> => {
  const { data } = await instance.get(API_SUFFIX.CLUB);
  return data;
};

export const getClubMembers = async (cid?: number): Promise<APIResponse<GetClubMembers>> => {
  const { data } = await instance.get(`${API_SUFFIX.CLUB}/${cid}/member`);
  return data;
};

export const generateClubCode = async ({
  end,
  use,
}: GenerateClubCodeValues): Promise<APIResponse<{ token: string }>> => {
  const { data } = await instance.post(`${API_SUFFIX.CLUB}/1/member`, {
    end,
    use,
  });
  return data;
};
