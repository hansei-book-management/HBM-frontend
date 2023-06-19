import { APIResponse, API_SUFFIX, instance } from './api';

export interface ClubApplyFormValue {
  name: string;
}

export interface ClubMemberValues {
  cid?: number;
  user_id?: string;
  freeze?: number;
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
  num: string;
  phone: string;
  role: string;
  uid: string;
  freeze?: number;
  borrowBook: number;
}

export interface GetClubMemberResponse extends GetClubMembers {
  books: [
    {
      title?: string;
      data?: string;
    },
  ];
}

export interface AddClubFormValues {
  clubCode: string;
}

export interface AddClubResponse {
  name: string;
  cid: number;
}

export interface UpdateClubMemberValues {
  cid?: number;
  user_id: string;
  freeze: number;
}

export const createClub = async ({ name }: ClubApplyFormValue) => {
  const { data } = await instance.post(API_SUFFIX.CLUB, {
    name,
  });
  return data;
};

export const getUserClub = async () => {
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

export const xgetClubMember = async ({
  cid,
  user_id,
}: ClubMemberValues): Promise<APIResponse<GetClubMemberResponse>> => {
  if (cid && user_id) {
    const { data } = await instance.get(`${API_SUFFIX.CLUB}/${cid}/member/${user_id}`);
    return data;
  } else {
    throw new Error('cid나 user_id를 찾을 수 없습니다.');
  }
};

export const updateClubMember = async ({
  cid,
  user_id,
  freeze,
}: UpdateClubMemberValues): Promise<APIResponse<GetClubMemberResponse>> => {
  if (cid && user_id) {
    const { data } = await instance.patch(`${API_SUFFIX.CLUB}/${cid}/member/${user_id}`, {
      freeze,
    });
    return data;
  } else {
    throw new Error('cid나 user_id를 찾을 수 없습니다.');
  }
};
