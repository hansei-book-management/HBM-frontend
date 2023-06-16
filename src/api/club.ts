import { APIResponse, API_SUFFIX, GetClubResponse, instance } from './api';

export interface ClubApplyFormValue {
  name: string;
}

export interface GenerateClubCodeFormValue {
  cid: string;
  end: number;
  use: number;
}

export const createClub = async ({
  name,
}: ClubApplyFormValue): Promise<APIResponse<{ name: string; director: string }>> => {
  const { data } = await instance.post(API_SUFFIX.CLUB, {
    name,
  });
  return data;
};

export const getClub = async (): Promise<APIResponse<GetClubResponse>> => {
  const { data } = await instance.get(API_SUFFIX.CLUB);
  return data;
};

export const generateClubCode = async ({
  cid,
  end,
  use,
}: GenerateClubCodeFormValue): Promise<APIResponse<{ token: string }>> => {
  const { data } = await instance.post(`${API_SUFFIX.CLUB}/${cid}/member`, {
    end,
    use,
  });
  return data;
};
