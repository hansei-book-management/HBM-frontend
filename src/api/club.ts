import { APIResponse, API_SUFFIX, instance } from './api';

export interface ClubApplyFormValue {
  name: string;
}

export interface GenerateClubCodeValues {
  end: number;
  use: number;
  cid: number;
}

export interface CreateClubResponse {
  name: string;
  director: string;
}

export interface GetClubResponse {
  cid: number;
  name: string;
  director: string;
  freeze?: number;
}

export interface GetClubMembers {
  freeze: number;
  name: string;
  num: string;
  phone: string;
  role: string;
  uid: string;
  borrowBook: number;
}

export interface AddClubFormValues {
  clubCode: string;
}

export interface AddClubResponse {
  name: string;
  cid: number;
}

export const createClub = async ({
  name,
}: ClubApplyFormValue): Promise<APIResponse<CreateClubResponse>> => {
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

export const addUserClub = async ({
  clubCode,
}: AddClubFormValues): Promise<APIResponse<AddClubResponse>> => {
  const { data } = await instance.post(`${API_SUFFIX.CLUB}/member`, {
    token: clubCode,
  });
  return data;
};
