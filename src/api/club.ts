import { APIResponse, API_SUFFIX, instance } from './api';
import { ClubMemberInfo } from './clubMember';

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
  name: string;
  director: string;
  cid: number;
  members: [ClubMemberInfo];
}

export interface AddClubFormValues {
  clubCode: string;
}

export interface AddClubResponse {
  name: string;
  cid: number;
}

export interface ChangeClubDirectorValues {
  cid?: number;
  name: string;
  director: string;
}

export const createClub = async ({ name }: ClubApplyFormValue) => {
  const { data } = await instance.post(API_SUFFIX.CLUB, {
    name,
  });
  return data;
};

export const getClubInfo = async (cid?: number): Promise<APIResponse<GetClubMembers>> => {
  if (cid) {
    const { data } = await instance.get(`${API_SUFFIX.CLUB}/${cid}`);
    return data;
  } else {
    throw new Error('cid is undefined');
  }
};

export const generateClubCode = async ({
  end,
  use,
  cid,
}: GenerateClubCodeValues): Promise<APIResponse<{ token: string }>> => {
  const { data } = await instance.post(`${API_SUFFIX.CLUB}/${cid}/member`, {
    end,
    use,
  });
  return data;
};

export const addUserClub = async ({ clubCode }: AddClubFormValues) => {
  const { data } = await instance.post(`${API_SUFFIX.CLUB}/member`, {
    token: clubCode,
  });
  return data;
};

export const deleteClub = async (cid?: number) => {
  if (cid) {
    const { data } = await instance.delete(`${API_SUFFIX.CLUB}/${cid}`);
    console.log('delete');
    return data;
  } else {
    throw new Error('cid is undefined');
  }
};

export const changeClubDirector = async ({
  cid,
  name,
  director,
}: ChangeClubDirectorValues): Promise<APIResponse<ChangeClubDirectorValues>> => {
  if (cid) {
    const { data } = await instance.put(`${API_SUFFIX.CLUB}/${cid}`, {
      name,
      director,
    });
    return data;
  } else {
    throw new Error('cid is undefined');
  }
};
